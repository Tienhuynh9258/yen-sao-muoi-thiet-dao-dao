'use client'

import type { Product } from '@/app/context'
import { useAppContext } from '@/app/context'
import { formatPrice } from '@/lib/products'
import { Heart, ShoppingCart, Star } from 'lucide-react'
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
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Container */}
      <button
        onClick={handleProductClick}
        className="relative w-full aspect-square overflow-hidden bg-hover group cursor-pointer"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-primary text-card px-3 py-1 rounded-full text-xs font-bold">
          {product.category}
        </div>
      </button>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <button
          onClick={handleProductClick}
          className="text-left font-serif font-bold text-foreground mb-2 hover:text-primary transition-colors line-clamp-1"
        >
          {product.name}
        </button>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-border'}`}
              />
            ))}
          </div>
          <span className="font-sans text-xs text-muted ml-1">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="font-serif font-bold text-primary text-lg">{formatPrice(product.price)}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-accent hover:bg-accent/90 text-card font-sans font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
          <button className="flex-1 border border-border hover:bg-hover text-foreground font-sans font-semibold py-2 rounded-lg transition-colors flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
