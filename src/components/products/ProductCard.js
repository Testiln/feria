import React from 'react';
import { AlertCircle, Minus, Plus } from 'lucide-react';
import ProductImage from './ProductImage';

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
  const stockLabel = isOutOfStock ? 'Sin stock' : `Solo ${availableStock} unidades disponibles`;

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all flex flex-col group relative">
      <div className="relative aspect-[5/4] lg:aspect-[4/3] bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          className={`w-full h-full ${isOutOfStock ? 'grayscale opacity-60' : ''}`}
          imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 z-20 inline-flex items-center rounded-full bg-white/95 px-2 py-0.5 text-xs font-inter font-medium text-gray-800 border border-gray-100 shadow-sm dark:bg-black/60 dark:text-white dark:border-transparent">
          {product.code}
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 dark:bg-black/35 backdrop-blur-[1px]">
            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-inter font-semibold uppercase tracking-[0.18em] text-gray-500 shadow-sm dark:bg-[#2A2A2A] dark:text-gray-300">
              Sin stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 px-3 sm:px-4 pt-2 sm:pt-3 pb-3 sm:pb-4">
            <h3 className="font-poppins font-semibold text-gray-900 dark:text-white text-sm sm:text-lg lg:text-base leading-tight mb-1.5 line-clamp-2 md:line-clamp-3">
          {capitalizeWords(product.name)}
        </h3>
        <p className="font-montserrat font-black text-[#C62828] dark:text-[#E53935] text-xl mb-3">
          {formatPrice(product.price)}
        </p>

        <div className="mt-auto">
          <p className={`mb-3 flex items-center gap-1.5 text-[13px] font-inter ${isOutOfStock ? 'text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
            {isOutOfStock ? (
              <>
                <AlertCircle size={13} />
                <span>{stockLabel}</span>
              </>
            ) : (
              <span>
                Solo
                <span className="mx-1 text-[14px] font-semibold text-gray-900 dark:text-white">{availableStock}</span>
                unidades disponibles
              </span>
            )}
          </p>

          {!isOutOfStock ? (
            qtyInCart > 0 ? (
              <div className="flex items-center justify-between rounded-xl bg-[#404b5a] p-1 dark:bg-[#ffffff]">
                <button onClick={() => handleQuantityChange(product.id, -1, availableStock)} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#404b5a] hover:bg-gray-50 dark:bg-[#111827] dark:hover:bg-[#1f2937] dark:text-white"><Minus size={18} /></button>
                <span className="font-inter font-bold w-8 text-center text-white dark:text-[#111827]">{qtyInCart}</span>
                <button onClick={() => handleQuantityChange(product.id, 1, availableStock)} disabled={qtyInCart >= availableStock} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#404b5a] hover:bg-gray-50 dark:bg-[#111827] dark:hover:bg-[#1f2937] disabled:opacity-50 dark:text-white"><Plus size={18} /></button>
              </div>
            ) : (
              <button onClick={() => handleQuantityChange(product.id, 1, availableStock)} className="flex h-11 w-full items-center justify-center rounded-xl bg-[#404b5a] px-3 sm:px-4 text-center font-inter font-bold text-white text-sm sm:text-base transition-colors hover:bg-[#343d49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-[#ffffff] dark:text-[#111827] dark:hover:bg-[#f3f3f3] dark:focus-visible:ring-offset-[#1E1E1E] whitespace-nowrap">
                Agregar al carrito
              </button>
            )
          ) : (
            <button disabled className="flex h-11 w-full items-center justify-center rounded-xl bg-gray-200 font-inter font-semibold text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500">
              Agotado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}