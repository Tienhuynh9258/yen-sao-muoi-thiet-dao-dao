'use client'

export function FloatingContacts() {
  return (
    <>
      {/* Bên trái - Điện thoại */}
      <a
        href="tel:+84123456789"
        aria-label="Gọi điện ngay"
        className="fixed bottom-8 left-0 z-50 flex items-center gap-0 group"
      >
        <div className="flex items-center bg-[#2eb82e] text-white rounded-r-full shadow-lg pl-3 pr-4 py-2.5 gap-2 hover:pr-6 transition-all duration-300">
          {/* Phone icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-bounce" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
          <span className="font-bold text-sm whitespace-nowrap">0123 456 789</span>
        </div>
      </a>

      {/* Bên phải - Messenger + Zalo riêng lẻ */}
      <div className="fixed bottom-28 right-0 z-50 flex flex-col gap-2">
        {/* Messenger */}
        <a
          href="https://m.me/yensaomuoithiet"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn tin Messenger"
          className="flex items-center justify-end group"
        >
          <div className="flex items-center gap-2 bg-[#0084ff] text-white rounded-l-full shadow-lg pl-3 pr-3 py-2.5 hover:pl-5 transition-all duration-300">
            <span className="font-bold text-sm whitespace-nowrap hidden group-hover:block">Messenger</span>
            {/* Messenger icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.205V22l3.372-1.854c.9.25 1.853.383 2.842.383 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.044 12.44l-2.548-2.717-4.97 2.717 5.467-5.799 2.611 2.717 4.908-2.717-5.468 5.799z"/>
            </svg>
          </div>
        </a>

        {/* Zalo */}
        <a
          href="https://zalo.me/0123456789"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn tin Zalo"
          className="flex items-center justify-end group"
        >
          <div className="flex items-center gap-2 bg-[#0068ff] text-white rounded-l-full shadow-lg pl-3 pr-3 py-2.5 hover:pl-5 transition-all duration-300">
            <span className="font-bold text-sm whitespace-nowrap hidden group-hover:block">Chat Zalo</span>
            {/* Zalo icon */}
            <div className="w-7 h-7 flex-shrink-0 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0068ff] font-extrabold text-xs leading-none">Zalo</span>
            </div>
          </div>
        </a>
      </div>
    </>
  )
}
