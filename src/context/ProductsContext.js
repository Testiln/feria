'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadProducts() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch('/api/products', { cache: 'no-store' })
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload?.error || 'No se pudieron cargar los productos')
        }

        if (isMounted) {
          setProducts(Array.isArray(payload.products) ? payload.products : [])
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'No se pudieron cargar los productos')
          setProducts([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const productsById = useMemo(() => {
    return products.reduce((accumulator, product) => {
      accumulator[product.id] = product
      return accumulator
    }, {})
  }, [products])

  return (
    <ProductsContext.Provider value={{ products, productsById, loading, error, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider')
  }
  return context
}