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
              Premium Vietnamese bird&apos;s nest products. Authentic heritage, luxury craftsmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="font-sans text-sm text-card/80 hover:text-primary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="font-sans text-sm text-card/80 hover:text-primary transition-colors"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="font-sans text-sm text-card/80 hover:text-primary transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-serif font-bold mb-4">Information</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-sans text-sm text-card/80 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-sans text-sm text-card/80 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="font-sans text-sm text-card/80 hover:text-primary transition-colors">
                  Returns & Exchange
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold mb-4">Contact</h4>
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
