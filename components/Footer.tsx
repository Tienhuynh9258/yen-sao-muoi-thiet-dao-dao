'use client'

import { Phone, MapPin, Mail } from 'lucide-react'
import Link from 'next/link'

const ZALO_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg'
const FB_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg'

export function Footer() {
  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Cửa hàng', href: '/product' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
  ] as const

  const socialLinks = [
    {
      icon: FB_ICON_URL,
      href: 'https://www.facebook.com/share/1BLqoquDQi/?mibextid=wwXIfr',
      label: 'Facebook',
    },
    {
      icon: ZALO_ICON_URL,
      href: 'https://zalo.me/0938013789',
      label: 'Zalo',
    },
  ] as const

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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm hover:text-yellow-300 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Theo dõi */}
          <div>
            <h4 className="font-sans font-bold mb-4" style={{ color: '#c8922a' }}>Theo Dõi</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity flex items-center"
                  aria-label={social.label}
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="w-5 h-5 object-contain"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
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
