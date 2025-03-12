// Mock data for all available topics
export const allTopics: Record<
  string,
  {
    title: string
    slug: string
    memberCount: number
    image: string
    description: string
    category: string
    engagement?: number // Higher number means more user engagement
  }
> = {
  netflix: {
    title: "Netflix",
    slug: "netflix",
    memberCount: 15243,
    image: "/placeholder.svg?height=80&width=80",
    description: "Discuss the latest shows, movies, and Netflix originals.",
    category: "Entertainment",
    engagement: 95,
  },
  pilates: {
    title: "Pilates",
    slug: "pilates",
    memberCount: 8752,
    image: "/placeholder.svg?height=80&width=80",
    description: "Connect with Pilates enthusiasts and share your journey.",
    category: "Fitness",
    engagement: 82,
  },
  sneakers: {
    title: "Sneakers",
    slug: "sneakers",
    memberCount: 24891,
    image: "/placeholder.svg?height=80&width=80",
    description: "The ultimate community for sneakerheads.",
    category: "Fashion",
    engagement: 98,
  },
  nike: {
    title: "Nike",
    slug: "nike",
    memberCount: 32567,
    image: "/placeholder.svg?height=80&width=80",
    description: "Everything Nike - from new releases to classics.",
    category: "Brands",
    engagement: 88,
  },
  "apple-vision-pro": {
    title: "Apple Vision Pro",
    slug: "apple-vision-pro",
    memberCount: 9876,
    image: "/placeholder.svg?height=80&width=80",
    description: "Discuss the revolutionary spatial computing device.",
    category: "Technology",
    engagement: 90,
  },
  festivals: {
    title: "Festivals",
    slug: "festivals",
    memberCount: 18432,
    image: "/placeholder.svg?height=80&width=80",
    description: "Music, art, and cultural festivals around the world.",
    category: "Entertainment",
    engagement: 75,
  },
  podcasts: {
    title: "Podcasts",
    slug: "podcasts",
    memberCount: 12543,
    image: "/placeholder.svg?height=80&width=80",
    description: "Discover and discuss the best podcasts.",
    category: "Entertainment",
    engagement: 80,
  },
  streaming: {
    title: "Streaming",
    slug: "streaming",
    memberCount: 21345,
    image: "/placeholder.svg?height=80&width=80",
    description: "All streaming platforms and services in one place.",
    category: "Entertainment",
    engagement: 85,
  },
  "tv-shows": {
    title: "TV Shows",
    slug: "tv-shows",
    memberCount: 28976,
    image: "/placeholder.svg?height=80&width=80",
    description: "Discuss your favorite TV shows and series.",
    category: "Entertainment",
    engagement: 92,
  },
} 