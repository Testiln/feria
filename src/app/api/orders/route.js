import { supabase } from '../../../lib/supabaseClient'

/**
 * POST /api/orders
 * Body: { full_name, document_id, email, phone, notes, items: [{ product_id, quantity, unit_price }] }
 */
export async function POST(req) {
  try {
    const body = await req.json()
    const { full_name, document_id, email, phone, notes, items } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'No items provided' }), { status: 400 })
    }

    const requestedQuantities = items.reduce((acc, item) => {
      const productId = item?.product_id
      const quantity = Number(item?.quantity || 0)
      if (!productId || quantity <= 0) return acc
      acc[productId] = (acc[productId] || 0) + quantity
      return acc
    }, {})

    const productIds = Object.keys(requestedQuantities)
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, stock, reserved_stock')
      .in('id', productIds)

    if (productsError) throw productsError

    const productsById = new Map((products || []).map((product) => [product.id, product]))
    for (const [productId, requestedQuantity] of Object.entries(requestedQuantities)) {
      const product = productsById.get(productId)
      if (!product) {
        return new Response(JSON.stringify({ error: `El producto ${productId} no existe` }), { status: 400 })
      }

      const stock = Number(product.stock || 0)
      const reservedStock = Number(product.reserved_stock || 0)
      const availableStock = stock - reservedStock

      if (requestedQuantity > availableStock) {
        return new Response(
          JSON.stringify({
            error: `No hay stock suficiente para ${product.name}. Disponible: ${availableStock}, solicitado: ${requestedQuantity}`,
          }),
          { status: 400 }
        )
      }
    }

    const total_items = items.reduce((s, it) => s + (it.quantity || 0), 0)
    const total_amount = items.reduce((s, it) => s + ((it.unit_price || 0) * (it.quantity || 0)), 0)

    // insert order
    const orderPayload = {
      status: 'pending',
      total_items,
      total_amount,
      notes: notes || null,
      full_name: full_name || null,
      document_id: document_id || null,
      email: email || null,
      phone: phone || null,
    }

    const { data: orderData, error: orderError } = await supabase.from('orders').insert([orderPayload]).select('id').single()
    if (orderError) throw orderError

    const order_id = orderData.id
    const order_code = `${order_id}`

    // prepare order_items
    const orderItems = items.map((it) => ({
      order_id,
      product_id: it.product_id,
      quantity: it.quantity,
      unit_price: it.unit_price,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
    if (itemsError) throw itemsError

    // Update reserved_stock for each product using the Supabase function
    for (const it of items) {
      const { data: product, error: selErr } = await supabase.from('products').select('reserved_stock').eq('id', it.product_id).single()
      if (selErr) {
        // continue to next; but log
        // eslint-disable-next-line no-console
        console.warn('Could not fetch product for reserved_stock update', selErr)
        throw selErr
      }
      const current = product?.reserved_stock || 0
      const newReserved = current + (it.quantity || 0)
      const { error: updErr } = await supabase.rpc('update_reserved_stock', {
        product_id: it.product_id,
        new_reserved_stock: newReserved,
      })
      if (updErr) {
        // eslint-disable-next-line no-console
        console.warn('Could not update reserved_stock for product', it.product_id, updErr)
        throw updErr
      }
    }

    return new Response(JSON.stringify({ ok: true, order_id, order_code }), { status: 201 })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error creating order', err)
    return new Response(JSON.stringify({ error: err.message || err }), { status: 500 })
  }
}
