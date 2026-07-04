'use client'

import { Phone } from 'lucide-react'

const ZALO_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg'
const MESSENGER_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg'

interface FloatingButtonProps {
  href: string
  label: string
  backgroundColor: string
  rippleColor: string
  external?: boolean
  children: React.ReactNode
}

function FloatingButton({
  href,
  label,
  backgroundColor,
  rippleColor,
  external,
  children,
}: FloatingButtonProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className="group relative block"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full animate-float-ripple"
        style={{ backgroundColor: rippleColor }}
      />
      <span
        className="relative flex items-center justify-center w-14 h-14 rounded-full border-2 border-white shadow-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
        style={{ backgroundColor }}
      >
        {children}
      </span>
    </a>
  )
}

export function FloatingContacts() {
  return (
    <div className="fixed z-50 bottom-6 right-4 sm:right-6 flex flex-col items-end gap-4">
      <FloatingButton
        href="https://zalo.me/0123456789"
        label="Chat Zalo"
        backgroundColor="#0068ff"
        rippleColor="rgba(0,104,255,0.45)"
        external
      >
        <img
          src={ZALO_ICON_URL}
          alt="Zalo"
          className="w-8 h-8 object-contain animate-float-shake"
          loading="eager"
        />
      </FloatingButton>

      <FloatingButton
        href="https://m.me/yensaosaigon"
        label="Chat Messenger"
        backgroundColor="#0084ff"
        rippleColor="rgba(0,132,255,0.45)"
        external
      >
        <img
          src={MESSENGER_ICON_URL}
          alt="Messenger"
          className="w-8 h-8 object-contain animate-float-shake"
          loading="eager"
        />
      </FloatingButton>

      <FloatingButton
        href="tel:0362658888"
        label="Gọi hotline 0362 658 888"
        backgroundColor="#10b981"
        rippleColor="rgba(16,185,129,0.45)"
      >
        <Phone
          className="w-6 h-6 text-white animate-float-shake"
          strokeWidth={2.5}
        />
      </FloatingButton>
    </div>
  )
}
