'use client'

import React, { createContext, useContext, useState } from 'react'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  rating: number
  reviews: number
  specs?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

interface AppContextType {
  currentPage: string
  setCurrentPage: (page: string) => void
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  sortBy: 'price-low' | 'price-high' | 'rating'
  setSortBy: (sort: 'price-low' | 'price-high' | 'rating') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating'>('price-low')

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
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
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
