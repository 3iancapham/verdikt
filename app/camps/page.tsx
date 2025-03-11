"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Grid, Users, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import BottomNavigation from "@/components/bottom-navigation"

// Mock data for all available camps
const allCamps: Record<
  string,
  {
    title: string
    slug: string
    memberCount: number
    image: string
    description: string
    category: string
  }
> = {
  netflix: {
    title: "Netflix",
    slug: "netflix",
    memberCount: 15243,
    image: "/placeholder.svg?height=80&width=80",
    description: "Discuss the latest shows, movies, and Netflix originals.",
    category: "Entertainment",
  },
  pilates: {
    title: "Pilates",
    slug: "pilates",
    memberCount: 8752,
    image: "/placeholder.svg?height=80&width=80",
    description: "Connect with Pilates enthusiasts and share your journey.",
    category: "Fitness",
  },
  sneakers: {
    title: "Sneakers",
    slug: "sneakers",
    memberCount: 24891,
    image: "/placeholder.svg?height=80&width=80",
    description: "The ultimate community for sneakerheads.",
    category: "Fashion",
  },
  nike: {
    title: "Nike",
    slug: "nike",
    memberCount: 32567,
    image: "/placeholder.svg?height=80&width=80",
    description: "Everything Nike - from new releases to classics.",
    category: "Brands",
  },
  "apple-vision-pro": {
    title: "Apple Vision Pro",
    slug: "apple-vision-pro",
    memberCount: 9876,
    image: "/placeholder.svg?height=80&width=80",
    description: "Discuss the revolutionary spatial computing device.",
    category: "Technology",
  },
  festivals: {
    title: "Festivals",
    slug: "festivals",
    memberCount: 18432,
    image: "/placeholder.svg?height=80&width=80",
    description: "Music, art, and cultural festivals around the world.",
    category: "Entertainment",
  },
  podcasts: {
    title: "Podcasts",
    slug: "podcasts",
    memberCount: 12543,
    image: "/placeholder.svg?height=80&width=80",
    description: "Discover and discuss the best podcasts.",
    category: "Entertainment",
  },
  streaming: {
    title: "Streaming",
    slug: "streaming",
    memberCount: 21345,
    image: "/placeholder.svg?height=80&width=80",
    description: "All streaming platforms and services in one place.",
    category: "Entertainment",
  },
  "tv-shows": {
    title: "TV Shows",
    slug: "tv-shows",
    memberCount: 28976,
    image: "/placeholder.svg?height=80&width=80",
    description: "Discuss your favorite TV shows and series.",
    category: "Entertainment",
  },
}

export default function CampsPage() {
  const router = useRouter()
  const [joinedCamps, setJoinedCamps] = useState<string[]>([])
  const [categories, setCategories] = useState<Record<string, any[]>>({})

  // Load joined camps from localStorage on component mount
  useEffect(() => {
    const storedCamps = localStorage.getItem("joinedCamps")
    if (storedCamps) {
      setJoinedCamps(JSON.parse(storedCamps))
    }
  }, [])

  // Organize joined camps by category
  useEffect(() => {
    const categorized: Record<string, any[]> = {}

    joinedCamps.forEach((campSlug) => {
      const camp = allCamps[campSlug]
      if (camp) {
        if (!categorized[camp.category]) {
          categorized[camp.category] = []
        }
        categorized[camp.category].push(camp)
      }
    })

    // Sort categories alphabetically
    const sortedCategories: Record<string, any[]> = {}
    Object.keys(categorized)
      .sort()
      .forEach((key) => {
        sortedCategories[key] = categorized[key]
      })

    setCategories(sortedCategories)
  }, [joinedCamps])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 overflow-y-auto pb-16">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Your Camps</h1>

          {joinedCamps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Grid size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No camps joined yet</h3>
              <p className="text-gray-500 mb-6 max-w-xs">
                Join camps to connect with communities and get updates on topics you care about.
              </p>
              <button onClick={() => router.push("/explore")} className="text-indigo-500 font-medium">
                Explore camps to join
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(categories).map(([category, camps]) => (
                <div key={category}>
                  <h2 className="text-lg font-semibold mb-3">{category}</h2>
                  <div className="space-y-3">
                    {camps.map((camp) => (
                      <button
                        key={camp.slug}
                        onClick={() => router.push(`/topic/${camp.slug}`)}
                        className="flex items-center w-full bg-white border border-gray-200 rounded-xl p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-100">
                          <Image
                            src={camp.image || "/placeholder.svg"}
                            alt={camp.title}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-medium text-gray-900">{camp.title}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users size={14} className="mr-1" />
                            <span>{camp.memberCount.toLocaleString()} members</span>
                          </div>
                        </div>
                        <ArrowRight size={18} className="text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNavigation activeTab="camps" />
    </div>
  )
}

