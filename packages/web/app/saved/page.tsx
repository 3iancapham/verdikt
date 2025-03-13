"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bookmark } from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"
import PostCard from "@/components/post-card"

interface SavedPost {
  postId: string
  avatar: string
  username: string
  time: string
  product: string
  rating: number
  ratingColor: string
  image?: string
  likes: number
  comments: number
  content: string
  savedAt: string
}

export default function SavedPage() {
  const router = useRouter()
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load saved posts from localStorage on component mount
  useEffect(() => {
    const loadSavedPosts = () => {
      const savedPostsData = localStorage.getItem("savedPosts")
      if (savedPostsData) {
        // Sort by most recently saved first
        const posts = JSON.parse(savedPostsData)
        posts.sort((a: SavedPost, b: SavedPost) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
        setSavedPosts(posts)
      }
      setIsLoading(false)
    }

    loadSavedPosts()

    // Listen for storage events to update in real-time
    window.addEventListener("storage", loadSavedPosts)

    return () => {
      window.removeEventListener("storage", loadSavedPosts)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 overflow-y-auto pb-16">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Saved Items</h1>
          <p className="text-gray-500 text-sm mt-1">Posts you've saved will appear here</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        ) : savedPosts.length > 0 ? (
          savedPosts.map((post) => (
            <PostCard
              key={post.postId}
              postId={post.postId}
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
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <Bookmark size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No saved items yet</h3>
            <p className="text-gray-500 max-w-xs">
              Tap the bookmark icon on posts you want to save for later. They'll appear here.
            </p>
          </div>
        )}
      </main>

      <BottomNavigation activeTab="saved" />
    </div>
  )
}

