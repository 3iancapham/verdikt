"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import CategoryTabs from "@/components/category-tabs"
import PostCard from "@/components/post-card"
import BottomNavigation from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock posts data with topic associations
const allPosts = [
  {
    id: 1,
    avatar: "/placeholder.svg?height=40&width=40",
    username: "Jay Russo",
    time: "4 min ago",
    product: "Nike Air Force 1",
    rating: 4.4,
    ratingColor: "bg-green-400",
    image: "/placeholder.svg?height=300&width=500",
    likes: 124,
    comments: 124,
    content: "Just got my first pair of Nike Air Force 1s. So fresh and comfyyy",
    topics: ["sneakers", "nike"],
  },
  {
    id: 2,
    avatar: "/placeholder.svg?height=40&width=40",
    username: "Jess Eagan",
    time: "4 min ago",
    product: "Nike x Tiffany Dunks",
    rating: 2.3,
    ratingColor: "bg-yellow-300",
    likes: 0,
    comments: 0,
    content: "Anyone buy the new Tiffany dunks? Wondering if it's worth it! Would love to hear it all.",
    topics: ["sneakers", "nike"],
  },
  {
    id: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    username: "Antony Giulio",
    time: "4 min ago",
    product: "Netflix Subscription",
    rating: 4.5,
    ratingColor: "bg-green-400",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-11%20at%2011.43.55%E2%80%AFAM-U3iYBEJ7jDlFuFuHUkbT0ayh8qex6t.png",
    likes: 124,
    comments: 124,
    content: "Anyone see the sneak peek teaser of season 5!? Guys I can NOT waittttt!!",
    topics: ["netflix", "streaming", "tv-shows"],
  },
  {
    id: 4,
    avatar: "/placeholder.svg?height=40&width=40",
    username: "Jamie Seggman",
    time: "4 min ago",
    product: "Netflix Subscription",
    rating: 3.2,
    ratingColor: "bg-yellow-300",
    likes: 45,
    comments: 12,
    content: "Is it worth watching the new movie Lift that just got released? Trailer looks mehhh",
    topics: ["netflix", "streaming"],
  },
  {
    id: 5,
    avatar: "/placeholder.svg?height=40&width=40",
    username: "Sarah Chen",
    time: "2 hours ago",
    product: "Reformer Pilates",
    rating: 4.8,
    ratingColor: "bg-green-400",
    likes: 67,
    comments: 23,
    content: "Just finished my first reformer class! My core is on fire but it was amazing!",
    topics: ["pilates"],
  },
  {
    id: 6,
    avatar: "/placeholder.svg?height=40&width=40",
    username: "Mike Johnson",
    time: "1 day ago",
    product: "Apple Vision Pro",
    rating: 4.9,
    ratingColor: "bg-green-400",
    image: "/placeholder.svg?height=300&width=500",
    likes: 231,
    comments: 87,
    content: "Finally got my hands on the Vision Pro. Mind = blown. The spatial computing is next level!",
    topics: ["apple-vision-pro"],
  },
]

export default function Home() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [joinedTopics, setJoinedTopics] = useState<string[]>([])
  const [filteredPosts, setFilteredPosts] = useState(allPosts)

  // Load joined topics from localStorage on component mount
  useEffect(() => {
    const storedTopics = localStorage.getItem("joinedTopics")
    if (storedTopics) {
      const topics = JSON.parse(storedTopics)
      setJoinedTopics(topics)
    }
  }, [])

  // Listen for tab changes from CategoryTabs
  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail.tab)
    }

    window.addEventListener("tabChange", handleTabChange as EventListener)

    return () => {
      window.removeEventListener("tabChange", handleTabChange as EventListener)
    }
  }, [])

  // Filter posts based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      // If no topics joined, show all posts
      if (joinedTopics.length === 0) {
        setFilteredPosts(allPosts)
      } else {
        // If topics joined, show posts from joined topics
        setFilteredPosts(allPosts.filter((post) => post.topics.some((topic) => joinedTopics.includes(topic))))
      }
    } else {
      // Show posts from specific topic
      setFilteredPosts(allPosts.filter((post) => post.topics.includes(activeTab)))
    }
  }, [activeTab, joinedTopics])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <CategoryTabs />

      <div className="flex-1 overflow-y-auto pb-16">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              avatar={post.avatar}
              username={post.username}
              time={post.time}
              product={post.product}
              rating={post.rating}
              ratingColor={post.ratingColor}
              image={post.image}
              likes={post.likes}
              comments={post.comments}
              content={post.content}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-gray-500 mb-4">No posts in this topic yet.</p>
            {joinedTopics.length === 0 && (
              <Button onClick={() => router.push("/explore")} className="flex items-center">
                <PlusCircle size={16} className="mr-2" />
                Join Topics
              </Button>
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}

