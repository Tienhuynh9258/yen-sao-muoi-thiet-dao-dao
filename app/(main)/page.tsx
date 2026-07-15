import { getAllProducts } from '@/lib/products'
import { HomePage } from '@/components/HomePage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const products = await getAllProducts()
  return <HomePage products={products} />
}
