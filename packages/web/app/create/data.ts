import { Category, Product, RatingEmoji } from "./types"

// Mock data for existing categories and subcategories
export const initialCategories: Category[] = [
  {
    id: 1,
    name: "Nike",
    subcategories: ["Air Force 1", "Dunk Low", "Air Max", "Jordan 4"],
  },
  {
    id: 2,
    name: "Netflix",
    subcategories: ["Stranger Things", "Lift", "Squid Game", "Wednesday"],
  },
  {
    id: 3,
    name: "Pilates",
    subcategories: ["Reformer", "Mat", "Tower", "Chair"],
  },
  {
    id: 4,
    name: "Apple",
    subcategories: ["Vision Pro", "iPhone 15", "MacBook Pro", "AirPods"],
  },
  {
    id: 5,
    name: "Restaurants",
    subcategories: ["Lupe's Tacos", "Sushi Roku", "Nobu", "Carbone"],
  },
]

// Mock data for official products
export const officialProducts: Product[] = [
  { id: 1, name: "Nike Air Force 1", brand: "Nike", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 2, name: "Nike Dunk Low", brand: "Nike", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 3, name: "Nike Air Max 90", brand: "Nike", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 4, name: "Jordan 4 Retro", brand: "Nike", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 5, name: "Stranger Things S5", brand: "Netflix", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 6, name: "Lift", brand: "Netflix", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 7, name: "Squid Game S2", brand: "Netflix", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 8, name: "Wednesday S2", brand: "Netflix", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 9, name: "Reformer Pilates", brand: "Pilates", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 10, name: "Mat Pilates", brand: "Pilates", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 11, name: "Apple Vision Pro", brand: "Apple", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 12, name: "iPhone 15 Pro", brand: "Apple", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 13, name: "MacBook Pro M3", brand: "Apple", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 14, name: "AirPods Pro 2", brand: "Apple", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 15, name: "Lupe's Tacos", brand: "Restaurants", image: "/placeholder.svg?height=40&width=40", verified: true },
]

// Rating emojis
export const ratingEmojis: RatingEmoji[] = [
  { emoji: "😠", value: 1 },
  { emoji: "🙁", value: 2 },
  { emoji: "😐", value: 3 },
  { emoji: "😊", value: 4 },
  { emoji: "😍", value: 5 },
] 