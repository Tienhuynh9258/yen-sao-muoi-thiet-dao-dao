'use client'

import { useAppContext } from '@/app/context'
import { Menu, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const { cartItems } = useAppContext()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm', href: '/product' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
  ] as const

  return (
    <header className="sticky top-0 z-50">
      {/* Thanh hotline đỏ */}
      <div style={{ backgroundColor: '#8b1a1a' }} className="text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-6">
            <a
              href="tel:0938013789"
              className="flex items-center gap-1.5 text-sm font-semibold hover:text-yellow-300 transition-colors"
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
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/share/1BLqoquDQi/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-yellow-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://zalo.me/0938013789" target="_blank" rel="noopener noreferrer" aria-label="Zalo" className="hover:text-yellow-300 transition-colors">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                <span style={{ color: '#0068ff' }} className="font-extrabold text-[8px] leading-none">Zalo</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Nav chính - nền trắng */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Yến Sào Mười Thiết Đào Đào"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              <div className="hidden sm:block text-left">
                <div className="font-sans font-bold text-lg leading-tight" style={{ color: '#8b1a1a' }}>
                  Yến Sào Mười Thiết
                </div>
                <div className="font-sans font-semibold text-sm" style={{ color: '#c8922a' }}>
                  Đào Đào
                </div>
              </div>
            </Link>

            {/* Navigation - desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 font-semibold text-sm rounded transition-colors hover:text-white"
                  style={{ color: '#8b1a1a' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8b1a1a'
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#8b1a1a'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Giỏ hàng + Mobile menu */}
            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className="relative p-2 rounded-lg transition-colors hover:bg-gray-100"
              >
                <ShoppingCart className="w-6 h-6" style={{ color: '#8b1a1a' }} />
                {cartItems.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#c8922a' }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" style={{ color: '#8b1a1a' }} /> : <Menu className="w-6 h-6" style={{ color: '#8b1a1a' }} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="md:hidden border-t py-3 space-y-1" style={{ borderColor: '#e8d5b0' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-left px-4 py-3 font-semibold text-sm rounded transition-colors block"
                  style={{ color: '#8b1a1a' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
