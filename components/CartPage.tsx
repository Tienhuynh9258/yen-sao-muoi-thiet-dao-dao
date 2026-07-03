'use client'

import { useAppContext } from '@/app/context'
import { formatPrice } from '@/lib/products'
import { ArrowLeft, Minus, Plus, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export function CartPage() {
  const { cartItems, updateCartQuantity, removeFromCart, setCurrentPage, clearCart } = useAppContext()
  const [showCheckout, setShowCheckout] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'bank-transfer',
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 5000000 ? 0 : 500000
  const total = subtotal + shipping

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutSuccess(true)
    clearCart()
    setTimeout(() => {
      setShowCheckout(false)
      setCheckoutSuccess(false)
      setCurrentPage('home')
    }, 4000)
  }

  // Màn hình thành công
  if (checkoutSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#fdf8f3' }}>
        <div className="rounded-2xl shadow-xl p-12 max-w-md w-full text-center border" style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#fdf3e3' }}
          >
            <svg className="w-8 h-8" style={{ color: '#c8922a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-sans text-2xl font-bold mb-2" style={{ color: '#1a0a00' }}>Đặt Hàng Thành Công!</h2>
          <p className="font-sans text-sm mb-5" style={{ color: '#8a6a40' }}>
            Cảm ơn bạn đã tin tưởng. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
          </p>
          <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#fdf3e3' }}>
            <p className="font-sans text-sm" style={{ color: '#1a0a00' }}>
              Tổng thanh toán: <span className="font-bold" style={{ color: '#c8922a' }}>{formatPrice(total)}</span>
            </p>
          </div>
          <a
            href="https://zalo.me/0123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans font-bold py-2.5 px-6 rounded-lg text-white"
            style={{ backgroundColor: '#0068ff' }}
          >
            Theo Dõi Trên Zalo
          </a>
        </div>
      </main>
    )
  }

  // Giỏ hàng trống
  if (cartItems.length === 0 && !showCheckout) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#fdf8f3' }}>
        <div className="text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#fdf3e3' }}>
            <svg className="w-12 h-12" style={{ color: '#c8922a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="font-sans text-3xl font-bold mb-2" style={{ color: '#1a0a00' }}>Giỏ hàng trống</h2>
          <p className="font-sans text-sm mb-8 max-w-xs mx-auto" style={{ color: '#8a6a40' }}>
            Hãy khám phá bộ sưu tập yến sào cao cấp và thêm vào giỏ hàng
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-2 font-sans font-bold py-3 px-8 rounded-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#c8922a' }}
          >
            <ArrowLeft className="w-5 h-5" />
            Tiếp Tục Mua Sắm
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ backgroundColor: '#fdf8f3' }} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setCurrentPage('shop')}
          className="flex items-center gap-2 font-sans font-semibold mb-6 transition-colors hover:underline"
          style={{ color: '#c8922a' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Tiếp Tục Mua Sắm
        </button>

        <h1 className="font-sans text-3xl font-bold mb-8" style={{ color: '#1a0a00' }}>Giỏ Hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Danh sách sản phẩm */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-5 rounded-xl border"
                style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0" style={{ backgroundColor: '#fdf3e3' }}>
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-bold mb-1 truncate" style={{ color: '#1a0a00' }}>
                    {item.product.name}
                  </h3>
                  <p className="font-sans text-xs mb-3" style={{ color: '#8a6a40' }}>
                    {item.product.category}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center rounded-lg border" style={{ borderColor: '#e8d5b0' }}>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1.5 font-bold transition-colors hover:bg-gray-50"
                        style={{ color: '#1a0a00' }}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 py-1.5 font-sans font-semibold text-sm border-x" style={{ borderColor: '#e8d5b0', color: '#1a0a00' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1.5 font-bold transition-colors hover:bg-gray-50"
                        style={{ color: '#1a0a00' }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-sans font-bold" style={{ color: '#c8922a' }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
                        style={{ color: '#8b1a1a' }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tóm tắt đơn hàng */}
          <div>
            <div className="rounded-xl border p-6 sticky top-24" style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}>
              <h3 className="font-sans font-bold text-lg mb-5" style={{ color: '#1a0a00' }}>Tóm Tắt Đơn Hàng</h3>

              <div className="space-y-3 mb-5 pb-5 border-b" style={{ borderColor: '#e8d5b0' }}>
                <div className="flex justify-between">
                  <span className="font-sans text-sm" style={{ color: '#8a6a40' }}>Tạm tính</span>
                  <span className="font-sans font-semibold text-sm" style={{ color: '#1a0a00' }}>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-sm" style={{ color: '#8a6a40' }}>Vận chuyển</span>
                  <span className="font-sans font-semibold text-sm" style={{ color: shipping === 0 ? '#2eb82e' : '#1a0a00' }}>
                    {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-5">
                <span className="font-sans font-bold" style={{ color: '#1a0a00' }}>Tổng cộng</span>
                <span className="font-sans font-bold text-xl" style={{ color: '#c8922a' }}>
                  {formatPrice(total)}
                </span>
              </div>

              {subtotal < 5000000 && (
                <p className="font-sans text-xs rounded-lg p-3 mb-4" style={{ backgroundColor: '#fdf3e3', color: '#8a6a40' }}>
                  Mua thêm <strong style={{ color: '#c8922a' }}>{formatPrice(5000000 - subtotal)}</strong> để được miễn phí vận chuyển
                </p>
              )}

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full font-sans font-bold py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#8b1a1a' }}
              >
                Tiến Hành Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Thanh Toán */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#ffffff' }}>
            <div className="sticky top-0 border-b p-5 flex items-center justify-between" style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}>
              <h2 className="font-sans text-xl font-bold" style={{ color: '#1a0a00' }}>Thông Tin Đặt Hàng</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="p-2 rounded-lg transition-colors hover:bg-gray-100"
              >
                <X className="w-5 h-5" style={{ color: '#1a0a00' }} />
              </button>
            </div>

            <form onSubmit={handleCheckout} className="p-6 space-y-4">
              {[
                { key: 'fullName', label: 'Họ và Tên', type: 'text' },
                { key: 'phone', label: 'Số Điện Thoại', type: 'tel' },
                { key: 'address', label: 'Địa Chỉ', type: 'text' },
                { key: 'city', label: 'Thành Phố / Tỉnh', type: 'text' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="font-sans text-sm font-semibold block mb-1.5" style={{ color: '#1a0a00' }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    required
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm focus:outline-none"
                    style={{ borderColor: '#e8d5b0', color: '#1a0a00', backgroundColor: '#fdf8f3' }}
                  />
                </div>
              ))}

              <div>
                <label className="font-sans text-sm font-semibold block mb-1.5" style={{ color: '#1a0a00' }}>
                  Phương Thức Thanh Toán
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm focus:outline-none"
                  style={{ borderColor: '#e8d5b0', color: '#1a0a00', backgroundColor: '#fdf8f3' }}
                >
                  <option value="bank-transfer">Chuyển Khoản Ngân Hàng</option>
                  <option value="cash-on-delivery">Thanh Toán Khi Nhận Hàng</option>
                  <option value="zalo-pay">ZaloPay</option>
                </select>
              </div>

              <div className="rounded-xl p-4" style={{ backgroundColor: '#fdf3e3' }}>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-sm font-semibold" style={{ color: '#1a0a00' }}>Tổng thanh toán</span>
                  <span className="font-sans font-bold text-xl" style={{ color: '#c8922a' }}>{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-sans font-bold py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#8b1a1a' }}
              >
                Xác Nhận Đặt Hàng
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
