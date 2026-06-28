'use client'

import { useAppContext } from '@/app/context'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'

export function Header() {
  const { setCurrentPage, cartItems } = useAppContext()

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-card font-serif font-bold text-lg">Y</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-serif font-bold text-foreground text-lg">Yến Sào</div>
              <div className="font-sans text-xs text-muted">Mười Thiết Đào Đào</div>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('home')}
              className="font-serif text-foreground hover:text-primary transition-colors text-sm"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className="font-serif text-foreground hover:text-primary transition-colors text-sm"
            >
              Shop
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className="font-serif text-foreground hover:text-primary transition-colors text-sm"
            >
              About
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="font-serif text-foreground hover:text-primary transition-colors text-sm"
            >
              Contact
            </button>
          </nav>

          {/* Cart Button */}
          <button
            onClick={() => setCurrentPage('cart')}
            className="relative p-2 hover:bg-hover rounded-lg transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-foreground" />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-accent text-card text-xs font-bold rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
