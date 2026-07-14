'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

export interface Product {
  id: string
  name: string
  image: string
  description: string
  price: number
  category: string
  rating: number
  reviews: number
  specs?: string[]
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

interface AppContextType {
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  sortBy: 'price-low' | 'price-high' | 'rating'
  setSortBy: (sort: 'price-low' | 'price-high' | 'rating') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('yen-sao-cart')
      if (stored) {
        try { return JSON.parse(stored) } catch { /* ignore */ }
      }
    }
    return []
  })
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating'>('price-low')

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id: crypto.randomUUID(), product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    localStorage.removeItem('yen-sao-cart')
    setCartItems([])
  }

  useEffect(() => {
    localStorage.setItem('yen-sao-cart', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <AppContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        categoryFilter,
        setCategoryFilter,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
