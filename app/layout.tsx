import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Yến Sào Mười Thiết Đào Đào',
  description: "Sản phẩm yến sào cao cấp của Việt Nam",
  alternates: {
    canonical: 'https://yensaomuoithietdaodao.com/',
  },
  icons: {
    icon: [
      {
        url: '/logo_transparent.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo_transparent.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/logo_transparent.png',
    shortcut: '/logo_transparent.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#c8922a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" style={{ backgroundColor: '#fdf8f3' }}>
      <meta name="google-site-verification" content="58yA90eR6HwpV9UzMPiKFK5bLNZjC_wbel6ZEf7WfTI" />
      <body style={{ backgroundColor: '#fdf8f3', color: '#1a0a00' }} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
