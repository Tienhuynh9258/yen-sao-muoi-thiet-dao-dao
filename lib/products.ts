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

// Returns null during build if env vars are missing — safe for SSG/ISR
export async function getAllProducts(): Promise<Product[]> {
  const client = getSupabase()
  if (!client) return []
  const { data, error } = await client
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
  const client = getSupabase()
  if (!client) return null
  const { data, error } = await client.from('products').select('*')
  if (error || !data) {
    console.error('getProductBySlug error:', error)
    return null
  }
  const found = data.find((p: { name: string }) => getSlug(p.name) === slug)
  if (!found) return null
  return rowToProduct(found)
}

export async function getProductSlugs(): Promise<string[]> {
  const client = getSupabase()
  if (!client) return []
  const { data, error } = await client.from('products').select('name')
  if (error || !data) return []
  return data.map((p: { name: string }) => getSlug(p.name))
}

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
    images: Array.isArray(row.images) ? row.images.map(String) : [],
    specs: Array.isArray(row.specs) ? row.specs.map(String) : [],
  }
}
