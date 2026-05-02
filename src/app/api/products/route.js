import { supabase } from '../../../lib/supabaseClient'

function normalizeProduct(product) {
  return {
    id: product.id,
    code: product.code,
    name: product.name,
    price: Number(product.price ?? 0),
    stock: Number(product.stock ?? 0),
    reserved_stock: Number(product.reserved_stock ?? 0),
    image: product.image_url || null,
    image_url: product.image_url,
    ecommerce_url: product.ecommerce_url,
    visible: Boolean(product.visible),
    created_at: product.created_at || null,
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, code, name, ecommerce_url, image_url, stock, reserved_stock, price, visible, created_at')
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