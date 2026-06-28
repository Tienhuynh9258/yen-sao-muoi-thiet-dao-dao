'use client'

import { useAppContext } from '@/app/context'
import { formatPrice } from '@/lib/products'
import { ArrowLeft, CheckCircle, Heart, ShoppingCart, Star, Zap } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export function ProductDetailPage() {
  const { selectedProduct, setCurrentPage, addToCart } = useAppContext()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description')

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-serif text-2xl text-foreground">Product not found</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct)
    }
  }

  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('shop')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-sans font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square bg-hover rounded-lg overflow-hidden">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-accent text-card px-4 py-2 rounded-full font-sans font-bold text-sm">
                {selectedProduct.category}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
              {selectedProduct.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(selectedProduct.rating)
                        ? 'fill-primary text-primary'
                        : 'text-border'
                    }`}
                  />
                ))}
              </div>
              <span className="font-sans text-sm text-muted">
                {selectedProduct.rating} • {selectedProduct.reviews} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-border">
              <p className="font-serif text-5xl font-bold text-primary">
                {formatPrice(selectedProduct.price)}
              </p>
              <p className="font-sans text-sm text-muted mt-2">
                Free shipping on orders over ₫5,000,000
              </p>
            </div>

            {/* Description */}
            <p className="font-sans text-foreground leading-relaxed mb-8">
              {selectedProduct.description}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-hover transition-colors font-sans font-bold"
                >
                  −
                </button>
                <span className="px-6 py-3 font-sans font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-hover transition-colors font-sans font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-accent hover:bg-accent/90 text-card font-sans font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button className="px-6 py-3 border-2 border-primary hover:bg-primary/10 text-primary font-sans font-bold rounded-lg transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                { icon: CheckCircle, text: '100% Authentic Product' },
                { icon: Zap, text: 'Fast and Secure Delivery' },
                { icon: CheckCircle, text: 'Money-back Guarantee' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="font-sans text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 border-t border-border pt-12">
          <div className="flex gap-8 mb-8 border-b border-border">
            {['description', 'specs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'description' | 'specs')}
                className={`font-serif font-bold pb-4 transition-colors ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {tab === 'description' ? 'Description' : 'Specifications'}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none">
              <p className="font-sans text-foreground leading-relaxed">
                {selectedProduct.description}
              </p>
              <p className="font-sans text-foreground leading-relaxed mt-4">
                Experience the pinnacle of luxury with our premium bird&apos;s nest selection. Each product is
                carefully sourced and processed to maintain the highest standards of purity and quality.
              </p>
            </div>
          )}

          {activeTab === 'specs' && selectedProduct.specs && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedProduct.specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b border-border">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-sans text-foreground">{spec}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products Info */}
        <div className="mt-16 bg-card rounded-lg p-8 text-center border border-border">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
            Complete Your Collection
          </h3>
          <p className="font-sans text-muted mb-6">
            Explore other premium selections from our luxury collection
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-card font-sans font-bold py-3 px-8 rounded-lg transition-colors"
          >
            View All Products
          </button>
        </div>
      </div>
    </main>
  )
}
