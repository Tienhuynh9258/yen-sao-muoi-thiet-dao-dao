'use client'

import { useAppContext } from '@/app/context'
import { categories, products } from '@/lib/products'
import { ChevronDown, Filter } from 'lucide-react'
import { useState } from 'react'
import { ProductCard } from './ProductCard'

export function ShopPage() {
  const { categoryFilter, setCategoryFilter, sortBy, setSortBy } = useAppContext()
  const [showFilters, setShowFilters] = useState(false)

  // Filter products
  let filteredProducts = products
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter)
  }

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
  }

  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Bộ Sưu Tập Cao Cấp
          </h1>
          <p className="font-sans text-muted max-w-2xl">
            Duyệt qua lựa chọn độc quyền các sản phẩm yến sào cao cấp của chúng tôi
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg mb-4"
            >
              <Filter className="w-4 h-4" />
              <span className="font-sans font-semibold text-foreground">Bộ Lọc</span>
            </button>

            <div
              className={`${showFilters ? 'block' : 'hidden'} lg:block bg-card rounded-lg p-6 border border-border`}
            >
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-serif font-bold text-foreground mb-4">Danh Mục</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setCategoryFilter('')}
                    className={`w-full text-left px-3 py-2 rounded transition-colors font-sans text-sm ${
                      categoryFilter === ''
                        ? 'bg-primary text-card'
                        : 'hover:bg-hover text-foreground'
                    }`}
                  >
                    Tất Cả Sản Phẩm
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors font-sans text-sm ${
                        categoryFilter === cat
                          ? 'bg-primary text-card'
                          : 'hover:bg-hover text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <h3 className="font-serif font-bold text-foreground mb-4">Sắp Xếp Theo</h3>
                <div className="space-y-2">
                  {[
                    { value: 'price-low', label: 'Giá: Thấp đến Cao' },
                    { value: 'price-high', label: 'Giá: Cao đến Thấp' },
                    { value: 'rating', label: 'Xếp Hạng Cao Nhất' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setSortBy(option.value as 'price-low' | 'price-high' | 'rating')
                      }
                      className={`w-full text-left px-3 py-2 rounded transition-colors font-sans text-sm ${
                        sortBy === option.value
                          ? 'bg-primary text-card'
                          : 'hover:bg-hover text-foreground'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="font-sans text-sm text-muted">
                    Đang hiển thị {filteredProducts.length} sản phẩm
                    {categoryFilter && ` trong ${categoryFilter}`}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="font-serif text-2xl text-foreground mb-2">Không tìm thấy sản phẩm</p>
                <p className="font-sans text-muted">
                  Hãy thử điều chỉnh bộ lọc của bạn để tìm những gì bạn đang tìm kiếm
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
