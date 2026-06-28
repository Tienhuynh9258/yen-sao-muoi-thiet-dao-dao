'use client'

import { useAppContext } from '@/app/context'
import { categories, products } from '@/lib/products'
import { Filter } from 'lucide-react'
import { useState } from 'react'
import { ProductCard } from './ProductCard'

export function ShopPage() {
  const { categoryFilter, setCategoryFilter, sortBy, setSortBy } = useAppContext()
  const [showFilters, setShowFilters] = useState(false)

  let filteredProducts = products
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter)
  }
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
  }

  const filterBtnClass = (active: boolean) =>
    `w-full text-left px-3 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
      active ? 'text-white' : ''
    }`

  return (
    <main style={{ backgroundColor: '#fdf8f3' }} className="min-h-screen">
      {/* Banner đầu trang */}
      <div style={{ backgroundColor: '#8b1a1a' }} className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
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
          <div className="w-full lg:w-60 flex-shrink-0">
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
                <h3 className="font-serif font-bold mb-3" style={{ color: '#1a0a00' }}>Danh Mục</h3>
                <div className="space-y-1">
                  {[{ value: '', label: 'Tất Cả Sản Phẩm' }, ...categories.map((c) => ({ value: c, label: c }))].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCategoryFilter(opt.value)}
                      className={filterBtnClass(categoryFilter === opt.value)}
                      style={
                        categoryFilter === opt.value
                          ? { backgroundColor: '#c8922a', color: '#ffffff' }
                          : { color: '#1a0a00' }
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sắp xếp */}
              <div>
                <h3 className="font-serif font-bold mb-3" style={{ color: '#1a0a00' }}>Sắp Xếp Theo</h3>
                <div className="space-y-1">
                  {[
                    { value: 'price-low', label: 'Giá: Thấp đến Cao' },
                    { value: 'price-high', label: 'Giá: Cao đến Thấp' },
                    { value: 'rating', label: 'Xếp Hạng Cao Nhất' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value as 'price-low' | 'price-high' | 'rating')}
                      className={filterBtnClass(sortBy === opt.value)}
                      style={
                        sortBy === opt.value
                          ? { backgroundColor: '#c8922a', color: '#ffffff' }
                          : { color: '#1a0a00' }
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lưới sản phẩm */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <>
                <p className="font-sans text-sm mb-5" style={{ color: '#8a6a40' }}>
                  Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
                  {categoryFilter && ` trong danh mục "${categoryFilter}"`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="font-serif text-2xl font-bold mb-2" style={{ color: '#1a0a00' }}>Không tìm thấy sản phẩm</p>
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
