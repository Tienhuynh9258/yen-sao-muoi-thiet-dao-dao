export interface Product {
  id: string
  name: string
  image: string
  description: string
  price: number
  category: string
  rating: number
  reviews: number
  specs?: string[]
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}
