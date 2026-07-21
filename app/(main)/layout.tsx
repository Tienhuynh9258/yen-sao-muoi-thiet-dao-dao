import { AppProvider } from '@/app/context'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingContacts } from '@/components/FloatingContacts'
import { Toast } from '@/components/Toast'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <FloatingContacts />
        <Toast />
      </div>
    </AppProvider>
  )
}
