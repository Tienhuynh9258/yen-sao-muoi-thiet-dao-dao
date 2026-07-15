import { getAllProducts } from '@/lib/products'
import { ShopPage } from '@/components/ShopPage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProductPage() {
  const products = await getAllProducts()
  return <ShopPage products={products} />
}
