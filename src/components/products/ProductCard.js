import React from 'react';
import { AlertCircle, Minus, Plus } from 'lucide-react';

const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function ProductCard({ product, qtyInCart, handleQuantityChange, formatPrice }) {
  const availableStock = Math.max(0, Number(product.stock || 0) - Number(product.reserved_stock || 0));
  const isOutOfStock = availableStock <= 0;

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all flex flex-col group relative">
      <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? 'grayscale opacity-60' : ''}`}
          onError={(e) => { 
            e.target.src = "https://via.placeholder.com/600x450/E5E5E5/999999?text=Mueble";
          }}
        />
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold font-inter text-gray-800 dark:text-gray-200 shadow-sm">
          {product.code}
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-black/50 backdrop-blur-[2px]">
            <span className="bg-red-600 text-white font-montserrat font-bold uppercase tracking-widest px-6 py-2 rounded-full shadow-lg transform -rotate-6">
              Sin stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-inter font-semibold text-gray-900 dark:text-white text-lg leading-tight mb-2 line-clamp-2">
          {capitalizeWords(product.name)}
        </h3>
        <p className="font-montserrat font-black text-[#C62828] dark:text-[#E53935] text-xl mb-4">
          {formatPrice(product.price)}
        </p>

        <div className="mt-auto">
          <p className="text-xs font-inter text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
            {isOutOfStock ? <AlertCircle size={12}/> : null}
            Stock disponible: {availableStock} uds.
          </p>

          {!isOutOfStock ? (
            qtyInCart > 0 ? (
              <div className="flex items-center justify-between bg-gray-100 dark:bg-[#2A2A2A] rounded-xl p-1">
                <button onClick={() => handleQuantityChange(product.id, -1, availableStock)} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#3A3A3A] shadow-sm hover:bg-gray-50"><Minus size={18} /></button>
                <span className="font-inter font-bold w-8 text-center">{qtyInCart}</span>
                <button onClick={() => handleQuantityChange(product.id, 1, availableStock)} disabled={qtyInCart >= availableStock} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#3A3A3A] shadow-sm hover:bg-gray-50 disabled:opacity-50"><Plus size={18} /></button>
              </div>
            ) : (
              <button onClick={() => handleQuantityChange(product.id, 1, availableStock)} className="w-full py-3 bg-[#C62828] hover:bg-[#A31F1F] dark:bg-[#C62828] text-white font-inter font-semibold rounded-xl transition-colors shadow-sm">
                Agregar al carrito
              </button>
            )
          ) : (
            <button disabled className="w-full py-3 bg-gray-200 dark:bg-gray-800 text-gray-400 font-inter font-semibold rounded-xl cursor-not-allowed">
              Agotado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}