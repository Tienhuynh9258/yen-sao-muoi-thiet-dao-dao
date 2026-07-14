import type { Product } from '@/app/context'
import { getSupabase } from './db'

export const categories = ['Premium', 'Luxury', 'Standard']

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price)
}

const cleanName = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

export function getSlug(name: string): string {
  return cleanName(name)
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await getSupabase()
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getAllProducts error:', error)
    return []
  }

  return (data ?? []).map((row) => rowToProduct(row))
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await getSupabase().from('products').select('*')
  if (error || !data) {
    console.error('getProductBySlug error:', error)
    return null
  }
  const found = data.find((p) => getSlug(p.name) === slug)
  if (!found) return null
  return rowToProduct(found)
}

export async function getProductSlugs(): Promise<string[]> {
  const { data, error } = await getSupabase().from('products').select('name')
  if (error || !data) return []
  return data.map((p) => getSlug(p.name))
}

// Helper to convert Supabase row to Product
function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id ?? ''),
    name: String(row.name ?? ''),
    image: String(row.image ?? ''),
    description: String(row.description ?? ''),
    price: Number(row.price ?? 0),
    category: String(row.category ?? ''),
    rating: Number(row.rating ?? 0),
    reviews: Number(row.reviews ?? 0),
    specs: Array.isArray(row.specs) ? row.specs.map(String) : [],
  }
}
