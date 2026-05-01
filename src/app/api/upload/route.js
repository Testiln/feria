import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl || '', serviceRoleKey || anonKey || '')

function sanitizeFilename(filename) {
  const originalName = String(filename || '').trim()
  const dotIndex = originalName.lastIndexOf('.')
  const baseName = dotIndex > 0 ? originalName.slice(0, dotIndex) : originalName
  const extension = dotIndex > 0 ? originalName.slice(dotIndex).toLowerCase() : ''

  const normalized = baseName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^[_\.\-]+|[_\.\-]+$/g, '')

  const safeBase = normalized || 'archivo'
  return `${safeBase}${extension || '.pdf'}`
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { filename, b64 } = body
    if (!filename || !b64) {
      return new Response(JSON.stringify({ error: 'filename and b64 required' }), { status: 400 })
    }

    const buffer = Buffer.from(b64, 'base64')
    const maxBytes = 5 * 1024 * 1024
    if (buffer.length > maxBytes) {
      return new Response(JSON.stringify({ error: 'El archivo supera el límite de 5 MB' }), { status: 400 })
    }

    const isPdfByName = String(filename).toLowerCase().endsWith('.pdf')
    const isPdfBySignature = buffer.slice(0, 4).toString('utf8') === '%PDF'
    if (!isPdfByName || !isPdfBySignature) {
      return new Response(JSON.stringify({ error: 'Solo se permiten archivos PDF válidos' }), { status: 400 })
    }

    const safeFilename = sanitizeFilename(filename)

    const bucket = 'orders'
    const path = `orders/${Date.now()}_${safeFilename}`

    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, buffer, {
      contentType: 'application/pdf',
      upsert: false,
    })

    if (uploadError) {
      // If bucket not found and we have a service role key, try to create the bucket and retry once
      // eslint-disable-next-line no-console
      console.warn('Upload error', uploadError)
      const msg = (uploadError && uploadError.message) || ''
      if (msg.includes('Bucket not found')) {
        if (!serviceRoleKey) {
          return new Response(
            JSON.stringify({ error: "Bucket 'orders' not found. Add SUPABASE_SERVICE_ROLE_KEY to .env.local or create the bucket 'orders' in Supabase storage." }),
            { status: 500 }
          )
        }
        // try to create bucket
        try {
          const { error: createErr } = await supabase.storage.createBucket(bucket, { public: true })
          if (createErr) {
            console.error('Could not create bucket', createErr)
            return new Response(JSON.stringify({ error: createErr.message || createErr }), { status: 500 })
          }

          // retry upload
          const { error: retryErr } = await supabase.storage.from(bucket).upload(path, buffer, {
            contentType: 'application/pdf',
            upsert: false,
          })
          if (retryErr) {
            console.error('Upload retry error', retryErr)
            return new Response(JSON.stringify({ error: retryErr.message || retryErr }), { status: 500 })
          }

        } catch (e) {
          console.error('Bucket creation/upload retry failed', e)
          return new Response(JSON.stringify({ error: e.message || e }), { status: 500 })
        }
      } else {
        return new Response(JSON.stringify({ error: uploadError.message || uploadError }), { status: 500 })
      }
    }

    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(path)
    const publicUrl = publicData?.publicUrl || publicData?.publicURL || null

    return new Response(JSON.stringify({ url: publicUrl }), { status: 201 })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Upload route error', err)
    return new Response(JSON.stringify({ error: err.message || err }), { status: 500 })
  }
}
