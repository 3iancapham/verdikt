"use client"

import type React from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RecommendationCardProps {
  title: string
  image: string
  stats: string[]
  slug?: string
}

export default function RecommendationCard({ title, image, stats, slug }: RecommendationCardProps) {
  const router = useRouter()
  const [isFollowed, setIsFollowed] = useState(false)

  // Check if topic is already followed
  useEffect(() => {
    if (!slug) return

    const storedTopics = localStorage.getItem("joinedTopics")
    if (storedTopics) {
      const topics = JSON.parse(storedTopics)
      setIsFollowed(topics.includes(slug))
    }
  }, [slug])

  const handleClick = () => {
    if (slug) {
      router.push(`/topic/${slug}`)
    }
  }

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when button is clicked

    if (!slug) return

    // Toggle follow state
    const newFollowState = !isFollowed
    setIsFollowed(newFollowState)

    // Update localStorage
    const storedTopics = localStorage.getItem("joinedTopics")
    let topics = storedTopics ? JSON.parse(storedTopics) : []

    if (newFollowState) {
      // Follow topic
      if (!topics.includes(slug)) {
        topics.push(slug)
      }
    } else {
      // Unfollow topic
      topics = topics.filter((topic: string) => topic !== slug)
    }

    localStorage.setItem("joinedTopics", JSON.stringify(topics))

    // Dispatch storage event to update other components
    window.dispatchEvent(new Event("storage"))
  }

  return (
    <div
      className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow relative"
      onClick={handleClick}
    >
      <div className="relative h-32">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-3 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <Button
            size="sm"
            variant={isFollowed ? "outline" : "default"}
            className={`rounded-full h-7 px-2 min-w-[70px] ${
              isFollowed
                ? "border-indigo-500 text-indigo-500 hover:bg-indigo-50"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
            onClick={handleFollow}
          >
            {isFollowed ? (
              <>
                <Check size={14} className="mr-1" />
                <span className="text-xs">Following</span>
              </>
            ) : (
              <>
                <Plus size={14} className="mr-1" />
                <span className="text-xs">Follow</span>
              </>
            )}
          </Button>
        </div>
        {stats.map((stat, index) => (
          <p key={index} className="text-sm text-gray-500">
            {stat}
          </p>
        ))}
      </div>
    </div>
  )
}

