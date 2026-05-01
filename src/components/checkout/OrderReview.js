import React from 'react';
import { CheckCircle2, FileText } from 'lucide-react';

export default function OrderReview({ formData, file, cart, cartTotal, formatPrice, products, onBack, onSubmit, isSubmitting }) {
  return (
    <div className="space-y-6 fade-in">
      <h3 className="font-montserrat font-bold text-xl text-gray-900 dark:text-white mb-4">Confirmación de solicitud</h3>
      
      <div className="bg-gray-50 dark:bg-[#121212] p-5 rounded-xl border border-gray-200 dark:border-gray-800">
        <h4 className="font-inter font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">1. Datos registrados</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-inter text-gray-700 dark:text-gray-300">
          <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">Nombre completo:</span> {formData.name}</div>
          <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">Cédula:</span> {formData.idDoc}</div>
          <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">Correo:</span> {formData.email}</div>
          <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">Teléfono:</span> {formData.phone}</div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-[#121212] p-5 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <div>
          <h4 className="font-inter font-bold text-gray-900 dark:text-white mb-1">2. Documento adjunto</h4>
          <p className="text-sm font-inter flex items-center gap-2 text-[#00A8A8]"><FileText size={16}/> {file?.name}</p>
        </div>
        <CheckCircle2 className="text-[#00A8A8]" />
      </div>

      <div className="bg-gray-50 dark:bg-[#121212] p-5 rounded-xl border border-gray-200 dark:border-gray-800">
        <h4 className="font-inter font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">3. Resumen del carrito</h4>
        <div className="space-y-3 mb-4 max-h-48 overflow-y-auto custom-scrollbar pr-2">
          {Object.entries(cart).map(([id, qty]) => {
            const product = products.find(p => p.id === id);
            if (!product) return null;
            return (
              <div key={id} className="flex justify-between items-center text-sm font-inter">
                <span className="text-gray-700 dark:text-gray-300 flex-1 pr-4"><span className="font-bold text-[#C62828] mr-2">{qty}x</span> {product.name}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(product.price * qty)}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="font-inter font-bold text-gray-900 dark:text-white text-lg">Total estimado:</span>
          <span className="font-montserrat font-black text-2xl text-[#C62828]">{formatPrice(cartTotal)}</span>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row justify-between gap-4">
        <button onClick={onBack} className="px-6 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-inter font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center">Atrás</button>
        <button onClick={onSubmit} disabled={isSubmitting} className="px-8 py-4 bg-[#C62828] text-white font-inter font-bold rounded-xl hover:bg-[#8E1C1C] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
          <CheckCircle2 size={20} /> {isSubmitting ? 'Enviando...' : 'Confirmar y enviar solicitud'}
        </button>
      </div>
    </div>
  );
}