'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

// Importación de componentes
import Navbar from '../../../components/layout/Navbar';
import Stepper from '../../../components/checkout/Stepper';
import PersonalDataForm from '../../../components/checkout/PersonalDataForm';
import DocumentUpload from '../../../components/checkout/DocumentUpload';
import OrderReview from '../../../components/checkout/OrderReview';
import SuccessMessage from '../../../components/checkout/SuccessMessage';

// Importación de hooks y utilidades (archivos por crear)
import { useCart } from '../../../context/CartContext';
import { useTheme } from '../../../context/ThemeContext';
import { useProducts } from '../../../context/ProductsContext';
import { formatPrice } from '../../../lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const { darkMode, setDarkMode } = useTheme();
  const { products } = useProducts();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', idDoc: '', email: '', phone: '' });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const cartSummaryItems = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((item) => item.id === id)
      if (!product) return null

      return {
        id,
        name: product.name,
        quantity: qty,
        unitPrice: product.price,
        lineTotal: product.price * qty,
      }
    })
    .filter(Boolean)

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setSubmitError('');
    if (selected && selected.type === 'application/pdf') {
      if (selected.size <= 5 * 1024 * 1024) {
        setFile(selected);
        setFileError('');
      } else {
        setFileError('El archivo es demasiado grande (máx 5MB)');
        setFile(null);
      }
    } else {
      setFileError('Por favor selecciona un archivo PDF válido');
      setFile(null);
    }
  };

  const handleSubmitOrder = () => {
    // Envío real: subir archivo (si aplica) y crear la orden en backend
    (async () => {
      setSubmitError('');
      setIsSubmitting(true);
      try {
        const items = Object.entries(cart).map(([id, qty]) => ({
          product_id: id,
          quantity: qty,
          unit_price: (products.find(p => p.id === id)?.price) || 0,
        }))

        let document_url = null
        if (file) {
          // convertir a base64
          const b64 = await new Promise((res, rej) => {
            const reader = new FileReader()
            reader.onload = () => {
              const result = reader.result || ''
              const base = result.split(',')[1] || ''
              res(base)
            }
            reader.onerror = rej
            reader.readAsDataURL(file)
          })

          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: file.name, b64 }),
          })
          if (!uploadRes.ok) {
            const uploadErr = await uploadRes.json().catch(() => ({}))
            throw new Error(uploadErr.error || 'Error subiendo documento')
          }
          const upPayload = await uploadRes.json()
          document_url = upPayload.url
        }

        const payload = {
          full_name: formData.name,
          document_id: formData.idDoc,
          email: formData.email,
          phone: formData.phone,
          notes: '',
          items,
          approval_document_url: document_url,
        }

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err.error || 'Error creando orden')
        }

        const json = await res.json()
        setOrderId(json.order_code || json.order_id || json.id || ('JMR-' + Math.random().toString(36).substr(2,9).toUpperCase()))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('submit order error', err)
        setSubmitError(err.message || 'No se pudo enviar la solicitud')
      } finally {
        setIsSubmitting(false)
      }
    })()
  };

  const handleComplete = () => {
    clearCart();
    router.push('/productos');
  };

  if (orderId) {
    return (
      <SuccessMessage 
        darkMode={darkMode} 
        orderId={orderId} 
        onComplete={handleComplete} 
      />
    );
  }

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-[#121212] transition-colors duration-300`}>
      <Navbar 
        onBack={() => router.push('/productos')} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        maxWidthClass="max-w-4xl"
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {submitError && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
            {submitError}
          </div>
        )}

        <Stepper step={step} />

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)] gap-8 items-start">
            <div className="rounded-[1.5rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E1E] p-6 sm:p-8 shadow-xl">
              <PersonalDataForm 
                formData={formData} 
                setFormData={setFormData} 
                onNext={() => setStep(2)} 
              />
            </div>

            <aside className="rounded-[1.5rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E1E] p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="w-6 h-6 text-[#C62828]" />
                <h3 className="font-montserrat font-bold text-lg text-gray-900 dark:text-white">Resumen del carrito</h3>
              </div>

              {cartSummaryItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black/20 p-5 text-sm text-gray-500 dark:text-gray-400">
                  No tienes productos agregados todavía.
                </div>
              ) : (
                <div className="space-y-3">
                  {cartSummaryItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-inter font-medium text-gray-900 dark:text-white line-clamp-2">{item.name}</p>
                        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{item.quantity} x {formatPrice(item.unitPrice)}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-montserrat font-semibold text-gray-900 dark:text-white">{formatPrice(item.lineTotal)}</p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 mt-2 border-t border-gray-300 dark:border-gray-700">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-inter font-semibold text-gray-700 dark:text-gray-300">Total:</span>
                      <span className="font-montserrat font-bold text-2xl text-[#C62828]">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-[2rem] p-6 sm:p-10 shadow-xl border border-gray-100 dark:border-gray-800">
            <DocumentUpload 
              file={file} 
              fileError={fileError} 
              handleFileChange={handleFileChange} 
              onBack={() => setStep(1)} 
              onNext={() => setStep(3)} 
            />
          </div>
        )}

        {step === 3 && (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-[2rem] p-6 sm:p-10 shadow-xl border border-gray-100 dark:border-gray-800">
            <OrderReview 
              formData={formData}
              file={file}
              cart={cart}
              cartTotal={cartTotal}
              formatPrice={formatPrice}
              products={products}
              onBack={() => setStep(2)}
              onSubmit={handleSubmitOrder}
              isSubmitting={isSubmitting}
            />
          </div>
        )}
      </main>
    </div>
  );
}