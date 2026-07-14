import { getProductBySlug } from '@/lib/products'
import { ProductDetailPage } from '@/components/ProductDetailPage'

interface ProductDetailProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-sans text-2xl">Khong tim thay san pham</p>
      </main>
    )
  }

  return <ProductDetailPage product={product} />
}
