'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, CheckCircle, Clock, AlertCircle, ChevronDown, FileText 
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

  const handleGoToProducts = () => {
    router.push('/productos');
  };

  return (
    <div className="font-sans bg-white overflow-x-hidden selection:bg-[#C62828] selection:text-white fade-in">
      <header className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center">
        <div className="text-white font-montserrat font-black text-3xl tracking-tighter drop-shadow-md">
          jamar<span className="text-sm align-top">®</span>
        </div>
      </header>

      <section className="relative w-full min-h-[100svh] bg-[#C62828] flex items-center justify-center overflow-hidden px-6 lg:px-20 py-20">
        <div className="absolute top-0 right-0 w-[50vw] h-[100vh] bg-[#8E1C1C] rounded-l-full opacity-20 transform translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left fade-in w-full">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
              <span className="bg-white text-[#C62828] font-montserrat font-bold uppercase tracking-[0.2em] px-4 py-2 text-sm rounded-full shadow-lg">Gran Feria</span>
              <div className="bg-[#00A8A8] text-white font-montserrat font-bold uppercase px-4 py-2 text-sm transform -rotate-2 shadow-lg">50% OFF PARA EMPLEADOS</div>
            </div>
            <h1 className="font-montserrat font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-xl w-full">Descuentos<br />Imperdibles</h1>
            <h2 className="font-montserrat font-extrabold text-[#F5F5F5] text-2xl md:text-4xl uppercase tracking-wide mb-8 opacity-90">A Crédito Sin Intereses</h2>
            <div className="bg-[#8E1C1C] border-l-8 border-white p-4 md:p-6 mb-8 transform -skew-x-3 shadow-2xl mx-auto lg:mx-0">
              <h3 className="font-montserrat font-black text-white text-4xl md:text-5xl uppercase tracking-tighter">Extra Cupo</h3>
            </div>
            <p className="font-inter text-white text-lg md:text-xl font-medium max-w-lg mb-10 leading-relaxed opacity-90 mx-auto lg:mx-0">Productos nuevos listos para estrenar con beneficios exclusivos para empleados Jamar.</p>
            <button onClick={handleGoToProducts} className="bg-white text-[#C62828] hover:bg-transparent hover:text-white hover:border-white border-2 border-transparent transition-all duration-300 font-montserrat font-bold uppercase tracking-widest px-10 py-5 rounded-full text-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center gap-3 group mx-auto lg:mx-0">
              <ShoppingBag className="group-hover:scale-110 transition-transform" /> Ver Productos
            </button>
          </div>
          <div className="relative w-full h-[50vh] lg:h-[80vh] flex justify-center items-center fade-in" style={{animationDelay: '0.2s'}}>
            <div className="absolute inset-0 bg-[#8E1C1C] rounded-[2rem] transform rotate-3 scale-95 opacity-50"></div>
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Muebles nuevos Jamar" className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10" />
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-6 lg:px-20 py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-montserrat font-black text-[#C62828] text-4xl md:text-6xl text-center uppercase tracking-tighter mb-16">¿Por qué aprovechar<br/>la feria?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#F5F5F5] p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg border border-gray-100">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-[#C62828]"><FileText size={36} /></div>
              <h3 className="font-montserrat font-bold text-xl text-gray-900 mb-4 uppercase">Crédito sin intereses</h3>
              <p className="font-inter text-gray-600">Financiación exclusiva por nómina sin recargos adicionales.</p>
            </div>
            <div className="bg-[#F5F5F5] p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg border border-gray-100">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-[#00A8A8]"><CheckCircle size={36} /></div>
              <h3 className="font-montserrat font-bold text-xl text-gray-900 mb-4 uppercase">Productos nuevos</h3>
              <p className="font-inter text-gray-600">Inventario completamente nuevo y listo para ser entregado.</p>
            </div>
            <div className="bg-[#F5F5F5] p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg border border-gray-100">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-[#C62828]"><Clock size={36} /></div>
              <h3 className="font-montserrat font-bold text-xl text-gray-900 mb-4 uppercase">Compra rápida</h3>
              <p className="font-inter text-gray-600">Proceso ágil. Selecciona, solicita y recibe la aprobación.</p>
            </div>
            <div className="bg-[#F5F5F5] p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg border border-gray-100">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-[#00A8A8]"><ShoppingBag size={36} /></div>
              <h3 className="font-montserrat font-bold text-xl text-gray-900 mb-4 uppercase">Exclusivo empleados</h3>
              <p className="font-inter text-gray-600">Beneficios diseñados únicamente para nuestro equipo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#8E1C1C] px-6 py-16 flex flex-col items-center justify-center text-center">
        <h2 className="font-montserrat font-black text-white text-4xl md:text-6xl uppercase tracking-widest mb-4 drop-shadow-md">Hasta agotar existencias</h2>
        <p className="font-inter text-white/80 text-xl md:text-2xl font-medium uppercase tracking-wide">Los productos se asignan por orden de solicitud.</p>
      </section>

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

      <section className="w-full bg-white px-6 py-32 flex flex-col items-center justify-center text-center">
        <h2 className="font-montserrat font-black text-gray-900 text-4xl md:text-5xl uppercase tracking-tighter mb-6">Compra fácil, clara<br/>y sujeta a disponibilidad.</h2>
        <button onClick={handleGoToProducts} className="mt-8 bg-[#C62828] hover:bg-[#8E1C1C] text-white transition-all duration-300 font-montserrat font-bold uppercase tracking-widest px-12 py-6 rounded-full text-xl shadow-[0_15px_30px_rgba(198,40,40,0.3)] hover:shadow-[0_10px_20px_rgba(198,40,40,0.4)] hover:-translate-y-1 flex items-center gap-4">
          <ShoppingBag size={28} /> Ver Productos
        </button>
      </section>
    </div>
  );
}