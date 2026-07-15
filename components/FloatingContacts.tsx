'use client'

import { Phone } from 'lucide-react'

const ZALO_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg'
const MESSENGER_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg'

interface PillButtonProps {
  href: string
  label: string
  backgroundColor: string
  rippleColor: string
  external?: boolean
  children: React.ReactNode
}

function PillButton({
  href,
  label,
  backgroundColor,
  rippleColor,
  external,
  children,
}: PillButtonProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group relative inline-flex"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full animate-float-ripple"
        style={{ backgroundColor: rippleColor }}
      />
      <span
        className="relative inline-flex items-center gap-2 rounded-full border-2 border-white px-4 py-2 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5"
        style={{ backgroundColor }}
      >
        {children}
      </span>
    </a>
  )
}

export function FloatingContacts() {
  return (
    <>
      {/* Hotline - Bottom Left */}
      <div className="fixed z-50 bottom-6 left-4 sm:left-6">
        <PillButton
          href="tel:0938013789"
          label="Gọi hotline 0938 013 789"
          backgroundColor="#10b981"
          rippleColor="rgba(16,185,129,0.45)"
        >
          <Phone
            className="w-6 h-6 text-white animate-float-shake"
            strokeWidth={2.5}
          />
          <span className="text-sm font-bold text-white whitespace-nowrap">
            0938 013 789
          </span>
        </PillButton>
      </div>

      {/* Zalo + Messenger - Bottom Right */}
      <div className="fixed z-50 bottom-6 right-4 sm:right-6 flex flex-col items-end gap-4">
        <PillButton
          href="https://zalo.me/0938013789"
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
          <span className="text-sm font-bold text-white whitespace-nowrap">
            Chat Zalo
          </span>
        </PillButton>

        <PillButton
          href="https://www.facebook.com/share/1BLqoquDQi/?mibextid=wwXIfr"
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
          <span className="text-sm font-bold text-white whitespace-nowrap">
            Messenger
          </span>
        </PillButton>
      </div>
    </>
  )
}
