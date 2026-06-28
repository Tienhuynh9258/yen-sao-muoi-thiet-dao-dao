'use client'

import { AppProvider } from '@/app/context'
import { CartPage } from '@/components/CartPage'
import { Footer } from '@/components/Footer'
import { FloatingContacts } from '@/components/FloatingContacts'
import { Header } from '@/components/Header'
import { HomePage } from '@/components/HomePage'
import { ProductDetailPage } from '@/components/ProductDetailPage'
import { ShopPage } from '@/components/ShopPage'
import { useAppContext } from '@/app/context'

function PageContent() {
  const { currentPage } = useAppContext()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'cart' && <CartPage />}
      </div>

      <Footer />
      <FloatingContacts />
    </div>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <PageContent />
    </AppProvider>
  )
}
