'use client'

import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function ContactPage() {
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
        {/* Header */}
        <div className="mb-16">
          <h1 style={{ fontFamily: 'var(--font-sans)', color: '#8b1a1a' }} className="text-5xl md:text-6xl font-bold mb-6">
            Liên Hệ
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', color: '#4a3728' }} className="text-xl leading-relaxed max-w-3xl">
            Sản xuất và phân phối: Yến Sào Thiên Nhiên Mười Thiết - Đào Đào
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-sans)' ,  color: '#1a0a00' }} className="text-3xl font-bold mb-8" >
              Thông Tin Liên Hệ
            </h2>

            {/* Headquarters */}
            <div style={{ backgroundColor: '#ffffff' ,  borderColor: '#e8d5b0' }} className="rounded-lg p-6 mb-6 border" >
              <h3 style={{ fontFamily: 'var(--font-sans)' ,  color: '#8b1a1a' }} className="font-bold text-lg mb-4" >
                Trụ Sở Chính
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#c8922a' }} />
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)' }} className="font-semibold mb-1">
                      Gò Công, Đồng Tháp, Việt Nam
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', color: '#4a3728' }} className="text-sm">
                      142 Trần Công Tường, Phường Gò Công, Đồng Tháp, Việt Nam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotlines */}
            <div style={{ backgroundColor: '#ffffff' ,  borderColor: '#e8d5b0' }} className="rounded-lg p-6 mb-6 border" >
              <h3 style={{ fontFamily: 'var(--font-sans)' ,  color: '#8b1a1a' }} className="font-bold text-lg mb-4" >
                Hotline
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:0938013789"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Phone className="w-5 h-5" style={{ color: '#c8922a' }} />
                  <span style={{ fontFamily: 'var(--font-sans)' }} className="text-lg font-semibold">
                    093 801 3789
                  </span>
                </a>
                <a
                  href="tel:0918035869"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Phone className="w-5 h-5" style={{ color: '#c8922a' }} />
                  <span style={{ fontFamily: 'var(--font-sans)' }} className="text-lg font-semibold">
                    091 803 5869
                  </span>
                </a>
              </div>
            </div>

            {/* Emails */}
            <div style={{ backgroundColor: '#ffffff' ,  borderColor: '#e8d5b0' }} className="rounded-lg p-6 mb-6 border" >
              <h3 style={{ fontFamily: 'var(--font-sans)' ,  color: '#8b1a1a' }} className="font-bold text-lg mb-4" >
                Email
              </h3>
              <div className="space-y-2">
                <a
                  href="mailto:yensaomuoithiet.daodao@gmail.com"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Mail className="w-5 h-5" style={{ color: '#c8922a' }} />
                  <span style={{ fontFamily: 'var(--font-sans)' }} className="text-sm">
                    yensaomuoithiet.daodao@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-sans)' ,  color: '#1a0a00' }} className="text-3xl font-bold mb-8" >
              Gửi Thông Tin Liên Lạc
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}
              className="rounded-lg p-8 border">
              <div className="mb-6">
                <label style={{ fontFamily: 'var(--font-sans)' }} className="block font-semibold mb-2">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ borderColor: '#e8d5b0', fontFamily: 'var(--font-sans)' }}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
                  placeholder="Nhập tên của bạn"
                />
              </div>

              <div className="mb-6">
                <label style={{ fontFamily: 'var(--font-sans)' }} className="block font-semibold mb-2">
                  Số Điện Thoại
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ borderColor: '#e8d5b0', fontFamily: 'var(--font-sans)' }}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="mb-6">
                <label style={{ fontFamily: 'var(--font-sans)' }} className="block font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ borderColor: '#e8d5b0', fontFamily: 'var(--font-sans)' }}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
                  placeholder="Nhập email của bạn"
                />
              </div>

              <div className="mb-6">
                <label style={{ fontFamily: 'var(--font-sans)' }} className="block font-semibold mb-2">
                  Tin Nhắn
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ borderColor: '#e8d5b0', fontFamily: 'var(--font-sans)' }}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 min-h-[150px]"
                  placeholder="Nhập nội dung tin nhắn"
                />
              </div>

              <button
                type="submit"
                className="w-full font-sans font-bold py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#8b1a1a' }}
              >
                Gửi Tin Nhắn
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-16">
          <h2 style={{ fontFamily: 'var(--font-sans)', color: '#1a0a00' }} className="text-3xl font-bold mb-8">
            Bản Đồ
          </h2>
          <div className="w-full h-96 rounded-xl overflow-hidden border" style={{ borderColor: '#e8d5b0' }}>
            <iframe
              title="Yến Sào Mười Thiết Đào Đào"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.017373223776!2d106.66679465853627!3d10.400019865235958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31eb5c5f5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2sG%C3%B2%20C%C3%B4ng%2C%20Ti%E1%BB%81n%20Giang%2C%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1600000000000!5m2!1svi!2s"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ backgroundColor: '#1a0a00' }} className="rounded-3xl p-10 text-center">
          <h2 style={{ fontFamily: 'var(--font-sans)', color: '#c8922a' }} className="text-3xl font-bold mb-4">
            Đặt Hàng Trực Tiếp
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: '#fdf3e3' }} className="mb-8 max-w-2xl mx-auto">
            Liên hệ ngay để được tư vấn miễn phí về sản phẩm yến sào phù hợp với nhu cầu của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0938013789"
              className="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: '#c8922a', color: '#ffffff' }}
            >
              <Phone className="w-5 h-5" />
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
      </div>
    </main>
  )
}
