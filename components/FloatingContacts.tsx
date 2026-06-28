'use client'

import { Mail, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'

export function FloatingContacts() {
  const [isOpen, setIsOpen] = useState(false)

  const contacts = [
    {
      icon: MessageCircle,
      label: 'Zalo',
      color: 'hover:bg-blue-500',
      href: 'https://zalo.me',
    },
    {
      icon: Phone,
      label: 'Call',
      color: 'hover:bg-green-500',
      href: 'tel:+84123456789',
    },
    {
      icon: Mail,
      label: 'Email',
      color: 'hover:bg-red-500',
      href: 'mailto:info@yensao.com',
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {isOpen && (
        <div className="flex flex-col gap-3 mb-2">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 bg-card p-3 rounded-full shadow-lg ${contact.color} transition-all hover:shadow-xl group`}
            >
              <contact.icon className="w-5 h-5 text-white group-hover:text-white transition-colors" />
              <span className="font-sans font-semibold text-sm text-foreground whitespace-nowrap pr-2">
                {contact.label}
              </span>
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-card shadow-lg flex items-center justify-center transition-all hover:scale-110 font-bold text-xl"
      >
        {isOpen ? '×' : '+'}
      </button>
    </div>
  )
}
