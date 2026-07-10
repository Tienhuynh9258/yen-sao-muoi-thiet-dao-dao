'use client'

import type { Product } from '@/app/context'
import { useAppContext } from '@/app/context'
import { getSlug } from '@/lib/products'
import { ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useAppContext()
  const slug = getSlug(product.name)

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
      <Link
        href={`/product/${slug}`}
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
      </Link>

      {/* Nội dung */}
      <div className="p-4">
        <Link
          href={`/product/${slug}`}
          className="block w-full text-left font-sans font-bold text-base mb-2 leading-snug line-clamp-1 hover:underline"
          style={{ color: '#1a0a00' }}
        >
          {product.name}
        </Link>

        {/* Đánh giá */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} style={{ color: i < Math.floor(product.rating) ? '#c8922a' : '#d1c0a8' }} />
          ))}
          <span className="font-sans text-xs ml-1" style={{ color: '#8a6a40' }}>
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-sans font-bold text-sm" style={{ color: '#c8922a' }}>
            {product.price.toLocaleString('vi-VN')} ₫
          </span>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#8b1a1a', color: '#ffffff' }}
            aria-label="Thêm vào giỏ"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
