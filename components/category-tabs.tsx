"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"

// Mock data for all available topics with engagement metrics
const allTopics: Record<
  string,
  {
    title: string
    slug: string
    memberCount: number
    engagement?: number // Higher number means more user engagement
  }
> = {
  netflix: {
    title: "Netflix",
    slug: "netflix",
    memberCount: 15243,
    engagement: 95,
  },
  pilates: {
    title: "Pilates",
    slug: "pilates",
    memberCount: 8752,
    engagement: 82,
  },
  sneakers: {
    title: "Sneakers",
    slug: "sneakers",
    memberCount: 24891,
    engagement: 98,
  },
  nike: {
    title: "Nike",
    slug: "nike",
    memberCount: 32567,
    engagement: 88,
  },
  "apple-vision-pro": {
    title: "Apple Vision Pro",
    slug: "apple-vision-pro",
    memberCount: 9876,
    engagement: 90,
  },
  festivals: {
    title: "Festivals",
    slug: "festivals",
    memberCount: 18432,
    engagement: 75,
  },
  podcasts: {
    title: "Podcasts",
    slug: "podcasts",
    memberCount: 12543,
    engagement: 80,
  },
  streaming: {
    title: "Streaming",
    slug: "streaming",
    memberCount: 21345,
    engagement: 85,
  },
  "tv-shows": {
    title: "TV Shows",
    slug: "tv-shows",
    memberCount: 28976,
    engagement: 92,
  },
}

export default function CategoryTabs() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [joinedTopics, setJoinedTopics] = useState<string[]>([])
  const [userTopics, setUserTopics] = useState<Array<{ title: string; slug: string; engagement: number }>>([])

  // Load joined topics from localStorage on component mount
  useEffect(() => {
    const storedTopics = localStorage.getItem("joinedCamps")
    if (storedTopics) {
      setJoinedTopics(JSON.parse(storedTopics))
    }
  }, [])

  // Process and sort joined topics by engagement
  useEffect(() => {
    const topics = joinedTopics
      .filter((slug) => allTopics[slug]) // Filter out any invalid topics
      .map((slug) => ({
        title: allTopics[slug].title,
        slug: slug,
        engagement: allTopics[slug].engagement || 0,
      }))
      .sort((a, b) => b.engagement - a.engagement) // Sort by engagement (highest first)

    setUserTopics(topics)
  }, [joinedTopics])

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)

    // Emit custom event for parent components to listen to
    const event = new CustomEvent("tabChange", { detail: { tab } })
    window.dispatchEvent(event)
  }

  return (
    <div className="flex space-x-4 px-4 py-3 overflow-x-auto no-scrollbar border-b">
      <button
        className={`px-4 py-2 rounded-full whitespace-nowrap ${
          activeTab === "all" ? "bg-indigo-100 text-indigo-500" : "bg-gray-100 text-gray-700"
        }`}
        onClick={() => handleTabChange("all")}
      >
        All Topics
      </button>

      {userTopics.map((topic) => (
        <button
          key={topic.slug}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            activeTab === topic.slug ? "bg-indigo-100 text-indigo-500" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => handleTabChange(topic.slug)}
        >
          {topic.title}
        </button>
      ))}

      {joinedTopics.length === 0 && (
        <button
          className="flex items-center px-4 py-2 rounded-full whitespace-nowrap bg-gray-100 text-indigo-500"
          onClick={() => router.push("/explore")}
        >
          <PlusCircle size={16} className="mr-1" />
          Follow Topics
        </button>
      )}
    </div>
  )
}

