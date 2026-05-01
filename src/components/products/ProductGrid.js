import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const ITEMS_PER_PAGE = 12;

export default function ProductGrid({ filteredAndSortedProducts, cart, handleQuantityChange, formatPrice }) {
  const [currentPage, setCurrentPage] = useState(1);
  // Resetear a página 1 cuando cambian los productos filtrados
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredAndSortedProducts.length]);

  const { displayedProducts, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayed = filteredAndSortedProducts.slice(startIndex, endIndex);
    
    return { displayedProducts: displayed, totalPages: total };
  }, [filteredAndSortedProducts, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    if (start > 2) pages.push('...');
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);
    
    return pages;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
        <Search className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="font-montserrat font-bold text-xl mb-2">No se encontraron productos</h3>
        <p className="font-inter text-gray-500 dark:text-gray-400">Intenta buscar con otros términos.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {displayedProducts.map(product => {
          const qtyInCart = cart[product.id] || 0;
          
          return (
            <ProductCard 
              key={product.id}
              product={product}
              qtyInCart={qtyInCart}
              handleQuantityChange={handleQuantityChange}
              formatPrice={formatPrice}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-center gap-4 mb-4">
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-inter">
            Página {currentPage} de {totalPages}
          </div>
          
          <div className="flex items-center justify-center gap-1 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Página anterior"
              title="Anterior"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, idx) => (
                page === '...' ? (
                  <span key={`dots-${idx}`} className="px-1 text-gray-400">…</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-8 h-8 sm:min-w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                      currentPage === page
                        ? 'bg-[#C62828] text-white'
                        : 'bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2A2A2A]'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Página siguiente"
              title="Siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}