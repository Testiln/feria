'use client'

import React, { createContext, useContext, useState, useMemo } from 'react';
import { useProducts } from './ProductsContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const { products } = useProducts();

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

  const clearCart = () => {
    setCart({});
  };

  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);
  
  const cartTotal = useMemo(() => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find(p => p.id === id);
      return total + (product ? product.price * qty : 0);
    }, 0);
  }, [cart, products]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      handleQuantityChange, 
      clearCart, 
      cartItemsCount, 
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('');
  }
  return context;
}