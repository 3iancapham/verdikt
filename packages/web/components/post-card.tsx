"use client"

import Image from "next/image"
import { Heart, MessageCircle, Bookmark, Send, Tag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Comment {
  id: string
  username: string
  avatar: string
  content: string
  timestamp: string
  timeAgo: string
}

interface PostCardProps {
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
  maxRating?: number
  postId?: string
}

export default function PostCard({
  avatar,
  username,
  time,
  product,
  rating,
  ratingColor,
  image,
  likes,
  comments,
  content,
  maxRating = 5,
  postId = "1",
}: PostCardProps) {
  const router = useRouter()

  // Convert username to URL-friendly format
  const usernameSlug = username.toLowerCase().replace(/\s+/g, "-")

  // Parse product into category (brand) and subcategory (specific product)
  let category = "",
    subcategory = ""

  if (product.includes(": ")) {
    ;[category, subcategory] = product.split(": ")
  } else {
    // If no colon, assume it's all one product and try to extract brand
    const parts = product.split(" ")
    if (parts.length > 1) {
      // Assume first word is the brand
      category = parts[0]
      subcategory = parts.slice(1).join(" ")
    } else {
      category = product
      subcategory = ""
    }
  }

  // Create URL-friendly slugs for category and subcategory
  const categorySlug = category.toLowerCase().replace(/\s+/g, "-")
  const subcategorySlug = subcategory ? subcategory.toLowerCase().replace(/\s+/g, "-") : ""

  // Create topic URL path for category (brand)
  const categoryTopicPath = `/topic/${categorySlug}`

  // Create product URL path for subcategory (specific product)
  const subcategoryProductPath = subcategory ? `/product/${subcategorySlug}` : ""

  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [commentsList, setCommentsList] = useState<Comment[]>([
    {
      id: "1",
      username: "Sarah Kim",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "I've been thinking about getting these! How's the comfort level?",
      timestamp: "2025-03-10T14:30:00Z",
      timeAgo: "2 days ago",
    },
    {
      id: "2",
      username: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "The colorway on these is fire! 🔥",
      timestamp: "2025-03-11T09:15:00Z",
      timeAgo: "1 day ago",
    },
    {
      id: "3",
      username: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Did you get them retail or resale? Been trying to find a pair for months!",
      timestamp: "2025-03-11T16:45:00Z",
      timeAgo: "22 hours ago",
    },
  ])

  // Check if post is bookmarked on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("savedPosts")
    if (savedPosts) {
      const savedPostsArray = JSON.parse(savedPosts)
      setIsBookmarked(savedPostsArray.some((post: any) => post.postId === postId))
    }
  }, [postId])

  const handleAddComment = () => {
    if (newComment.trim() === "") return

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      username: "Current User",
      avatar: "/placeholder.svg?height=32&width=32",
      content: newComment,
      timestamp: new Date().toISOString(),
      timeAgo: "Just now",
    }

    setCommentsList([...commentsList, newCommentObj])
    setNewComment("")
  }

  // Handle bookmarking/saving a post
  const handleBookmark = () => {
    const newBookmarkState = !isBookmarked
    setIsBookmarked(newBookmarkState)

    // Get current saved posts from localStorage
    const savedPosts = localStorage.getItem("savedPosts")
    let savedPostsArray = savedPosts ? JSON.parse(savedPosts) : []

    if (newBookmarkState) {
      // Add post to saved posts if not already saved
      if (!savedPostsArray.some((post: any) => post.postId === postId)) {
        const postToSave = {
          postId,
          avatar,
          username,
          time,
          product,
          rating,
          ratingColor,
          image,
          likes,
          comments: commentsList.length,
          content,
          savedAt: new Date().toISOString(),
        }
        savedPostsArray.push(postToSave)
      }
    } else {
      // Remove post from saved posts
      savedPostsArray = savedPostsArray.filter((post: any) => post.postId !== postId)
    }

    // Save updated array back to localStorage
    localStorage.setItem("savedPosts", JSON.stringify(savedPostsArray))
  }

  // Sort comments from oldest to newest
  const sortedComments = [...commentsList].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  )

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <button
            onClick={() => router.push(`/profile/${usernameSlug}`)}
            className="w-10 h-10 rounded-full overflow-hidden mr-3"
          >
            <Image src={avatar || "/placeholder.svg"} alt={username} width={40} height={40} className="object-cover" />
          </button>
          <div>
            <button
              onClick={() => router.push(`/profile/${usernameSlug}`)}
              className="font-medium text-gray-800 hover:underline"
            >
              {username}
            </button>
            <div className="flex items-center">
              <button
                onClick={() => router.push(categoryTopicPath)}
                className="text-indigo-500 font-medium hover:underline flex items-center"
              >
                {category}
              </button>
              {subcategory && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(subcategoryProductPath)
                  }}
                  className="flex items-center ml-2"
                >
                  <Tag size={14} className="text-indigo-300 mr-1" />
                  <span className="text-indigo-300 font-normal hover:text-indigo-400 hover:underline">
                    {subcategory}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-gray-400 text-sm mr-2">{time}</div>
          <div
            className={`${ratingColor} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm`}
          >
            {(rating > maxRating ? maxRating : rating).toFixed(1)}
          </div>
        </div>
      </div>

      {image && (
        <div className="mb-3 rounded-lg overflow-hidden">
          <Image
            src={`/placeholder.svg?height=300&width=500&text=${encodeURIComponent(product)}`}
            alt={`${product} product image`}
            width={500}
            height={300}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="text-gray-800 mb-3">{content}</div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button
            className="flex items-center text-gray-500"
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Like post"
          >
            <Heart size={20} className={`mr-1 ${isLiked ? "fill-indigo-500 text-indigo-500" : ""}`} />
            {likes > 0 && <span>{likes}</span>}
          </button>
          <button
            className="flex items-center text-gray-500"
            onClick={() => setShowComments(!showComments)}
            aria-label="Comment on post"
          >
            <MessageCircle size={20} className={`mr-1 ${showComments ? "fill-indigo-500 text-indigo-500" : ""}`} />
            {comments > 0 && <span>{comments}</span>}
          </button>
        </div>
        <button className="text-gray-500" onClick={handleBookmark} aria-label="Save post">
          <Bookmark size={20} className={isBookmarked ? "fill-indigo-500 text-indigo-500" : ""} />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Comments</h4>

          {/* Comments List */}
          <div className="space-y-4 mb-4">
            {sortedComments.length > 0 ? (
              sortedComments.map((comment) => (
                <div key={comment.id} className="flex items-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <Image
                      src={comment.avatar || "/placeholder.svg"}
                      alt={comment.username}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-2 pb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{comment.username}</span>
                        <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm text-gray-800">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">No comments yet. Be the first to comment!</p>
            )}
          </div>

          {/* Add Comment Input */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Your avatar"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex items-center">
              <Input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-gray-50 border-gray-200 focus:ring-indigo-500 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment()
                  }
                }}
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={handleAddComment}
                disabled={newComment.trim() === ""}
                className="ml-2 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

