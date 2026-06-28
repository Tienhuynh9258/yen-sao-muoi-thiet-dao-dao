import type { Product } from '@/app/context'

export const products: Product[] = [
  {
    id: '1',
    name: 'Yến Tinh Chọn',
    category: 'Premium',
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1599599810694-d3d1a0b84da1?w=500&h=500&fit=crop',
    description: 'Premium bird\'s nest with superior quality and purity',
    rating: 4.8,
    reviews: 142,
    specs: ['100% Pure', 'Grade A', 'Harvest 2024', 'Quantity: 100g'],
  },
  {
    id: '2',
    name: 'Yến Sào Hàng Sang',
    category: 'Luxury',
    price: 3800000,
    image: 'https://images.unsplash.com/photo-1599599810974-d3d1a0b84da1?w=500&h=500&fit=crop',
    description: 'Luxury bird\'s nest for connoisseurs - exceptional craftsmanship',
    rating: 4.9,
    reviews: 98,
    specs: ['100% Pure', 'Grade AAA', 'Harvest 2024', 'Quantity: 150g'],
  },
  {
    id: '3',
    name: 'Yến Thường Thanh',
    category: 'Standard',
    price: 1800000,
    image: 'https://images.unsplash.com/photo-1599599812694-d3d1a0b84da1?w=500&h=500&fit=crop',
    description: 'High quality standard bird\'s nest - excellent value',
    rating: 4.6,
    reviews: 267,
    specs: ['100% Pure', 'Grade A', 'Harvest 2024', 'Quantity: 75g'],
  },
  {
    id: '4',
    name: 'Yến Đặc Biệt',
    category: 'Premium',
    price: 2900000,
    image: 'https://images.unsplash.com/photo-1599599811214-d3d1a0b84da1?w=500&h=500&fit=crop',
    description: 'Special selection bird\'s nest with unique flavor profile',
    rating: 4.7,
    reviews: 156,
    specs: ['100% Pure', 'Grade A+', 'Harvest 2024', 'Quantity: 120g'],
  },
  {
    id: '5',
    name: 'Yến Hoàng Kim',
    category: 'Luxury',
    price: 4200000,
    image: 'https://images.unsplash.com/photo-1599599814694-d3d1a0b84da1?w=500&h=500&fit=crop',
    description: 'Golden bird\'s nest - the finest selection for royalty',
    rating: 5.0,
    reviews: 64,
    specs: ['100% Pure', 'Grade AAA+', 'Harvest 2024', 'Quantity: 180g'],
  },
  {
    id: '6',
    name: 'Yến Vàng Sang',
    category: 'Standard',
    price: 2100000,
    image: 'https://images.unsplash.com/photo-1599599914694-d3d1a0b84da1?w=500&h=500&fit=crop',
    description: 'Golden standard bird\'s nest with premium characteristics',
    rating: 4.5,
    reviews: 189,
    specs: ['100% Pure', 'Grade A', 'Harvest 2024', 'Quantity: 100g'],
  },
]

export const categories = ['Premium', 'Luxury', 'Standard']

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price)
}
