'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

export interface Product {
  id: string
  name: string
  image: string
  images?: string[]
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
  categoryFilters: string[]
  toggleCategoryFilter: (category: string) => void
  setCategoryFilters: (categories: string[]) => void
  sortBy: 'price-low' | 'price-high' | 'rating'
  setSortBy: (sort: 'price-low' | 'price-high' | 'rating') => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  toast: { message: string; visible: boolean } | null
  showToast: (message: string) => void
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
  const [categoryFilters, setCategoryFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating'>('price-low')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5_000_000])
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null)

  const showToast = (message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, visible: false } : null))
      setTimeout(() => setToast(null), 300)
    }, 2500)
  }

  const toggleCategoryFilter = (category: string) => {
    setCategoryFilters((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

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
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`)
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
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
        categoryFilters,
        toggleCategoryFilter,
        setCategoryFilters,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const noop = () => {}
const SSR_FALLBACK: AppContextType = {
  selectedProduct: null,
  setSelectedProduct: noop,
  cartItems: [],
  addToCart: noop,
  removeFromCart: noop,
  updateCartQuantity: noop,
  clearCart: noop,
  categoryFilters: [],
  toggleCategoryFilter: noop,
  setCategoryFilters: noop,
  sortBy: 'price-low',
  setSortBy: noop,
  priceRange: [0, 5_000_000],
  setPriceRange: noop,
  toast: null,
  showToast: noop,
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    // During SSR/prerender, return a safe fallback to avoid build errors
    if (typeof window === 'undefined') {
      return SSR_FALLBACK
    }
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
