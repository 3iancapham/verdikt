"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Grid, Users, ArrowRight, X } from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"

// Mock data for all available topics
const allTopics: Record<
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
  "lupes-tacos": {
    title: "Lupe's Tacos",
    slug: "lupes-tacos",
    memberCount: 3421,
    image: "/placeholder.svg?height=80&width=80",
    description: "The best taco spot in town. Share your favorite menu items.",
    category: "Food & Dining",
  },
  "nike-air-max": {
    title: "Nike Air Max",
    slug: "nike-air-max",
    memberCount: 15678,
    image: "/placeholder.svg?height=80&width=80",
    description: "All about Nike Air Max sneakers.",
    category: "Fashion",
  },
  "legend-of-zelda": {
    title: "Legend of Zelda",
    slug: "legend-of-zelda",
    memberCount: 28943,
    image: "/placeholder.svg?height=80&width=80",
    description: "For fans of the Legend of Zelda series.",
    category: "Gaming",
  },
  "stranger-things": {
    title: "Stranger Things",
    slug: "stranger-things",
    memberCount: 19876,
    image: "/placeholder.svg?height=80&width=80",
    description: "Discuss the hit Netflix series Stranger Things.",
    category: "Entertainment",
  },
  "amc-theaters": {
    title: "AMC Theaters",
    slug: "amc-theaters",
    memberCount: 7654,
    image: "/placeholder.svg?height=80&width=80",
    description: "Discuss AMC Theaters and movie experiences.",
    category: "Entertainment",
  },
}

export default function TopicsPage() {
  const router = useRouter()
  const [joinedTopics, setJoinedTopics] = useState<string[]>([])
  const [categories, setCategories] = useState<Record<string, any[]>>({})
  const [leavingTopic, setLeavingTopic] = useState<string | null>(null)

  // Load joined topics from localStorage on component mount
  useEffect(() => {
    const storedTopics = localStorage.getItem("joinedCamps")
    if (storedTopics) {
      setJoinedTopics(JSON.parse(storedTopics))
    }
  }, [])

  // Organize joined topics by category
  useEffect(() => {
    const categorized: Record<string, any[]> = {}

    joinedTopics.forEach((topicSlug) => {
      const topic = allTopics[topicSlug]
      if (topic) {
        if (!categorized[topic.category]) {
          categorized[topic.category] = []
        }
        categorized[topic.category].push(topic)
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
  }, [joinedTopics])

  // Handle leaving a topic
  const leaveTopic = (slug: string, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent navigation to topic page

    setLeavingTopic(slug)

    // Remove the topic from joined topics
    const updatedTopics = joinedTopics.filter((topic) => topic !== slug)
    setJoinedTopics(updatedTopics)

    // Update localStorage
    localStorage.setItem("joinedCamps", JSON.stringify(updatedTopics))

    // Reset leaving state after animation
    setTimeout(() => {
      setLeavingTopic(null)
    }, 300)
  }

  // Navigate to topic page
  const goToTopic = (slug: string) => {
    router.push(`/topic/${slug}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 overflow-y-auto pb-16">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Your Topics</h1>

          {joinedTopics.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Grid size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No topics joined yet</h3>
              <p className="text-gray-500 mb-6 max-w-xs">
                Join topics to connect with communities and get updates on subjects you care about.
              </p>
              <button onClick={() => router.push("/explore")} className="text-indigo-500 font-medium">
                Explore topics to join
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(categories).map(([category, topics]) => (
                <div key={category}>
                  <h2 className="text-lg font-semibold mb-3">{category}</h2>
                  <div className="space-y-3">
                    {topics.map((topic) => (
                      <div
                        key={topic.slug}
                        className={`transition-all duration-300 ${
                          leavingTopic === topic.slug ? "opacity-50 scale-95" : "opacity-100"
                        }`}
                      >
                        <div className="flex items-center w-full bg-white border border-gray-200 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                          <div
                            className="flex-1 flex items-center cursor-pointer"
                            onClick={() => goToTopic(topic.slug)}
                          >
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-100">
                              <Image
                                src={topic.image || "/placeholder.svg"}
                                alt={topic.title}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{topic.title}</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <Users size={14} className="mr-1" />
                                <span>{topic.memberCount.toLocaleString()} members</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-indigo-500 text-indigo-500 hover:bg-indigo-50"
                              onClick={(e) => leaveTopic(topic.slug, e)}
                            >
                              <X size={16} className="mr-1" />
                              Leave
                            </Button>
                            <button className="text-gray-400 hover:text-gray-600" onClick={() => goToTopic(topic.slug)}>
                              <ArrowRight size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNavigation activeTab="topics" />
    </div>
  )
}

