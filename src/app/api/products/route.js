import { supabase } from '../../../lib/supabaseClient'

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450"><rect width="600" height="450" fill="#E5E5E5"/><text x="50%" y="50%" fill="#999999" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" dominant-baseline="middle">Mueble</text></svg>')

function normalizeProduct(product) {
  return {
    id: product.id,
    code: product.code,
    name: product.name,
    price: Number(product.price ?? 0),
    stock: Number(product.stock ?? 0),
    reserved_stock: Number(product.reserved_stock ?? 0),
    image: product.image_url || FALLBACK_IMAGE,
    image_url: product.image_url,
    ecommerce_url: product.ecommerce_url,
    visible: Boolean(product.visible),
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, code, name, ecommerce_url, image_url, stock, reserved_stock, price, visible')
      .eq('visible', true)
      .order('name', { ascending: true })

    if (error) throw error

    return Response.json({ products: (data || []).map(normalizeProduct) })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching products', error)
    return Response.json({ error: 'No se pudieron cargar los productos' }, { status: 500 })
  }
}