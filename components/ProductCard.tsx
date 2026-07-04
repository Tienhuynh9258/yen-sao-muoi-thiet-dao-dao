'use client'

import type { Product } from '@/app/context'
import { useAppContext } from '@/app/context'
import { formatPrice } from '@/lib/products'
import { ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { setCurrentPage, setSelectedProduct, addToCart } = useAppContext()

  const handleProductClick = () => {
    setSelectedProduct(product)
    setCurrentPage('product-detail')
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <div
      className="rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl border"
      style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}
    >
      {/* Hình ảnh */}
      <button
        onClick={handleProductClick}
        className="relative w-full aspect-square overflow-hidden group cursor-pointer block"
        style={{ backgroundColor: '#fdf3e3' }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: '#c8922a' }}
        >
          {product.category}
        </div>
      </button>

      {/* Nội dung */}
      <div className="p-4">
        <button
          onClick={handleProductClick}
          className="block w-full text-left font-sans font-bold text-base mb-2 leading-snug line-clamp-1 hover:underline"
          style={{ color: '#1a0a00' }}
        >
          {product.name}
        </button>

        {/* Đánh giá */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5"
                style={{
                  fill: i < Math.floor(product.rating) ? '#c8922a' : 'transparent',
                  color: i < Math.floor(product.rating) ? '#c8922a' : '#d1c0a8',
                }}
              />
            ))}
          </div>
          <span className="font-sans text-xs ml-1" style={{ color: '#8a6a40' }}>
            ({product.reviews})
          </span>
        </div>

        {/* Giá */}
        <p className="font-sans font-bold text-lg mb-4" style={{ color: '#c8922a' }}>
          {formatPrice(product.price)}
        </p>

        {/* Nút thêm giỏ */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-sans font-semibold text-sm text-white transition-all hover:opacity-90"
          style={{ backgroundColor: '#8b1a1a' }}
        >
          <ShoppingCart className="w-4 h-4" />
          Thêm Vào Giỏ
        </button>
      </div>
    </div>
  )
}
