import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessMessage({ darkMode, orderId, onComplete }) {
  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-[#121212] selection:bg-[#C62828] selection:text-white flex items-center justify-center p-4 fade-in`}>
      <div className="bg-white dark:bg-[#1E1E1E] p-8 md:p-12 rounded-[2rem] shadow-2xl text-center max-w-md w-full border border-gray-100 dark:border-gray-800">
        <CheckCircle2 size={80} className="text-[#00A8A8] mx-auto mb-6" />
        <h2 className="font-montserrat font-black text-3xl text-gray-900 dark:text-white uppercase mb-2">¡Solicitud enviada!</h2>
        <p className="font-inter text-gray-600 dark:text-gray-400 mb-6">Tu orden ha sido registrada exitosamente.</p>
        
        <div className="bg-gray-50 dark:bg-[#121212] rounded-xl p-4 mb-8 border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-inter mb-1">Código de tu orden</p>
          <p className="font-montserrat font-bold text-2xl text-[#C62828]">{orderId}</p>
        </div>
        
        <button 
          onClick={() => window.location.href = '/productos'}
          className="w-full py-4 bg-[#C62828] hover:bg-[#8E1C1C] text-white font-montserrat font-bold uppercase rounded-xl transition-all shadow-md"
        >
          Volver al catálogo
        </button>
      </div>
    </div>
  );
}