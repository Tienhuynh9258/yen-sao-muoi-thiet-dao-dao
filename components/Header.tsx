'use client'

import { useState } from 'react'
import { useAppContext } from '@/app/context'
import { Menu, X, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  const { cartItems } = useAppContext()
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm', href: '/product' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
  ] as const

  return (
    <header
      style={{ backgroundColor: '#1a0a00', color: '#ffffff' }}
      className="sticky top-0 z-50 w-full"
    >
      {/* Top bar */}
      <div
        style={{ backgroundColor: '#8b1a1a' }}
        className="text-white text-xs font-sans w-full py-1.5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <span className="text-xs">Sản phẩm yến sào chính hãng 100% nguyên chất</span>
          </div>
          <a
            href="tel:0938013789"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold hover:text-yellow-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            0938.013.789
          </a>
          <a
            href="mailto:yensaomuoithiet.daodao@gmail.com"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold hover:text-yellow-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            yensaomuoithiet.daodao@gmail.com
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9.8 2 8 3.8 8 6c0 1.5.7 2.8 1.7 3.7.5.4.5.8.1 1.3-1.8 1.8-5.8 6.7-5.8 9.5 0 1.7 1.2 2.5 2.5 2.5h9c1.3 0 2.5-.8 2.5-2.5 0-2.8-4-7.7-5.8-9.5-.4-.5-.4-1 .1-1.3C15.3 8.8 16 7.5 16 6c0-2.2-1.8-4-4-4z"/>
          </svg>
          <span>Yến Sào</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium hover:text-yellow-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Zalo */}
          <a
            href="https://zalo.me/0938013789"
            target="_blank"
            rel="noopener noreferrer"
            className="relative hover:opacity-80 transition-opacity"
            aria-label="Chat Zalo"
            title="Chat Zalo"
          >
            <img
              src="zalo-icon.png"
              alt="Zalo"
              className="w-6 h-6 object-contain"
            />
          </a>

          {/* Cart */}
          <Link href="/cart" className="relative hover:text-yellow-300 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center" style={{ backgroundColor: '#c8922a', color: '#1a0a00' }}>
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden hover:text-yellow-300 transition-colors"
            aria-label="menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-2" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block w-full text-left font-sans text-sm font-medium hover:text-yellow-300 transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="block w-full text-left font-sans text-sm font-medium hover:text-yellow-300 transition-colors py-2"
            onClick={() => setMobileOpen(false)}
          >
            Giỏ hàng ({totalItems})
          </Link>
        </div>
      )}
    </header>
  )
}
