'use client'

import { useAppContext } from '@/app/context'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const { setCurrentPage } = useAppContext()

  return (
    <footer style={{ backgroundColor: '#1a0a00', color: '#ffffff' }} className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Thương hiệu */}
          <div>
            <h3 className="font-sans font-bold text-lg mb-4" style={{ color: '#c8922a' }}>
              Yến Sào Mười Thiết Đào Đào
            </h3>
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Sản phẩm yến sào cao cấp của Việt Nam. Di sản xác thực, chất lượng hàng đầu.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h4 className="font-sans font-bold mb-4" style={{ color: '#c8922a' }}>Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              {[
                { label: 'Trang Chủ', page: 'home' },
                { label: 'Cửa Hàng', page: 'shop' },
                { label: 'Giới Thiệu', page: 'about' },
                { label: 'Liên Hệ', page: 'contact' },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => setCurrentPage(link.page as 'home' | 'shop' | 'about' | 'contact')}
                    className="font-sans text-sm transition-colors hover:underline"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Thông tin */}
          <div>
            <h4 className="font-sans font-bold mb-4" style={{ color: '#c8922a' }}>Thông Tin</h4>
            <ul className="space-y-2">
              {[
                'Chính Sách Bảo Mật',
                'Điều Khoản Dịch Vụ',
                'Chính Sách Đổi Trả',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm transition-colors hover:underline" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="font-sans font-bold mb-4" style={{ color: '#c8922a' }}>Liên Hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                <span className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>0938.013.789</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                <span className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>yensaomuoithiet.daodao@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                <span className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>Tỉnh Đồng Tháp, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-sans text-sm text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
            © 2026 Yến Sào Mười Thiết Đào Đào. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  )
}
