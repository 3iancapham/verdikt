"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"
import { allTopics } from "@/lib/data/topics"

export default function CategoryTabs() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [joinedTopics, setJoinedTopics] = useState<string[]>([])
  const [userTopics, setUserTopics] = useState<Array<{ title: string; slug: string; engagement: number }>>([])

  // Load joined topics from localStorage on component mount
  useEffect(() => {
    const storedTopics = localStorage.getItem("joinedTopics")
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

