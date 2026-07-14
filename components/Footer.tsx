'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

const ZALO_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg'
const FB_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg'

export function Footer() {
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
              <li>
                <Link href="/" className="font-sans text-sm transition-colors hover:underline" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/product" className="font-sans text-sm transition-colors hover:underline" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Cửa Hàng
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-sans text-sm transition-colors hover:underline" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-sans text-sm transition-colors hover:underline" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Liên Hệ
                </Link>
              </li>
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
            <div className="space-y-3 mb-4">
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
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1BLqoquDQi/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src={FB_ICON_URL} alt="Facebook" className="w-5 h-5 object-contain" />
              </a>
              <a href="https://zalo.me/0938013789" target="_blank" rel="noopener noreferrer" aria-label="Zalo">
                <img src={ZALO_ICON_URL} alt="Zalo" className="w-5 h-5 object-contain" />
              </a>
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
