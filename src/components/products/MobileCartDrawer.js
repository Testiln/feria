import React from 'react';
import { ShoppingBag, ShoppingCart, Minus, Plus, X } from 'lucide-react';

export default function MobileCartDrawer({ isMobileCartOpen, setIsMobileCartOpen, cart, cartItemsCount, cartTotal, handleQuantityChange, formatPrice, onCheckout, products }) {
  if (!isMobileCartOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileCartOpen(false)}></div>
      <div className="relative w-[90%] max-w-sm h-full bg-white dark:bg-[#1E1E1E] flex flex-col animate-[slideInRight_0.3s_ease-out]">
        <style dangerouslySetInnerHTML={{__html: `@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}} />
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between">
          <h2 className="font-montserrat font-bold text-lg flex items-center gap-2"><ShoppingBag className="text-[#C62828]" /> Mi Solicitud</h2>
          <button onClick={() => setIsMobileCartOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {cartItemsCount === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingCart size={40} className="mb-3 opacity-50" />
              <p className="font-inter text-sm">Carrito vacío.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(cart).map(([id, qty]) => {
                const product = products.find(p => p.id === id);
                if (!product) return null;
                const availableStock = Math.max(0, Number(product.stock || 0) - Number(product.reserved_stock || 0));
                return (
                  <div key={id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden"><img src={product.image} className="w-full h-full object-cover" alt="" /></div>
                    <div className="flex-1">
                      <p className="font-inter text-sm line-clamp-2">{product.name}</p>
                      <p className="font-montserrat font-bold text-[#C62828] text-sm mt-1">{formatPrice(product.price)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => handleQuantityChange(product.id, -1, availableStock)} className="bg-gray-100 dark:bg-gray-800 p-1 rounded"><Minus size={14}/></button>
                        <span className="w-4 text-center text-sm font-bold">{qty}</span>
                        <button onClick={() => handleQuantityChange(product.id, 1, availableStock)} disabled={qty >= availableStock} className="bg-gray-100 dark:bg-gray-800 p-1 rounded"><Plus size={14}/></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1E1E1E]">
          <div className="flex justify-between mb-4"><span className="font-inter">Total:</span><span className="font-montserrat font-black text-xl">{formatPrice(cartTotal)}</span></div>
          <button 
            disabled={cartItemsCount === 0} 
            onClick={onCheckout}
            className="w-full py-4 bg-[#C62828] text-white font-montserrat font-bold uppercase rounded-xl disabled:bg-gray-300"
          >
            Generar solicitud
          </button>
        </div>
      </div>
    </div>
  );
}