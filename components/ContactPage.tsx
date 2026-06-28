'use client'

import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react'
import { useAppContext } from '@/app/context'
import { useState } from 'react'

export function ContactPage() {
  const { setCurrentPage } = useAppContext()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ lại sớm nhất!')
    setFormData({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <main style={{ backgroundColor: '#fdf8f3', color: '#1a0a00' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 transition-colors mb-8"
          style={{ color: '#c8922a' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Quay lại Trang chủ</span>
        </button>

        {/* Header */}
        <div className="mb-16">
          <h1 style={{ fontFamily: "'Merriweather', serif", color: '#8b1a1a' }} className="text-5xl md:text-6xl font-bold mb-6">
            Liên Hệ
          </h1>
          <p style={{ fontFamily: "'Noto Sans', sans-serif", color: '#4a3728' }} className="text-xl leading-relaxed max-w-3xl">
            Công ty TNHH Yến Sào Sài Gòn ra đời với mục đích đem đến những sản phẩm tổ yến cao cấp nguyên chất được khai thác trực tiếp từ các nhà yến của Công ty.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div>
            <h2 style={{ fontFamily: "'Merriweather', serif" }} className="text-3xl font-bold mb-8" style={{ color: '#1a0a00' }}>
              Thông Tin Liên Hệ
            </h2>

            {/* Headquarters */}
            <div style={{ backgroundColor: '#ffffff' }} className="rounded-lg p-6 mb-6 border" style={{ borderColor: '#e8d5b0' }}>
              <h3 style={{ fontFamily: "'Merriweather', serif" }} className="font-bold text-lg mb-4" style={{ color: '#8b1a1a' }}>
                Trụ Sở Chính
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#c8922a' }} />
                  <div>
                    <p style={{ fontFamily: "'Noto Sans', sans-serif" }} className="font-semibold mb-1">
                      Hà Nội
                    </p>
                    <p style={{ fontFamily: "'Noto Sans', sans-serif", color: '#4a3728' }} className="text-sm">
                      426 Đường Láng, Láng Hạ, Đống Đa, Hà Nội
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#c8922a' }} />
                  <div>
                    <p style={{ fontFamily: "'Noto Sans', sans-serif" }} className="font-semibold mb-1">
                      Thành Phố Hồ Chí Minh
                    </p>
                    <p style={{ fontFamily: "'Noto Sans', sans-serif", color: '#4a3728' }} className="text-sm">
                      267 Điện Biên Phủ, P. Võ Thị Sáu, Quận 3, TP. HCM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotlines */}
            <div style={{ backgroundColor: '#ffffff' }} className="rounded-lg p-6 mb-6 border" style={{ borderColor: '#e8d5b0' }}>
              <h3 style={{ fontFamily: "'Merriweather', serif" }} className="font-bold text-lg mb-4" style={{ color: '#8b1a1a' }}>
                Hotline
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:0362658888"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Phone className="w-5 h-5" style={{ color: '#c8922a' }} />
                  <span style={{ fontFamily: "'Noto Sans', sans-serif" }} className="text-lg font-semibold">
                    0362 658 888
                  </span>
                </a>
                <a
                  href="tel:0246258888"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Phone className="w-5 h-5" style={{ color: '#c8922a' }} />
                  <span style={{ fontFamily: "'Noto Sans', sans-serif" }} className="text-lg font-semibold">
                    0246 258 888
                  </span>
                </a>
                <a
                  href="tel:0286258888"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Phone className="w-5 h-5" style={{ color: '#c8922a' }} />
                  <span style={{ fontFamily: "'Noto Sans', sans-serif" }} className="text-lg font-semibold">
                    0286 258 888
                  </span>
                </a>
              </div>
            </div>

            {/* Email */}
            <div style={{ backgroundColor: '#ffffff' }} className="rounded-lg p-6 border" style={{ borderColor: '#e8d5b0' }}>
              <h3 style={{ fontFamily: "'Merriweather', serif" }} className="font-bold text-lg mb-4" style={{ color: '#8b1a1a' }}>
                Email
              </h3>
              <div className="space-y-2">
                <a
                  href="mailto:support@yensaosaigon.com"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Mail className="w-5 h-5" style={{ color: '#c8922a' }} />
                  <span style={{ fontFamily: "'Noto Sans', sans-serif" }} className="text-sm">
                    support@yensaosaigon.com
                  </span>
                </a>
                <a
                  href="mailto:yensaosg8888@gmail.com"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Mail className="w-5 h-5" style={{ color: '#c8922a' }} />
                  <span style={{ fontFamily: "'Noto Sans', sans-serif" }} className="text-sm">
                    yensaosg8888@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 style={{ fontFamily: "'Merriweather', serif" }} className="text-3xl font-bold mb-8" style={{ color: '#1a0a00' }}>
              Gửi Thông Tin Liên Lạc
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{ backgroundColor: '#ffffff' }}
              className="rounded-lg p-8 border"
              style={{ borderColor: '#e8d5b0' }}
            >
              <div className="mb-6">
                <label style={{ fontFamily: "'Noto Sans', sans-serif" }} className="block font-semibold mb-2">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ borderColor: '#e8d5b0', fontFamily: "'Noto Sans', sans-serif" }}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#c8922a' } as any}
                  placeholder="Nhập tên của bạn"
                />
              </div>

              <div className="mb-6">
                <label style={{ fontFamily: "'Noto Sans', sans-serif" }} className="block font-semibold mb-2">
                  Số Điện Thoại
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ borderColor: '#e8d5b0', fontFamily: "'Noto Sans', sans-serif" }}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="mb-6">
                <label style={{ fontFamily: "'Noto Sans', sans-serif" }} className="block font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ borderColor: '#e8d5b0', fontFamily: "'Noto Sans', sans-serif" }}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
                  placeholder="Nhập email của bạn"
                />
              </div>

              <div className="mb-8">
                <label style={{ fontFamily: "'Noto Sans', sans-serif" }} className="block font-semibold mb-2">
                  Nội Dung
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ borderColor: '#e8d5b0', fontFamily: "'Noto Sans', sans-serif" }}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 resize-none"
                  rows={5}
                  placeholder="Nhập nội dung liên hệ"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: '#c8922a' }}
                className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Gửi Liên Hệ
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
