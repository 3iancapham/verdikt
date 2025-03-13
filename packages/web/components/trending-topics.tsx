"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface Topic {
  id: number
  name: string
  image: string
  slug?: string
}

interface TrendingTopicsProps {
  topics: Topic[]
}

export default function TrendingTopics({ topics }: TrendingTopicsProps) {
  const router = useRouter()

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
      {topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => router.push(`/topic/${topic.slug || topic.name.toLowerCase()}`)}
          className="flex flex-col items-center space-y-2 flex-shrink-0"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
            <Image
              src={topic.image || "/placeholder.svg"}
              alt={topic.name}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium">{topic.name}</span>
        </button>
      ))}
    </div>
  )
}

