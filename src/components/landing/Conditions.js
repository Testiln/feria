import React, { useState } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

export default function Conditions() {
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

  return (
    <section className="w-full bg-[#F5F5F5] px-6 lg:px-20 py-24">
      <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4 mb-10">
          <AlertCircle size={40} className="text-[#C62828]" />
          <h2 className="font-montserrat font-black text-gray-900 text-3xl md:text-4xl uppercase">Condiciones</h2>
        </div>
        <ul className="space-y-6 mb-10">
          <li className="flex items-start gap-4"><div className="w-3 h-3 bg-[#00A8A8] rounded-full mt-2 shrink-0"></div><p className="font-inter text-gray-700 text-lg md:text-xl font-medium">Exclusivo para empleados activos.</p></li>
          <li className="flex items-start gap-4"><div className="w-3 h-3 bg-[#00A8A8] rounded-full mt-2 shrink-0"></div><p className="font-inter text-gray-700 text-lg md:text-xl font-medium">Sujeto a aprobación de crédito.</p></li>
          <li className="flex items-start gap-4"><div className="w-3 h-3 bg-[#00A8A8] rounded-full mt-2 shrink-0"></div><p className="font-inter text-gray-700 text-lg md:text-xl font-medium">Inventario limitado.</p></li>
        </ul>
        <div className="border-t border-gray-200 pt-8">
          <button onClick={() => setIsConditionsOpen(!isConditionsOpen)} className="w-full flex items-center justify-between text-[#C62828] font-montserrat font-bold text-lg hover:text-[#8E1C1C] transition-colors uppercase tracking-wide">
            <span>Ver condiciones completas</span>
            <ChevronDown size={28} className={`transform transition-transform duration-300 ${isConditionsOpen ? 'rotate-180' : ''}`} />
          </button>
          {isConditionsOpen && (
            <div className="mt-6 p-6 bg-[#F5F5F5] rounded-xl font-inter text-gray-600 text-sm leading-relaxed border border-gray-200 fade-in">
              <p className="mb-3">1. La feria es exclusiva para colaboradores directos de Jamar con contrato vigente.</p>
              <p className="mb-3">2. El extra cupo y la financiación sin intereses están sujetos a la capacidad de endeudamiento validada por el área de nómina.</p>
              <p className="mb-3">3. El código del producto no garantiza la separación del mismo hasta que el formulario de compra sea aprobado y facturado.</p>
              <p>4. No aplican devoluciones por cambios de parecer, solo por garantía legal de fábrica.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}