const fs = require('fs');

(async () => {
  try {
    const baseUrl = 'http://localhost:3000'

    // fetch products to get a product_id
    const productsRes = await fetch(`${baseUrl}/api/products`)
    const productsJson = await productsRes.json()
    const productId = productsJson?.products?.[0]?.id
    if (!productId) {
      console.error('No product id found in /api/products response', productsJson)
      process.exit(1)
    }
    console.log('Using product id:', productId)

    // minimal PDF content
    const pdfContent = `%PDF-1.4\n%\xE2\xE3\xCF\xD3\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 24 Tf\n72 712 Td\n(hi) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000010 00000 n \n0000000067 00000 n \n0000000123 00000 n \n0000000200 00000 n \ntrailer\n<< /Root 1 0 R /Size 5 >>\nstartxref\n267\n%%EOF`;

    const buffer = Buffer.from(pdfContent, 'utf8')
    const b64 = buffer.toString('base64')

    console.log('Uploading PDF...')
    const upRes = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: 'test.pdf', b64 }),
    })
    const upJson = await upRes.json()
    console.log('Upload response:', upRes.status, upJson)

    if (!upRes.ok) process.exit(1)

    const approvalUrl = upJson.url || null

    const orderPayload = {
      full_name: 'Test User',
      email: 'test@example.com',
      phone: '3001234',
      notes: 'Order created by automated test script',
      items: [
        { product_id: productId, quantity: 1, unit_price: 10000 }
      ],
      approval_document_url: approvalUrl,
    }

    console.log('Creating order...')
    const ordRes = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    })
    const ordJson = await ordRes.json()
    console.log('Order response:', ordRes.status, ordJson)

    if (!ordRes.ok) process.exit(1)

    console.log('Test completed successfully')
  } catch (err) {
    console.error('Test script error', err)
    process.exit(1)
  }
})()
