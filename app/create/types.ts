// Types for categories and products
export interface Category {
  id: number
  name: string
  subcategories: string[]
}

export interface Product {
  id: number
  name: string
  brand: string
  image: string
  verified: boolean
}

export interface RatingEmoji {
  emoji: string
  value: number
}

// Form data type
export interface CreateVerdiktFormData {
  content: string
  product: string
  rating: number
  isPrivate: boolean
  mediaUrl: string | null
  taggedProduct: Product | null
} 