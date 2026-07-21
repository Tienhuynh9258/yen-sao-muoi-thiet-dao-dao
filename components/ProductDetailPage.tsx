'use client'

import type { Product } from '@/app/context'
import { useAppContext } from '@/app/context'
import { formatPrice, getSlug } from '@/lib/products'
import { ArrowLeft, CircleCheck as CheckCircle, ShoppingCart, Star, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft as GalleryLeft, ChevronRight as GalleryRight } from 'lucide-react'

interface ProductDetailPageProps {
  product: Product
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const { addToCart } = useAppContext()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description')
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const touchWrapRef = useRef<HTMLDivElement>(null)

  const imageList = product.images?.length ?? 0
    ? product.images!
    : [product.image].filter(Boolean)

  const goNext = () => setSelectedImage((p) => (p + 1) % imageList.length)
  const goPrev = () => setSelectedImage((p) => (p - 1 + imageList.length) % imageList.length)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isZoomed) return
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape') setIsZoomed(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isZoomed, imageList.length])

  // Reset selected image when navigating between products
  useEffect(() => {
    setSelectedImage(0)
  }, [product.id])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX == null || imageList.length <= 1) return
    const diff = touchStartX - e.touches[0].clientX
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext()
      else goPrev()
      setTouchStartX(null)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    router.push('/cart')
  }

  return (
    <main style={{ backgroundColor: '#fdf8f3' }} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-12">
        {/* Nút quay lại */}
        <Link
          href="/product"
          className="inline-flex items-center gap-2 font-sans font-semibold mb-8 transition-colors hover:underline"
          style={{ color: '#c8922a' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Quay Lại Cửa Hàng
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Hình ảnh gallery */}
          <div ref={touchWrapRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
            <div
              className="relative w-full aspect-square rounded-2xl overflow-hidden"
              style={{ backgroundColor: '#fdf3e3', cursor: imageList.length > 1 ? 'pointer' : 'default' }}
              onClick={() => setIsZoomed(true)}
            >
              {imageList.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev() }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white p-2 shadow transition"
                >
                  <GalleryLeft className="w-5 h-5" style={{ color: '#1a0a00' }} />
                </button>
              )}
              <Image
                src={imageList[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {imageList.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext() }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white p-2 shadow transition"
                >
                  <GalleryRight className="w-5 h-5" style={{ color: '#1a0a00' }} />
                </button>
              )}
              <div
                className="absolute top-4 left-4 px-4 py-1.5 rounded-full font-sans font-bold text-sm text-white"
                style={{ backgroundColor: '#c8922a' }}
              >
                {product.category}
              </div>
              {imageList.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {imageList.map((_, i) => (
                    <span
                      key={i}
                      className="block rounded-full transition-all"
                      style={{
                        width: i === selectedImage ? '20px' : '8px',
                        height: '8px',
                        backgroundColor: i === selectedImage ? '#c8922a' : 'rgba(255,255,255,0.7)',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {imageList.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {imageList.map((url, i) => (
                  <button
                    key={`${url}-${i}`}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className="relative flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all hover:brightness-95"
                    style={{
                      width: '72px',
                      height: '72px',
                      borderColor: i === selectedImage ? '#c8922a' : '#e8d5b0',
                      opacity: i === selectedImage ? 1 : 0.7,
                    }}
                  >
                    <Image src={url} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Zoom modal */}
            {isZoomed && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
                onClick={() => setIsZoomed(false)}
              >
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev() }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white p-2.5 shadow transition"
                >
                  <GalleryLeft className="w-6 h-6" style={{ color: '#1a0a00' }} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext() }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white p-2.5 shadow transition"
                >
                  <GalleryRight className="w-6 h-6" style={{ color: '#1a0a00' }} />
                </button>
                <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
                  <Image
                    src={imageList[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white p-2 shadow transition"
                >
                  <X className="w-6 h-6" style={{ color: '#1a0a00' }} />
                </button>
                {imageList.length > 1 && (
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {imageList.map((_, i) => (
                      <span
                        key={i}
                        className="block rounded-full transition-all"
                        style={{
                          width: i === selectedImage ? '24px' : '8px',
                          height: '8px',
                          backgroundColor: i === selectedImage ? '#c8922a' : 'rgba(255,255,255,0.5)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Thông tin sản phẩm */}
          <div>
            <h1 className="font-sans text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1a0a00' }}>
              {product.name}
            </h1>

            {/* Đánh giá */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    style={{
                      fill: i < Math.floor(product.rating) ? '#c8922a' : 'transparent',
                      color: i < Math.floor(product.rating) ? '#c8922a' : '#d1c0a8',
                    }}
                  />
                ))}
              </div>
              <span className="font-sans text-sm" style={{ color: '#8a6a40' }}>
                {product.rating} — {product.reviews} đánh giá
              </span>
            </div>

            {/* Giá */}
            <div className="mb-6 pb-6 border-b" style={{ borderColor: '#e8d5b0' }}>
              <p className="font-sans text-4xl font-bold" style={{ color: '#c8922a' }}>
                {formatPrice(product.price)}
              </p>
              <p className="font-sans text-sm mt-2" style={{ color: '#8a6a40' }}>
                Miễn phí vận chuyển cho đơn hàng trên 5.000.000 ₫
              </p>
            </div>

            {/* Mô tả ngắn */}
            <p className="font-sans leading-relaxed mb-6" style={{ color: '#1a0a00' }}>
              {product.description}
            </p>

            {/* Số lượng & Thêm giỏ */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center rounded-lg border" style={{ borderColor: '#e8d5b0' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 font-bold text-lg transition-colors hover:bg-gray-50"
                  style={{ color: '#1a0a00' }}
                >
                  −
                </button>
                <span className="px-5 py-3 font-sans font-semibold border-x" style={{ borderColor: '#e8d5b0', color: '#1a0a00' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 font-bold text-lg transition-colors hover:bg-gray-50"
                  style={{ color: '#1a0a00' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-sans font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#8b1a1a' }}
              >
                <ShoppingCart className="w-5 h-5" />
                Thêm Vào Giỏ
              </button>
            </div>

            {/* Đặc điểm */}
            <div className="space-y-3 p-4 rounded-xl" style={{ backgroundColor: '#fdf3e3' }}>
              {[
                { icon: CheckCircle, text: 'Sản phẩm 100% chính hãng, có nguồn gốc rõ ràng' },
                { icon: Zap, text: 'Giao hàng nhanh toàn quốc, đóng gói cẩn thận' },
                { icon: CheckCircle, text: 'Cam kết hoàn tiền nếu không hài lòng' },
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <feat.icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                  <span className="font-sans text-sm" style={{ color: '#1a0a00' }}>{feat.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14 border-t pt-10" style={{ borderColor: '#e8d5b0' }}>
          <div className="flex gap-6 mb-8 border-b" style={{ borderColor: '#e8d5b0' }}>
            {[
              { key: 'description', label: 'Mô Tả Sản Phẩm' },
              { key: 'specs', label: 'Thông Số Kỹ Thuật' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'description' | 'specs')}
                className="font-sans font-bold pb-4 text-base transition-colors border-b-2"
                style={
                  activeTab === tab.key
                    ? { color: '#c8922a', borderColor: '#c8922a' }
                    : { color: '#8a6a40', borderColor: 'transparent' }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="max-w-3xl space-y-4">
              <p className="font-sans leading-relaxed" style={{ color: '#1a0a00' }}>
                {product.description}
              </p>
              <p className="font-sans leading-relaxed" style={{ color: '#1a0a00' }}>
                Mỗi sản phẩm được lựa chọn cẩn thận và xử lý để duy trì các tiêu chuẩn cao nhất về độ tinh khiết. Yến sào của chúng tôi không chứa chất bảo quản, không pha trộn — hoàn toàn tự nhiên từ tổ yến thật sự.
              </p>
            </div>
          )}

          {activeTab === 'specs' && product.specs && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {product.specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-3 py-3 border-b" style={{ borderColor: '#e8d5b0' }}>
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#c8922a' }} />
                  <span className="font-sans text-sm" style={{ color: '#1a0a00' }}>{spec}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gợi ý xem thêm */}
        <div className="mt-14 rounded-2xl p-8 text-center border" style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}>
          <h3 className="font-sans text-2xl font-bold mb-3" style={{ color: '#1a0a00' }}>
            Khám Phá Thêm Sản Phẩm
          </h3>
          <p className="font-sans text-sm mb-6" style={{ color: '#8a6a40' }}>
            Còn nhiều lựa chọn yến sào cao cấp đang chờ bạn
          </p>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 font-sans font-bold py-3 px-8 rounded-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#c8922a' }}
          >
            Xem Tất Cả Sản Phẩm
          </Link>
        </div>
      </div>
    </main>
  )
}
