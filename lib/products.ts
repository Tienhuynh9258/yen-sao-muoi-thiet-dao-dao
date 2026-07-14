import type { Product } from '@/app/context'
import { supabase } from './db'

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
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getAllProducts error:', error)
    return []
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    image: row.image,
    description: row.description,
    price: row.price,
    category: row.category,
    rating: row.rating,
    reviews: row.reviews,
    specs: row.specs ?? [],
  }))
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // We fetch all and filter client-side (PostgREST doesn't have regex on normalized strings easily)
  const { data, error } = await supabase
    .from('products')
    .select('*')

  if (error || !data) {
    console.error('getProductBySlug error:', error)
    return null
  }

  const found = data.find((p) => getSlug(p.name) === slug)
  if (!found) return null

  return {
    id: found.id,
    name: found.name,
    image: found.image,
    description: found.description,
    price: found.price,
    category: found.category,
    rating: found.rating,
    reviews: found.reviews,
    specs: found.specs ?? [],
  }
}

// Generate static params helper (used in build-time for ISR)
export async function getProductSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from('products').select('name')
  if (error || !data) return []
  return data.map((p) => getSlug(p.name))
}
