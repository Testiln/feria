import React from 'react';
import { ShoppingBag, ShoppingCart, Minus, Plus } from 'lucide-react';

export default function CartSidebar({ cart, cartItemsCount, cartTotal, handleQuantityChange, formatPrice, onCheckout, products }) {
  return (
    <aside className="hidden lg:flex w-96 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E1E] sticky top-16 h-[calc(100vh-4rem)] flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 className="font-montserrat font-bold text-xl flex items-center gap-2"><ShoppingBag className="text-[#C62828]" /> Mi Solicitud</h2>
        <span className="bg-gray-200 dark:bg-gray-700 text-xs font-bold px-3 py-1 rounded-full">{cartItemsCount} ítems</span>
      </div>
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {cartItemsCount === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <ShoppingCart size={48} className="mb-4 opacity-50" />
            <p>Tu carrito está vacío.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(cart).map(([id, qty]) => {
              const product = products.find(p => p.id === id);
              if (!product) return null;
              const availableStock = Math.max(0, Number(product.stock || 0) - Number(product.reserved_stock || 0));
              return (
                <div key={id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-inter text-sm line-clamp-1">{product.name}</p>
                    <p className="font-montserrat font-bold text-[#C62828] text-sm">{formatPrice(product.price)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => handleQuantityChange(product.id, -1, availableStock)} className="text-gray-500 p-1 bg-gray-100 dark:bg-gray-800 rounded"><Minus size={12} /></button>
                      <span className="font-inter text-sm font-semibold w-4 text-center">{qty}</span>
                      <button onClick={() => handleQuantityChange(product.id, 1, availableStock)} disabled={qty >= availableStock} className="text-gray-500 p-1 bg-gray-100 dark:bg-gray-800 rounded disabled:opacity-30"><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1E1E1E]">
        <div className="flex justify-between items-center mb-6">
          <span className="font-inter font-medium">Total estimado:</span>
          <span className="font-montserrat font-black text-2xl">{formatPrice(cartTotal)}</span>
        </div>
        <button 
          disabled={cartItemsCount === 0} 
          onClick={onCheckout}
          className="w-full py-4 bg-[#C62828] hover:bg-[#8E1C1C] text-white font-montserrat font-bold uppercase rounded-xl disabled:bg-gray-300 disabled:text-gray-500 transition-all"
        >
          Generar solicitud
        </button>
      </div>
    </aside>
  );
}