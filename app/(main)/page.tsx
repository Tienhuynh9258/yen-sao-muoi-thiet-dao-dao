import { getAllProducts } from '@/lib/products'
import { HomePage } from '@/components/HomePage'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getAllProducts()
  return <HomePage products={products} />
}
