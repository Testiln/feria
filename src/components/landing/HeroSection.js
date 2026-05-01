import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function HeroSection({ onGoToProducts }) {
  return (
    <section className="relative w-full min-h-[100svh] bg-[#C62828] flex items-center justify-center overflow-hidden px-6 lg:px-20 py-20">
      <div className="absolute top-0 right-0 w-[50vw] h-[100vh] bg-[#8E1C1C] rounded-l-full opacity-20 transform translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left fade-in w-full">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
            <span className="bg-white text-[#C62828] font-montserrat font-bold uppercase tracking-[0.2em] px-4 py-2 text-sm rounded-full shadow-lg">Gran feria</span>
            <div className="bg-[#00A8A8] text-white font-montserrat font-bold uppercase px-4 py-2 text-sm transform -rotate-2 shadow-lg">50% OFF PARA EMPLEADOS</div>
          </div>
          <h1 className="font-montserrat font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-xl w-full">Descuentos<br />Imperdibles</h1>
          <h2 className="font-montserrat font-extrabold text-[#F5F5F5] text-2xl md:text-4xl uppercase tracking-wide mb-8 opacity-90">A crédito sin intereses</h2>
          <div className="bg-[#8E1C1C] border-l-8 border-white p-4 md:p-6 mb-8 transform -skew-x-3 shadow-2xl mx-auto lg:mx-0">
            <h3 className="font-montserrat font-black text-white text-4xl md:text-5xl uppercase tracking-tighter">Extra cupo</h3>
          </div>
          <p className="font-inter text-white text-lg md:text-xl font-medium max-w-lg mb-10 leading-relaxed opacity-90 mx-auto lg:mx-0">Productos nuevos listos para estrenar con beneficios exclusivos para empleados Jamar.</p>
          <button onClick={onGoToProducts} className="bg-white text-[#C62828] hover:bg-transparent hover:text-white hover:border-white border-2 border-transparent transition-all duration-300 font-montserrat font-bold uppercase tracking-widest px-10 py-5 rounded-full text-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center gap-3 group mx-auto lg:mx-0">
            <ShoppingBag className="group-hover:scale-110 transition-transform" /> Ver productos
          </button>
        </div>
        <div className="relative w-full h-[50vh] lg:h-[80vh] flex justify-center items-center fade-in" style={{animationDelay: '0.2s'}}>
          <div className="absolute inset-0 bg-[#8E1C1C] rounded-[2rem] transform rotate-3 scale-95 opacity-50"></div>
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Muebles nuevos Jamar" className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10" />
        </div>
      </div>
    </section>
  );
}