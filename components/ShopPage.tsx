'use client'

import type { Product } from '@/app/context'
import { useAppContext } from '@/app/context'
import { categories } from '@/lib/products'
import { Check, ListFilter as Filter } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import { DualRangeSlider } from './DualRangeSlider'

interface ShopPageProps {
  products: Product[]
}

export function ShopPage({ products }: ShopPageProps) {
  const { categoryFilters, toggleCategoryFilter, setCategoryFilters, sortBy, setSortBy, priceRange, setPriceRange } = useAppContext()
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)

  // Input values for price range (controlled separately)
  const [minPriceInput, setMinPriceInput] = useState<string>(String(priceRange[0]))
  const [maxPriceInput, setMaxPriceInput] = useState<string>(String(priceRange[1]))

  useEffect(() => {
    setMinPriceInput(String(priceRange[0]))
    setMaxPriceInput(String(priceRange[1]))
  }, [priceRange])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [categoryFilters, sortBy, priceRange])

  let filteredProducts = products
  if (categoryFilters.length > 0) {
    filteredProducts = filteredProducts.filter((p: Product) => categoryFilters.includes(p.category))
  }
  filteredProducts = filteredProducts.filter(
    (p: Product) => p.price >= priceRange[0] && p.price <= priceRange[1]
  )
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a: Product, b: Product) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a: Product, b: Product) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a: Product, b: Product) => b.rating - a.rating)
  }

  const isAllSelected = categoryFilters.length === 0

  const categoryBtnClass = (active: boolean) =>
    `w-full text-left px-3 py-2 rounded-lg font-sans text-sm font-medium transition-colors flex items-center justify-between ${
      active ? 'text-white' : 'hover:bg-gray-50'
    }`

  const allBtnClass = isAllSelected
    ? 'w-full text-left px-3 py-2 rounded-lg font-sans text-sm font-medium transition-colors flex items-center justify-between text-white'
    : 'w-full text-left px-3 py-2 rounded-lg font-sans text-sm font-medium transition-colors flex items-center justify-between hover:bg-gray-50'

  return (
    <main style={{ backgroundColor: '#fdf8f3' }} className="min-h-screen">
      {/* Banner đầu trang */}
      <div style={{ backgroundColor: '#8b1a1a' }} className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-sans text-3xl md:text-4xl font-bold text-white mb-2">
            Cửa Hàng Yến Sào
          </h1>
          <p className="font-sans text-white/75 text-sm">
            Lựa chọn độc quyền các sản phẩm yến sào cao cấp 100% nguyên chất
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center gap-2 px-4 py-2.5 rounded-lg mb-4 border font-sans font-semibold text-sm"
              style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0', color: '#1a0a00' }}
            >
              <Filter className="w-4 h-4" />
              Bộ Lọc
            </button>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block rounded-xl p-5 border`} style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}>
              {/* Danh mục */}
              <div className="mb-7">
                <h3 className="font-sans font-bold mb-3" style={{ color: '#1a0a00' }}>Danh Mục</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setCategoryFilters([])}
                    className={allBtnClass}
                    style={isAllSelected ? { backgroundColor: '#c8922a', color: '#ffffff' } : { color: '#1a0a00' }}
                  >
                    <span>Tất Cả Sản Phẩm</span>
                    {isAllSelected && <Check className="w-4 h-4" />}
                  </button>
                  {categories.map((c) => {
                    const active = categoryFilters.includes(c)
                    return (
                      <button
                        key={c}
                        onClick={() => toggleCategoryFilter(c)}
                        className={categoryBtnClass(active)}
                        style={active ? { backgroundColor: '#c8922a', color: '#ffffff' } : { color: '#1a0a00' }}
                      >
                        <span>{c}</span>
                        {active && <Check className="w-4 h-4" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Khoảng giá */}
              <div className="mb-7">
                <h3 className="font-sans font-bold mb-4" style={{ color: '#1a0a00' }}>Khoảng Giá</h3>
                <DualRangeSlider
                  min={0}
                  max={5_000_000}
                  step={50_000}
                  value={priceRange[0] >= priceRange[1] ? [0, 5_000_000] : priceRange}
                  onChange={(val) => setPriceRange(val)}
                  onCommit={() => {}}
                />
                {(priceRange[0] !== 0 || priceRange[1] !== 5_000_000) && (
                  <button
                    onClick={() => {
                      setPriceRange([0, 5_000_000])
                      setMinPriceInput('0')
                      setMaxPriceInput('5000000')
                    }}
                    className="mt-3 w-full text-center font-sans text-xs font-medium underline"
                    style={{ color: '#c8922a' }}
                  >
                    Xóa lọc giá
                  </button>
                )}
              </div>

              {/* Sắp xếp */}
              <div>
                <h3 className="font-sans font-bold mb-3" style={{ color: '#1a0a00' }}>Sắp Xếp Theo</h3>
                <div className="space-y-1">
                  {[
                    { value: 'price-low', label: 'Giá: Thấp đến Cao' },
                    { value: 'price-high', label: 'Giá: Cao đến Thấp' },
                    { value: 'rating', label: 'Xếp Hạng Cao Nhất' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value as 'price-low' | 'price-high' | 'rating')}
                      className={categoryBtnClass(sortBy === opt.value)}
                      style={
                        sortBy === opt.value
                          ? { backgroundColor: '#c8922a', color: '#ffffff' }
                          : { color: '#1a0a00' }
                      }
                    >
                      <span>{opt.label}</span>
                      {sortBy === opt.value && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lưới sản phẩm */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-lg h-96 animate-pulse" style={{ backgroundColor: '#e8d5b0' }} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <p className="font-sans text-sm mb-5" style={{ color: '#8a6a40' }}>
                  Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
                  {categoryFilters.length > 0 && (
                    <> trong <em>{categoryFilters.join(', ')}</em></>
                  )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="font-sans text-2xl font-bold mb-2" style={{ color: '#1a0a00' }}>Không tìm thấy sản phẩm</p>
                <p className="font-sans text-sm" style={{ color: '#8a6a40' }}>
                  Hãy thử điều chỉnh bộ lọc của bạn
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
