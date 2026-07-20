'use client'

import { useAppContext } from '@/app/context'
import { formatPrice, getSlug } from '@/lib/products'
import { Menu, Search, Settings, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface ProductPreview {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
}

export function Header() {
  const router = useRouter()
  const { cartItems } = useAppContext()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  // Search states
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [allProducts, setAllProducts] = useState<ProductPreview[]>([])
  const [searchResults, setSearchResults] = useState<ProductPreview[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/admin/check')
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.authenticated === true))
      .catch(() => setIsAdmin(false))
  }, [])

  // Fetch products when search opens
  useEffect(() => {
    if (!searchOpen) return
    setSearchLoading(true)
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const products = (data.products ?? []) as ProductPreview[]
        setAllProducts(products)
        setSearchResults(products)
        setSearchLoading(false)
      })
      .catch(() => setSearchLoading(false))
  }, [searchOpen])

  // Filter when query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(allProducts)
      return
    }
    try {
      const re = new RegExp(searchQuery.trim(), 'i')
      setSearchResults(allProducts.filter((p) => re.test(p.name)))
    } catch {
      setSearchResults(
        allProducts.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        )
      )
    }
  }, [searchQuery, allProducts])

  // Close search on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    if (searchOpen) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [searchOpen])

  const handleSelectProduct = (product: ProductPreview) => {
    setSearchOpen(false)
    setSearchQuery('')
    router.push(`/product/${getSlug(product.name)}`)
  }

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm', href: '/product' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
  ] as const

  return (
    <header className="sticky top-0 z-50">
      {/* Thanh hotline đỏ */}
      <div style={{ backgroundColor: '#8b1a1a' }} className="text-white py-1.5">
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
            <a href="https://www.facebook.com/share/1BLqoquDQi/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                alt="Facebook"
                className="w-5 h-5 object-contain"
                loading="lazy"
              />
            </a>
            <a href="https://zalo.me/0938013789" target="_blank" rel="noopener noreferrer" aria-label="Zalo" className="hover:opacity-80 transition-opacity">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                alt="Zalo"
                className="w-5 h-5 object-contain"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Nav chính - nền trắng */}
      <div
        className="bg-white relative z-10"
        style={{
          borderBottom: '1px solid #e8d5b0',
          boxShadow: '0 1px 0 rgba(139,26,26,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - nổi trên dải trắng */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity flex-shrink-0 relative z-20">
              <div className="relative -mb-10 logo-glow-wrap">
                <Image
                  src="/logo_transparent.png"
                  alt="Yến Sào Mười Thiết Đào Đào"
                  width={56}
                  height={56}
                  className="h-16 w-16 object-contain custom-logo-shadow"
                  priority
                />
              </div>
              <div className="hidden sm:block text-left">
                <div className="font-sans font-bold text-base leading-tight tracking-wide" style={{ color: '#8b1a1a' }}>
                  Yến Sào Mười Thiết
                </div>
                <div className="font-sans font-semibold text-xs tracking-wider" style={{ color: '#c8922a' }}>
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
                  className="nav-link-underline px-4 py-2 font-semibold text-sm rounded-lg transition-all duration-200 hover:opacity-80"
                  style={{ color: '#8b1a1a' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Giỏ hàng + Tìm kiếm + Admin + Mobile menu */}
            <div className="flex items-center gap-2 relative">
              {isAdmin === true && (
                <Link
                  href="/admin/dashboard/"
                  title="Trang quản trị"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 active:translate-y-0"
                  style={{ backgroundColor: '#8b1a1a', color: '#ffffff', boxShadow: '0 2px 6px rgba(139,26,26,0.25)' }}
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              )}

              {/* Tìm kiếm */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setSearchOpen((prev) => !prev)}
                  className="relative p-2.5 rounded-xl transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 active:translate-y-0"
                  style={{ backgroundColor: '#8b1a1a', boxShadow: '0 2px 6px rgba(139,26,26,0.25)' }}
                  aria-label="Tìm kiếm"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>

                {searchOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-xl p-3 z-50"
                    style={{
                      borderColor: '#e8d5b0',
                      borderWidth: 1,
                      boxShadow: '0 4px 20px rgba(26,10,0,0.08), 0 1px 4px rgba(200,146,42,0.12)',
                    }}
                  >
                    <input
                      autoFocus
                      placeholder="Tìm sản phẩm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border text-sm font-sans outline-none"
                      style={{ borderColor: '#e8d5b0' }}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setSearchOpen(false)
                      }}
                    />
                    <div className="mt-2 max-h-64 overflow-y-auto space-y-1">
                      {searchLoading ? (
                        <p className="font-sans text-xs text-center py-2" style={{ color: '#8a6a40' }}>
                          Đang tải...
                        </p>
                      ) : searchResults.length === 0 ? (
                        <p className="font-sans text-xs text-center py-2" style={{ color: '#8a6a40' }}>
                          Không tìm thấy sản phẩm
                        </p>
                      ) : (
                        searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleSelectProduct(product)}
                            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors"
                          >
                            <img
                              src={product.images?.[0] || product.image}
                              alt={product.name}
                              className="h-10 w-10 rounded object-cover border flex-shrink-0"
                              style={{ borderColor: '#e8d5b0' }}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-sans text-sm font-semibold truncate" style={{ color: '#1a0a00' }}>
                                {product.name}
                              </p>
                              <p className="font-sans text-xs font-semibold" style={{ color: '#c8922a' }}>
                                {formatPrice(product.price)}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Giỏ hàng */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: '#8b1a1a', boxShadow: '0 2px 6px rgba(139,26,26,0.25)' }}
                aria-label="Giỏ hàng"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
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
              {isAdmin === true && (
                <Link
                  href="/admin/dashboard/"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-left px-4 py-3 font-semibold text-sm rounded transition-colors block"
                  style={{ color: '#8b1a1a' }}
                >
                  Trang quản trị
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
