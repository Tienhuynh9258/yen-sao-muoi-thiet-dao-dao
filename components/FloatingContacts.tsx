'use client'

import Image from 'next/image'

const shakeStyle = `
  @keyframes shake {
    0%, 100% { transform: rotate(0deg) translateY(0); }
    10%, 30%, 50%, 70%, 90% { transform: rotate(-3deg) translateY(-5px); }
    20%, 40%, 60%, 80% { transform: rotate(3deg) translateY(5px); }
  }
  .shake-animation {
    animation: shake 0.5s infinite;
  }
`

export function FloatingContacts() {
  return (
    <>
      <style>{shakeStyle}</style>
      
      {/* Phone Button - Fixed Left Bottom */}
      <a
        href="tel:0362658888"
        className="fixed bottom-6 left-4 z-40 group shake-animation"
        title="Gọi điện"
      >
        <div className="relative inline-flex items-center gap-2 text-white rounded-full shadow-lg px-4 py-3 transition-all duration-300 hover:shadow-2xl hover:scale-105"
          style={{ backgroundColor: '#25d366' }}>
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          <span className="font-semibold text-sm">0362 658 888</span>
        </div>
      </a>

      {/* Messenger Button - Right Bottom */}
      <a
        href="https://m.me/yensaosaigon"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 z-40 group shake-animation"
        title="Messenger"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="relative inline-flex items-center justify-center w-14 h-14 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-110"
          style={{ backgroundColor: '#0084ff' }}>
          <Image
            src="/messenger-icon.png"
            alt="Messenger"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <div className="absolute left-full ml-2 px-3 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Messenger
          </div>
        </div>
      </a>

      {/* Zalo Button - Right Bottom (above Messenger) */}
      <a
        href="https://zalo.me"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-40 group shake-animation"
        title="Zalo"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="relative inline-flex items-center justify-center w-14 h-14 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-110"
          style={{ backgroundColor: '#0068ff' }}>
          <Image
            src="/zalo-icon.png"
            alt="Zalo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <div className="absolute left-full ml-2 px-3 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Zalo
          </div>
        </div>
      </a>
    </>
  )
}
