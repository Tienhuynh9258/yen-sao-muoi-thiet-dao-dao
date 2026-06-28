'use client'

export function FloatingContacts() {
  return (
    <>
      {/* Phone Button - Fixed Left Bottom */}
      <a
        href="tel:0362658888"
        className="fixed bottom-6 left-4 z-40 group"
        title="Gọi điện"
      >
        <div className="relative inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg px-4 py-3 transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
        className="fixed bottom-6 right-4 z-40 group"
        title="Messenger"
      >
        <div className="relative inline-flex items-center justify-center w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-110">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.205V22l3.372-1.854c.9.25 1.853.383 2.842.383 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2z" />
          </svg>
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
        className="fixed bottom-24 right-4 z-40 group"
        title="Zalo"
      >
        <div className="relative inline-flex items-center justify-center w-14 h-14 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-110">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          <div className="absolute left-full ml-2 px-3 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Zalo
          </div>
        </div>
      </a>
    </>
  )
}
