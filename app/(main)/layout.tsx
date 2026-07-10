import { AppProvider } from '@/app/context'
import { Footer } from '@/components/Footer'
import { FloatingContacts } from '@/components/FloatingContacts'
import { Header } from '@/components/Header'

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
      </div>
    </AppProvider>
  )
}
