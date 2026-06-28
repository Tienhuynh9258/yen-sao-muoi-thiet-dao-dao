'use client'

import Image from 'next/image'

export function FloatingContacts() {
  return (
    <>
      {/* Phone Button - Left Bottom */}
      <a
        href="tel:0362658888"
        className="fixed bottom-8 left-6 z-40 group"
        title="Gọi ngay"
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-full text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          style={{ backgroundColor: '#25d366' }}>
          <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          <span className="font-medium text-sm">0362 658 888</span>
        </div>
      </a>

      {/* Messenger Button - Right Bottom */}
      <a
        href="https://m.me/yensaosaigon"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-6 z-40"
        title="Chat Messenger"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          style={{ backgroundColor: '#0084ff' }}>
          <Image
            src="/messenger-icon.png"
            alt="Messenger"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        </div>
      </a>

      {/* Zalo Button - Right Middle */}
      <a
        href="https://zalo.me"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-32 right-6 z-40"
        title="Chat Zalo"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          style={{ backgroundColor: '#0068ff' }}>
          <Image
            src="/zalo-icon.png"
            alt="Zalo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        </div>
      </a>
    </>
  )
}
