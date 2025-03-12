"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import PostCard from "@/components/post-card"
import BottomNavigation from "@/components/bottom-navigation"
import { allTopics } from "@/lib/data/topics"

interface TopicPost {
  id: number
  avatar: string
  username: string
  time: string
  product: string
  content: string
  image?: string
  likes: number
  comments: number
}

// Mock data for topic posts
const topicPosts: Record<string, TopicPost[]> = {
  netflix: [
    {
      id: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      username: "Antony Giulio",
      time: "4 min ago",
      product: "Netflix Subscription",
      content: "Anyone see the sneak peek teaser of season 5!? Guys I can NOT waittttt!!",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-11%20at%2011.43.55%E2%80%AFAM-U3iYBEJ7jDlFuFuHUkbT0ayh8qex6t.png",
      likes: 124,
      comments: 124,
    },
    {
      id: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      username: "Jamie Seggman",
      time: "4 min ago",
      product: "Netflix Subscription",
      content: "Is it worth watching the new movie Lift that just got released? Trailer looks mehhh",
      likes: 0,
      comments: 0,
    },
  ],
  pilates: [
    {
      id: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      username: "Sarah Chen",
      time: "2 hours ago",
      product: "Reformer Pilates",
      content: "Just finished my first reformer class! My core is on fire but it was amazing!",
      likes: 45,
      comments: 12,
    },
  ],
  sneakers: [
    {
      id: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      username: "Jay Russo",
      time: "4 min ago",
      product: "Nike Air Force 1",
      content: "Just got my first pair of Nike Air Force 1s. So fresh and comfyyy",
      image: "/placeholder.svg?height=300&width=500",
      likes: 124,
      comments: 124,
    },
  ],
}

export default function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const [isJoined, setIsJoined] = useState(false)
  const [joinedTopics, setJoinedTopics] = useState<string[]>([])
  const { slug } = use(params)
  const topic = allTopics[slug]
  const posts = topicPosts[slug] || []

  // Load joined topics from localStorage on component mount
  useEffect(() => {
    const storedTopics = localStorage.getItem("joinedTopics")
    if (storedTopics) {
      const topics = JSON.parse(storedTopics)
      setJoinedTopics(topics)
      setIsJoined(topics.includes(slug))
    }
  }, [slug])

  // Handle joining/leaving a topic
  const toggleJoin = () => {
    const newJoinedState = !isJoined
    setIsJoined(newJoinedState)

    let updatedTopics = [...joinedTopics]
    if (newJoinedState) {
      // Join the topic
      if (!updatedTopics.includes(slug)) {
        updatedTopics.push(slug)
      }
    } else {
      // Leave the topic
      updatedTopics = updatedTopics.filter((topic) => topic !== slug)
    }

    setJoinedTopics(updatedTopics)
    localStorage.setItem("joinedTopics", JSON.stringify(updatedTopics))
  }

  if (!topic) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => router.back()} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <span className="text-lg font-medium">Topic</span>
          <div className="w-6"></div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <p className="text-gray-500">This topic doesn't exist or hasn't been created yet.</p>
        </div>
        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => router.back()} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <span className="text-lg font-medium">Trending</span>
          <button className="text-gray-600">
            <Search size={24} />
          </button>
        </div>

        {/* Topic Title and Join Button */}
        <div className="px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{topic.title}</h1>
          <Button
            onClick={toggleJoin}
            variant={isJoined ? "outline" : "default"}
            className={`rounded-full ${
              isJoined ? "border-indigo-500 text-indigo-500 hover:bg-indigo-50" : "bg-indigo-500 hover:bg-indigo-600"
            }`}
            size="sm"
          >
            {isJoined ? (
              <>
                <X size={16} className="mr-1" />
                Leave
              </>
            ) : (
              <>
                <Plus size={16} className="mr-1" />
                Join
              </>
            )}
          </Button>
        </div>

        {/* Topic Info */}
        <div className="px-4 pb-3 text-gray-500 text-sm flex items-center">
          <span>{topic.memberCount.toLocaleString()} members</span>
          {topic.description && <div className="mt-2 text-gray-600">{topic.description}</div>}
        </div>
      </div>

      {/* Posts Feed */}
      <main className="flex-1 overflow-y-auto pb-16">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            avatar={post.avatar}
            username={post.username}
            time={post.time}
            product={post.product}
            rating={4.5}
            ratingColor="bg-indigo-500"
            image={post.image}
            likes={post.likes}
            comments={post.comments}
            content={post.content}
            postId={post.id.toString()}
          />
        ))}
      </main>

      <BottomNavigation />
    </div>
  )
}

