import { findProductBySlug, products } from '@/lib/products'
import { ProductDetailPage } from '@/components/ProductDetailPage'

interface ProductDetailProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { slug } = await params
  const product = findProductBySlug(slug)

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-sans text-2xl">Khong tim thay san pham</p>
      </main>
    )
  }

  return <ProductDetailPage product={product} />
}

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, ''),
  }))
}
