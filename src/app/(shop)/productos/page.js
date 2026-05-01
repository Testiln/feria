'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowUpDown, Loader2, AlertCircle } from 'lucide-react';

// Importación de componentes
import Navbar from '../../../components/layout/Navbar';
import ProductGrid from '../../../components/products/ProductGrid';
import CartSidebar from '../../../components/products/CartSidebar';
import MobileCartDrawer from '../../../components/products/MobileCartDrawer';
import MobileCartButton from '../../../components/layout/MobileCartButton';
import ScrollToTopButton from '../../../components/layout/ScrollToTopButton';

// Importación de hooks y utilidades
import { useCart } from '../../../context/CartContext';
import { useTheme } from '../../../context/ThemeContext';
import { useProducts } from '../../../context/ProductsContext';
import { formatPrice } from '../../../lib/utils';

export default function ProductsPage() {
  const router = useRouter();
  const { cart, handleQuantityChange, cartItemsCount, cartTotal } = useCart();
  const { darkMode, setDarkMode } = useTheme();
  const { products, loading, error } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica de filtrado y ordenamiento (idéntica al original)
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return a.name.localeCompare(b.name);
      });
  }, [products, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <Navbar onBack={() => router.push('/')} darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="max-w-[1600px] mx-auto p-8">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E1E] p-6 text-gray-600 dark:text-gray-300">
            <Loader2 className="animate-spin" size={20} />
            Cargando productos...
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <Navbar onBack={() => router.push('/')} darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="max-w-[1600px] mx-auto p-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 flex items-start gap-3">
            <AlertCircle size={20} className="mt-0.5" />
            <div>
              <p className="font-semibold">No se pudieron cargar los productos.</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-gray-100 selection:bg-[#C62828] selection:text-white transition-colors duration-300`}>
      <Navbar 
        onBack={() => router.push('/')} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      <main className="max-w-[1600px] mx-auto flex">
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Barra de búsqueda y filtros */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Busca por nombre o código de producto..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-[#1E1E1E] border-none shadow-sm focus:ring-2 focus:ring-[#C62828] outline-none transition-all dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative min-w-[200px]">
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select 
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white dark:bg-[#1E1E1E] border-none shadow-sm focus:ring-2 focus:ring-[#C62828] outline-none appearance-none cursor-pointer font-inter font-medium dark:text-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Nombre (A-Z)</option>
                <option value="price-low">Menor precio</option>
                <option value="price-high">Mayor precio</option>
              </select>
            </div>
          </div>

          <ProductGrid 
            filteredAndSortedProducts={filteredAndSortedProducts}
            cart={cart}
            handleQuantityChange={handleQuantityChange}
            formatPrice={formatPrice}
          />
        </div>

        <CartSidebar 
          cart={cart}
          cartItemsCount={cartItemsCount}
          cartTotal={cartTotal}
          handleQuantityChange={handleQuantityChange}
          formatPrice={formatPrice}
          onCheckout={() => router.push('/checkout')}
          products={products}
        />
      </main>

      <MobileCartDrawer 
        isMobileCartOpen={isMobileCartOpen}
        setIsMobileCartOpen={setIsMobileCartOpen}
        cart={cart}
        cartItemsCount={cartItemsCount}
        cartTotal={cartTotal}
        handleQuantityChange={handleQuantityChange}
        formatPrice={formatPrice}
        onCheckout={() => router.push('/checkout')}
        products={products}
      />

      <MobileCartButton 
        cartItemsCount={cartItemsCount}
        setIsMobileCartOpen={setIsMobileCartOpen}
      />

      <ScrollToTopButton show={showScrollToTop} />
    </div>
  );
}