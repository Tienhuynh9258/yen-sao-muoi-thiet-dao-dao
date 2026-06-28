'use client'

import { useAppContext } from '@/app/context'
import { products } from '@/lib/products'
import { ArrowRight, Award, Leaf, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { ProductCard } from './ProductCard'

export function HomePage() {
  const { setCurrentPage } = useAppContext()

  const featuredProducts = products.slice(0, 4)

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background.jfif-JJvUCGQUYc1Tv6QZyanWta9t14njz0.jpeg"
            alt="Hero Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-card mb-6">
              Premium Vietnamese Heritage
            </h1>
            <p className="font-sans text-xl text-card/90 mb-8 leading-relaxed">
              Experience the luxury and authenticity of traditional bird&apos;s nest products, crafted with excellence for discerning connoisseurs.
            </p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-card font-sans font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Explore Collection
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Premium Quality',
                description: 'Grade A & AAA selection, 100% pure bird\'s nest products',
              },
              {
                icon: Leaf,
                title: 'Natural Heritage',
                description: 'Traditional harvesting methods preserving authenticity',
              },
              {
                icon: Sparkles,
                title: 'Luxury Experience',
                description: 'Exclusive products for those who appreciate excellence',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Featured Collection
            </h2>
            <p className="font-sans text-muted max-w-2xl mx-auto">
              Discover our most coveted bird&apos;s nest selections, carefully curated for premium quality
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-2 border-2 border-primary hover:bg-primary hover:text-card text-primary font-serif font-bold py-3 px-8 rounded-lg transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Standard', color: 'bg-border', desc: 'Quality selection' },
              { name: 'Premium', color: 'bg-primary/20', desc: 'Superior grade' },
              { name: 'Luxury', color: 'bg-accent/20', desc: 'Elite collection' },
            ].map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCurrentPage('shop')}
                className={`${cat.color} hover:shadow-lg transition-shadow rounded-lg p-8 text-center`}
              >
                <h3 className="font-serif font-bold text-xl text-foreground mb-2">
                  {cat.name}
                </h3>
                <p className="font-sans text-sm text-muted">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-foreground text-card">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="font-sans text-card/80 mb-8">
            Subscribe to receive exclusive offers and premium product updates
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground font-sans"
            />
            <button className="bg-primary hover:bg-primary/90 text-card font-sans font-bold px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
