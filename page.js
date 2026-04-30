'use client'

import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, CheckCircle, Clock, AlertCircle, ChevronDown, FileText, 
  Search, ArrowUpDown, X, Plus, Minus, ShoppingCart, Moon, Sun, ArrowLeft,
  UploadCloud, CheckCircle2
} from 'lucide-react';

// ============================================================================
// MOCK DATA PARA PRODUCTOS
// ============================================================================
const INITIAL_PRODUCTS = [
  { id: 1, name: "Sala Esquinera Viena Tela Anti-fluidos", price: 1250000, code: "SAL-101", stock: 5, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Comedor 4 Puestos Milan Madera Roble", price: 850000, code: "COM-204", stock: 2, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Cama Doble Madrid Base Dividida", price: 950000, code: "CAM-302", stock: 0, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Sofácama Multifuncional Oslo", price: 720000, code: "SOF-405", stock: 10, image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Tocador Hollywood con Espejo LED", price: 450000, code: "TOC-501", stock: 3, image: "https://images.unsplash.com/photo-1595514535316-8c76081577ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Colchón Ortopédico Premium 1.40x1.90", price: 680000, code: "COL-603", stock: 8, image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
];

// ============================================================================
// COMPONENTE: PÁGINA DE PRODUCTOS
// ============================================================================
const ProductsPage = ({ onBack, onCheckout, cart, setCart, darkMode, setDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let result = INITIAL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      return b.price - a.price;
    });

    return result;
  }, [searchQuery, sortOrder]);

  const handleQuantityChange = (productId, delta, maxStock) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      const newQty = currentQty + delta;
      
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }
      if (newQty > maxStock) return prev;
      return { ...prev, [productId]: newQty };
    });
  };

  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = useMemo(() => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = INITIAL_PRODUCTS.find(p => p.id === parseInt(id));
      return total + (product ? product.price * qty : 0);
    }, 0);
  }, [cart]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} font-sans min-h-screen selection:bg-[#C62828] selection:text-white fade-in`}>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #475569; }
      `}} />

      <div className="min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
        
        {/* Navbar Productos */}
        <header className="sticky top-0 z-40 bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors flex items-center gap-2">
                <ArrowLeft size={20} />
              </button>
              <div 
                onClick={onBack}
                className="text-[#C62828] font-montserrat font-black text-2xl tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
              >
                jamar<span className="text-xs align-top">®</span>
              </div>
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Layout Principal Productos */}
        <div className="flex-1 max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row relative">
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full lg:w-auto">
            <div className="mb-8">
              <h1 className="font-montserrat font-black text-3xl md:text-4xl uppercase tracking-tight mb-2">Catálogo</h1>
              <p className="font-inter text-gray-500 dark:text-gray-400">Selecciona los productos y añádelos a tu solicitud de extra cupo.</p>
            </div>

            {/* Barra Búsqueda y Ordenamiento */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre o código..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C62828] font-inter text-gray-800 dark:text-gray-200 shadow-sm"
                />
              </div>
              <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-inter font-medium text-gray-700 dark:text-gray-300 shadow-sm whitespace-nowrap"
              >
                <ArrowUpDown size={18} />
                Precio: {sortOrder === 'asc' ? 'Menor a Mayor' : 'Mayor a Menor'}
              </button>
            </div>

            {/* Grid Productos */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                <Search className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="font-montserrat font-bold text-xl mb-2">No se encontraron productos</h3>
                <p className="font-inter text-gray-500 dark:text-gray-400">Intenta buscar con otros términos.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map(product => {
                  const qtyInCart = cart[product.id] || 0;
                  const isOutOfStock = product.stock === 0;

                  return (
                    <div key={product.id} className="bg-white dark:bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all flex flex-col group relative">
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
                              Sin Stock
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-inter font-semibold text-gray-900 dark:text-white text-lg leading-tight mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="font-montserrat font-black text-[#C62828] dark:text-[#E53935] text-xl mb-4">
                          {formatPrice(product.price)}
                        </p>

                        <div className="mt-auto">
                          <p className="text-xs font-inter text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
                            {isOutOfStock ? <AlertCircle size={12}/> : null}
                            Stock disponible: {product.stock} uds.
                          </p>

                          {!isOutOfStock ? (
                            qtyInCart > 0 ? (
                              <div className="flex items-center justify-between bg-gray-100 dark:bg-[#2A2A2A] rounded-xl p-1">
                                <button onClick={() => handleQuantityChange(product.id, -1, product.stock)} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#3A3A3A] shadow-sm hover:bg-gray-50"><Minus size={18} /></button>
                                <span className="font-inter font-bold w-8 text-center">{qtyInCart}</span>
                                <button onClick={() => handleQuantityChange(product.id, 1, product.stock)} disabled={qtyInCart >= product.stock} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#3A3A3A] shadow-sm hover:bg-gray-50 disabled:opacity-50"><Plus size={18} /></button>
                              </div>
                            ) : (
                              <button onClick={() => handleQuantityChange(product.id, 1, product.stock)} className="w-full py-3 bg-[#C62828] hover:bg-[#A31F1F] dark:bg-[#C62828] text-white font-inter font-semibold rounded-xl transition-colors shadow-sm">
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
                })}
              </div>
            )}
            <div className="h-24 lg:h-0"></div>
          </main>

          {/* Carrito PC */}
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
                    const product = INITIAL_PRODUCTS.find(p => p.id === parseInt(id));
                    if (!product) return null;
                    return (
                      <div key={id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <p className="font-inter text-sm line-clamp-1">{product.name}</p>
                          <p className="font-montserrat font-bold text-[#C62828] text-sm">{formatPrice(product.price)}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button onClick={() => handleQuantityChange(product.id, -1, product.stock)} className="text-gray-500 p-1 bg-gray-100 dark:bg-gray-800 rounded"><Minus size={12} /></button>
                            <span className="font-inter text-sm font-semibold w-4 text-center">{qty}</span>
                            <button onClick={() => handleQuantityChange(product.id, 1, product.stock)} disabled={qty >= product.stock} className="text-gray-500 p-1 bg-gray-100 dark:bg-gray-800 rounded disabled:opacity-30"><Plus size={12} /></button>
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
                Generar Solicitud
              </button>
            </div>
          </aside>
        </div>

        {/* Carrito Mobile FAB */}
        <button 
          className="lg:hidden fixed bottom-6 right-6 w-16 h-16 bg-[#C62828] text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-105"
          onClick={() => setIsMobileCartOpen(true)}
        >
          <div className="relative">
            <ShoppingCart size={28} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-white text-[#C62828] font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#C62828]">
                {cartItemsCount}
              </span>
            )}
          </div>
        </button>

        {/* Drawer Mobile */}
        {isMobileCartOpen && (
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
                      const product = INITIAL_PRODUCTS.find(p => p.id === parseInt(id));
                      if (!product) return null;
                      return (
                        <div key={id} className="flex gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden"><img src={product.image} className="w-full h-full object-cover" alt="" /></div>
                          <div className="flex-1">
                            <p className="font-inter text-sm line-clamp-2">{product.name}</p>
                            <p className="font-montserrat font-bold text-[#C62828] text-sm mt-1">{formatPrice(product.price)}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <button onClick={() => handleQuantityChange(product.id, -1, product.stock)} className="bg-gray-100 dark:bg-gray-800 p-1 rounded"><Minus size={14}/></button>
                              <span className="w-4 text-center text-sm font-bold">{qty}</span>
                              <button onClick={() => handleQuantityChange(product.id, 1, product.stock)} disabled={qty >= product.stock} className="bg-gray-100 dark:bg-gray-800 p-1 rounded"><Plus size={14}/></button>
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
                  Generar Solicitud
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENTE: CHECKOUT (FORMULARIO Y CONFIRMACIÓN)
// ============================================================================
const CheckoutPage = ({ cart, setCart, onBack, onComplete, darkMode, setDarkMode }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', idDoc: '', email: '', phone: '' });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [orderId, setOrderId] = useState('');

  const formatPrice = (price) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);

  const cartTotal = useMemo(() => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = INITIAL_PRODUCTS.find(p => p.id === parseInt(id));
      return total + (product ? product.price * qty : 0);
    }, 0);
  }, [cart]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        setFileError("El archivo supera los 5MB permitidos.");
        setFile(null);
      } else if (selected.type !== "application/pdf") {
        setFileError("Solo se permiten archivos PDF.");
        setFile(null);
      } else {
        setFileError("");
        setFile(selected);
      }
    }
  };

  const handleSubmit = () => {
    const newOrderId = 'JMR-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setOrderId(newOrderId);
    setStep(4);
  };

  const renderStepper = () => (
    <div className="flex items-center justify-between mb-8 relative">
      <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-y-1/2"></div>
      <div className="absolute left-0 top-1/2 h-1 bg-[#C62828] transition-all duration-300 -z-10 transform -translate-y-1/2" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
      
      {['Datos personales', 'Documento', 'Confirmar'].map((label, index) => {
        const stepNumber = index + 1;
        const isActive = step >= stepNumber;
        return (
          <div key={label} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${isActive ? 'bg-[#C62828] text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
              {stepNumber}
            </div>
            <span className={`mt-2 text-xs md:text-sm font-inter font-semibold hidden sm:block ${isActive ? 'text-[#C62828]' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );

  // PANTALLA DE ÉXITO (PASO 4)
  if (step === 4) {
    return (
      <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-[#121212] selection:bg-[#C62828] selection:text-white flex items-center justify-center p-4 fade-in`}>
        <div className="bg-white dark:bg-[#1E1E1E] p-8 md:p-12 rounded-[2rem] shadow-2xl text-center max-w-md w-full border border-gray-100 dark:border-gray-800">
          <CheckCircle2 size={80} className="text-[#00A8A8] mx-auto mb-6" />
          <h2 className="font-montserrat font-black text-3xl text-gray-900 dark:text-white uppercase mb-2">¡Solicitud enviada!</h2>
          <p className="font-inter text-gray-600 dark:text-gray-400 mb-6">Tu orden ha sido registrada exitosamente.</p>
          
          <div className="bg-gray-50 dark:bg-[#121212] rounded-xl p-4 mb-8 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-inter mb-1">ID de tu orden</p>
            <p className="font-montserrat font-bold text-2xl text-[#C62828]">{orderId}</p>
          </div>
          
          <button 
            onClick={() => { setCart({}); onComplete(); }}
            className="w-full py-4 bg-[#C62828] hover:bg-[#8E1C1C] text-white font-montserrat font-bold uppercase rounded-xl transition-all shadow-md"
          >
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  // PANTALLA DEL FORMULARIO (PASOS 1 al 3)
  return (
    <div className={`${darkMode ? 'dark' : ''} font-sans min-h-screen selection:bg-[#C62828] selection:text-white fade-in bg-gray-50 dark:bg-[#121212]`}>
      {/* Navbar Checkout */}
      <header className="sticky top-0 z-40 bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors flex items-center gap-2">
              <ArrowLeft size={20} />
            </button>
            <div onClick={onBack} className="text-[#C62828] font-montserrat font-black text-2xl tracking-tighter cursor-pointer">
              jamar<span className="text-xs align-top">®</span>
            </div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto p-4 sm:p-6 lg:p-8 pt-8">
        <h1 className="font-montserrat font-black text-3xl text-gray-900 dark:text-white uppercase tracking-tight mb-8 text-center">
          Finalizar Solicitud
        </h1>
        
        {renderStepper()}

        {/* PASO 1: DATOS PERSONALES */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 fade-in">
            {/* Formulario */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800 lg:col-span-3">
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-5">
                <h3 className="font-montserrat font-bold text-xl text-gray-900 dark:text-white mb-4">Datos personales</h3>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre completo</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C62828] outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cédula de ciudadanía</label>
                  <input required type="number" value={formData.idDoc} onChange={e => setFormData({...formData, idDoc: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C62828] outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C62828] outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C62828] outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
                </div>
                <div className="pt-4 flex justify-center">
                  <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-[#C62828] text-white font-inter font-semibold rounded-xl hover:bg-[#8E1C1C] transition-colors shadow-md">Siguiente paso</button>
                </div>
              </form>
            </div>

            {/* Resumen del Carrito en Tarjeta Separada */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800 lg:col-span-2 h-fit flex flex-col">
              <h3 className="font-montserrat font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-3">
                <ShoppingBag className="text-[#C62828]" size={20} /> Resumen del carrito
              </h3>
              <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {Object.entries(cart).map(([id, qty]) => {
                  const product = INITIAL_PRODUCTS.find(p => p.id === parseInt(id));
                  if (!product) return null;
                  return (
                    <div key={id} className="flex justify-between items-center text-sm font-inter">
                      <div className="flex items-center gap-3 flex-1 pr-2">
                        <img src={product.image} className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-800 object-cover border border-gray-200 dark:border-gray-700" alt={product.name}/>
                        <span className="text-gray-700 dark:text-gray-300 line-clamp-2 leading-tight">
                          <span className="font-bold text-[#C62828] mr-1">{qty}x</span> 
                          {product.name}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white whitespace-nowrap ml-2">
                        {formatPrice(product.price * qty)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <span className="font-inter font-bold text-gray-900 dark:text-white">Total:</span>
                <span className="font-montserrat font-black text-xl text-[#C62828]">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        )}

        {/* PASOS 2 Y 3: EN CONTENEDOR CENTRAL ÚNICO */}
        {(step === 2 || step === 3) && (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800 min-h-[400px]">
            {/* PASO 2: DOCUMENTO */}
            {step === 2 && (
              <div className="space-y-6 fade-in">
                <h3 className="font-montserrat font-bold text-xl text-gray-900 dark:text-white mb-2">Formato de aprobación</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-inter mb-4">Adjunta el documento debidamente diligenciado. Este paso es obligatorio para validar tu cupo.</p>
                
                <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl cursor-pointer bg-gray-50 dark:bg-[#121212] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all relative overflow-hidden group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud size={48} className="text-[#00A8A8] mb-3 group-hover:scale-110 transition-transform" />
                    <p className="mb-2 text-sm text-gray-600 dark:text-gray-300 font-inter"><span className="font-semibold text-[#C62828]">Haz clic para subir</span> o arrastra el archivo</p>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">PDF (Máximo 5MB)</p>
                  </div>
                  <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
                </label>
                
                {fileError && <p className="text-red-500 text-sm font-inter mt-2 flex items-center gap-2 bg-red-50 p-3 rounded-lg border border-red-100"><AlertCircle size={16}/> {fileError}</p>}
                {file && <p className="text-[#00A8A8] text-sm font-inter font-medium mt-2 flex items-center gap-2 bg-[#00A8A8]/10 p-3 rounded-lg border border-[#00A8A8]/20"><FileText size={16}/> {file.name}</p>}

                <div className="pt-6 flex justify-between gap-4">
                  <button onClick={() => setStep(1)} className="px-6 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-inter font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto text-center">Atrás</button>
                  <button disabled={!file} onClick={() => setStep(3)} className="px-8 py-4 bg-[#C62828] text-white font-inter font-semibold rounded-xl disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-colors shadow-md w-full sm:w-auto text-center">Revisar solicitud</button>
                </div>
              </div>
            )}

            {/* PASO 3: CONFIRMACIÓN */}
            {step === 3 && (
              <div className="space-y-6 fade-in">
                <h3 className="font-montserrat font-bold text-xl text-gray-900 dark:text-white mb-4">Confirmación de solicitud</h3>
                
                <div className="bg-gray-50 dark:bg-[#121212] p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h4 className="font-inter font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">1. Datos registrados</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-inter text-gray-700 dark:text-gray-300">
                    <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">Nombre completo:</span> {formData.name}</div>
                    <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">Cédula:</span> {formData.idDoc}</div>
                    <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">Correo:</span> {formData.email}</div>
                    <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">Teléfono:</span> {formData.phone}</div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-[#121212] p-5 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-inter font-bold text-gray-900 dark:text-white mb-1">2. Documento adjunto</h4>
                    <p className="text-sm font-inter flex items-center gap-2 text-[#00A8A8]"><FileText size={16}/> {file?.name}</p>
                  </div>
                  <CheckCircle2 className="text-[#00A8A8]" />
                </div>

                <div className="bg-gray-50 dark:bg-[#121212] p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h4 className="font-inter font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">3. Resumen del carrito</h4>
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                    {Object.entries(cart).map(([id, qty]) => {
                      const product = INITIAL_PRODUCTS.find(p => p.id === parseInt(id));
                      if (!product) return null;
                      return (
                        <div key={id} className="flex justify-between items-center text-sm font-inter">
                          <span className="text-gray-700 dark:text-gray-300 flex-1 pr-4"><span className="font-bold text-[#C62828] mr-2">{qty}x</span> {product.name}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(product.price * qty)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-inter font-bold text-gray-900 dark:text-white text-lg">Total estimado:</span>
                    <span className="font-montserrat font-black text-2xl text-[#C62828]">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-between gap-4">
                  <button onClick={() => setStep(2)} className="px-6 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-inter font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center">Atrás</button>
                  <button onClick={handleSubmit} className="px-8 py-4 bg-[#C62828] text-white font-inter font-bold rounded-xl hover:bg-[#8E1C1C] transition-colors shadow-lg flex items-center justify-center gap-2">
                    <CheckCircle2 size={20} /> Confirmar y enviar solicitud
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// ============================================================================
// COMPONENTE: LANDING PAGE (CANVA STYLE)
// ============================================================================
const LandingPage = ({ onGoToProducts }) => {
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

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
            <button onClick={onGoToProducts} className="bg-white text-[#C62828] hover:bg-transparent hover:text-white hover:border-white border-2 border-transparent transition-all duration-300 font-montserrat font-bold uppercase tracking-widest px-10 py-5 rounded-full text-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center gap-3 group mx-auto lg:mx-0">
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
        <button onClick={onGoToProducts} className="mt-8 bg-[#C62828] hover:bg-[#8E1C1C] text-white transition-all duration-300 font-montserrat font-bold uppercase tracking-widest px-12 py-6 rounded-full text-xl shadow-[0_15px_30px_rgba(198,40,40,0.3)] hover:shadow-[0_10px_20px_rgba(198,40,40,0.4)] hover:-translate-y-1 flex items-center gap-4">
          <ShoppingBag size={28} /> Ver Productos
        </button>
      </section>
    </div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL (ENRUTADOR SIMPLE)
// ============================================================================
export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [cart, setCart] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&family=Inter:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />
      
      {currentView === 'landing' && (
        <LandingPage onGoToProducts={() => setCurrentView('products')} />
      )}
      {currentView === 'products' && (
        <ProductsPage 
          onBack={() => setCurrentView('landing')} 
          onCheckout={() => setCurrentView('checkout')}
          cart={cart}
          setCart={setCart}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
      {currentView === 'checkout' && (
        <CheckoutPage 
          cart={cart}
          setCart={setCart}
          onBack={() => setCurrentView('products')}
          onComplete={() => setCurrentView('products')}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
    </>
  );
}