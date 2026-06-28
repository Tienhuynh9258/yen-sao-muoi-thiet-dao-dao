'use client'

import { useAppContext } from '@/app/context'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const { setCurrentPage } = useAppContext()

  return (
    <footer className="bg-foreground text-card mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Yến Sào</h3>
            <p className="font-sans text-sm text-card/80 leading-relaxed">
              Sản phẩm yến sào cao cấp của Việt Nam. Di sản xác thực, thủ công sang trọng.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="font-sans text-sm text-card/80 hover:text-primary transition-colors"
                >
                  Trang Chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="font-sans text-sm text-card/80 hover:text-primary transition-colors"
                >
                  Cửa Hàng
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="font-sans text-sm text-card/80 hover:text-primary transition-colors"
                >
                  Về Chúng Tôi
                </button>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-serif font-bold mb-4">Thông Tin</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-sans text-sm text-card/80 hover:text-primary transition-colors">
                  Chính Sách Bảo Mật
                </a>
              </li>
              <li>
                <a href="#" className="font-sans text-sm text-card/80 hover:text-primary transition-colors">
                  Điều Khoản Dịch Vụ
                </a>
              </li>
              <li>
                <a href="#" className="font-sans text-sm text-card/80 hover:text-primary transition-colors">
                  Hoàn Trả & Trao Đổi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold mb-4">Liên Hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="font-sans text-sm text-card/80">+84 123 456 789</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="font-sans text-sm text-card/80">info@yensao.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="font-sans text-sm text-card/80">Ho Chi Minh City, Vietnam</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-card/20 pt-8">
          <p className="font-sans text-sm text-center text-card/60">
            © 2024 Yến Sào Mười Thiết Đào Đào. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
