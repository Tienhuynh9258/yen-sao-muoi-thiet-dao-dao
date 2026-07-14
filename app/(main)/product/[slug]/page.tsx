import { getProductBySlug, getProductSlugs } from '@/lib/products'
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
        <p className="font-sans text-2xl">Không tìm thấy sản phẩm</p>
      </main>
    )
  }

  return <ProductDetailPage product={product} />
}

export async function generateStaticParams() {
  const slugs = await getProductSlugs()
  return slugs.map((slug) => ({ slug }))
}
