'use client'

import { useAppContext } from '@/app/context'
import { products } from '@/lib/products'
import { ArrowRight, Award, Leaf, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { ProductCard } from './ProductCard'

export function HomePage() {
  const { ref: valueRef, isVisible: valueVisible } = useIntersectionObserver()
  const { ref: productsRef, isVisible: productsVisible } = useIntersectionObserver()
  const { ref: categoryRef, isVisible: categoryVisible } = useIntersectionObserver()

  const featuredProducts = products.slice(0, 4)

  return (
    <main style={{ backgroundColor: '#fdf8f3' }}>
      {/* Hero Section */}
      <section className="relative h-[580px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.jpg"
            alt="Yến Sào Mười Thiết Đào Đào"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(26,10,0,0.72) 0%, rgba(26,10,0,0.35) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Đã sửa lại toàn bộ cú pháp JSX chuẩn ở đây */}
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'rgb(200, 146, 42)' }}>
              Thương Hiệu Yến Sào Uy Tín
            </p>
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
              Yến Sào Mười Thiết<br /><span style={{ color: 'rgb(240, 192, 96)' }}>Đào Đào</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-white/85 mb-8 leading-relaxed max-w-xl">
              Sản phẩm yến sào cao cấp 100% nguyên chất, thu hoạch tự nhiên — bổ dưỡng cho cả gia đình.
            </p>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 font-bold py-3 px-8 rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: 'rgb(200, 146, 42)', color: 'rgb(255, 255, 255)' }}
            >
              Xem Sản Phẩm
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-5 h-5" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section
        ref={valueRef}
        className="py-14 px-4 sm:px-6 lg:px-8 bg-white"
        style={{
          animation: valueVisible ? 'fadeInUp 0.6s ease-out' : 'none',
          opacity: valueVisible ? 1 : 0
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Chất Lượng Cao Cấp',
                description: 'Lựa chọn loại A & AAA, sản phẩm yến sào 100% nguyên chất, không phụ gia.',
              },
              {
                icon: Leaf,
                title: 'Thu Hoạch Tự Nhiên',
                description: 'Phương pháp thu hoạch truyền thống bảo tồn giá trị dinh dưỡng tự nhiên.',
              },
              {
                icon: Sparkles,
                title: 'Uy Tín Thương Hiệu',
                description: 'Hàng nghìn khách hàng tin dùng, cam kết hoàn tiền nếu không hài lòng.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center px-4">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ backgroundColor: '#fdf3e3' }}
                >
                  <item.icon className="w-8 h-8" style={{ color: '#c8922a' }} />
                </div>
                <h3 className="font-sans font-bold text-lg mb-2" style={{ color: '#1a0a00' }}>
                  {item.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#8a6a40' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        ref={productsRef}
        className="py-14 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundColor: '#fdf8f3',
          animation: productsVisible ? 'fadeInUp 0.6s ease-out' : 'none',
          opacity: productsVisible ? 1 : 0
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#c8922a' }}>
              Bán Chạy Nhất
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1a0a00' }}>
              Sản Phẩm Nổi Bật
            </h2>
            <div className="w-16 h-1 mx-auto rounded" style={{ backgroundColor: '#c8922a' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="w-full flex justify-center mt-10">
            <Link
              href="/product"
              className="inline-flex items-center gap-2 border-2 font-sans font-bold py-3 px-8 rounded-lg transition-all hover:text-white"
              style={{ borderColor: '#8b1a1a', color: '#8b1a1a' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8b1a1a'
                e.currentTarget.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#8b1a1a'
              }}
            >
              Xem Tất Cả Sản Phẩm
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Danh mục */}
      <section
        ref={categoryRef}
        className="py-14 px-4 sm:px-6 lg:px-8 bg-white"
        style={{
          animation: categoryVisible ? 'fadeInUp 0.6s ease-out' : 'none',
          opacity: categoryVisible ? 1 : 0
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#c8922a' }}>
              Danh Mục
            </p>
            <h2 className="font-sans text-3xl font-bold" style={{ color: '#1a0a00' }}>
              Mua Sắm Theo Loại
            </h2>
            <div className="w-16 h-1 mx-auto rounded mt-3" style={{ backgroundColor: '#c8922a' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Yến Tiêu Chuẩn', bg: '#fdf3e3', border: '#e8d5b0', desc: 'Chất lượng tốt, phù hợp mọi gia đình' },
              { name: 'Yến Cao Cấp', bg: '#fff8ee', border: '#c8922a', desc: 'Loại A+ chọn lọc kỹ lưỡng' },
              { name: 'Yến Sang Trọng', bg: '#fff0f0', border: '#8b1a1a', desc: 'Tinh hoa tuyệt đỉnh — hảo hạng nhất' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href="/product"
                className="rounded-xl p-8 text-center transition-all hover:shadow-lg border-2 block"
                style={{ backgroundColor: cat.bg, borderColor: cat.border }}
              >
                <h3 className="font-sans font-bold text-xl mb-2" style={{ color: '#1a0a00' }}>
                  {cat.name}
                </h3>
                <p className="font-sans text-sm" style={{ color: '#8a6a40' }}>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner liên hệ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#8b1a1a' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-sans text-3xl font-bold mb-3 text-white">
            Đặt Hàng Ngay Hôm Nay
          </h2>
          <p className="font-sans text-white/80 mb-8">
            Liên hệ qua Zalo hoặc điện thoại để được tư vấn miễn phí và nhận ưu đãi đặc biệt.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:0938013789"
              className="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: '#c8922a', color: '#ffffff' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              Gọi Ngay: 0938.013.789
            </a>
            <a
              href="https://zalo.me/0938013789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: '#0068ff', color: '#ffffff' }}
            >
              Nhắn Tin Zalo
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
