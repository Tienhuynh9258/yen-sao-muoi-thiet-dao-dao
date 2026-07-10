import type { Product } from '@/app/context'

export const products: Product[] = [
  {
    id: '1',
    name: 'Yến Tinh Chọn',
    category: 'Premium',
    price: 2500000,
    image: '/products/yen-sao-tieu-chuan.png',
    description: 'Yến sào cao cấp với chất lượng và độ tinh khiết vượt trội',
    rating: 4.8,
    reviews: 142,
    specs: ['100% Nguyên chất', 'Loại A', 'Năm 2024', 'Khối lượng: 100g'],
  },
  {
    id: '2',
    name: 'Yến Sào Cao Cấp',
    category: 'Luxury',
    price: 3800000,
    image: '/products/yen-sao-cao-cap.png',
    description: 'Yến sào cao cấp dành cho những người sành ăn - thủ công nghề cao',
    rating: 4.9,
    reviews: 98,
    specs: ['100% Nguyên chất', 'Loại AAA', 'Năm 2024', 'Khối lượng: 150g'],
  },
  {
    id: '3',
    name: 'Yến Huyết Yến',
    category: 'Standard',
    price: 1800000,
    image: '/products/yen-sao-huyet.png',
    description: 'Yến sào chất lượng cao - lựa chọn tuyệt vời với giá tốt',
    rating: 4.6,
    reviews: 267,
    specs: ['100% Nguyên chất', 'Loại A', 'Năm 2024', 'Khối lượng: 75g'],
  },
  {
    id: '4',
    name: 'Yến Hạnh Phúc',
    category: 'Premium',
    price: 2900000,
    image: '/products/yen-sao-hanh-phuc.png',
    description: 'Yến sào đặc biệt với hương vị độc đáo và tuyệt vời',
    rating: 4.7,
    reviews: 156,
    specs: ['100% Nguyên chất', 'Loại A+', 'Năm 2024', 'Khối lượng: 120g'],
  },
  {
    id: '5',
    name: 'Yến Thiếu Tá',
    category: 'Luxury',
    price: 4200000,
    image: '/products/yen-sao-thieu-ta.png',
    description: 'Yến sào hoàng kim - lựa chọn tuyệt nhất cho những vị vua',
    rating: 5.0,
    reviews: 64,
    specs: ['100% Nguyên chất', 'Loại AAA+', 'Năm 2024', 'Khối lượng: 180g'],
  },
  {
    id: '6',
    name: 'Yến Hoa Vàng',
    category: 'Standard',
    price: 2100000,
    image: '/products/yen-sao-hoa-vang.png',
    description: 'Yến sào vàng tiêu chuẩn với đặc tính cao cấp',
    rating: 4.5,
    reviews: 189,
    specs: ['100% Nguyên chất', 'Loại A', 'Năm 2024', 'Khối lượng: 100g'],
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

export function findProductBySlug(slug: string): Product | undefined {
  return products.find((p) => getSlug(p.name) === slug)
}
