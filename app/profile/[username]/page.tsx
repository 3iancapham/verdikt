"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, Users, Heart, Package, Bookmark } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from "@/components/post-card"
import BottomNavigation from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"

// Mock data for profiles
const profileData: Record<
  string,
  {
    username: string
    avatar: string
    reviewCount: number
    cloutScore: number
    topics: Array<{ id: number; name: string; slug: string }>
    following: number
    followers: number
    reviews: Array<{
      id: number
      product: string
      rating: number
      content: string
      image?: string
      likes: number
      comments: number
      time: string
    }>
    orderCount: number
  }
> = {
  "jay-russo": {
    username: "Jay Russo",
    avatar: "/placeholder.svg?height=80&width=80",
    reviewCount: 42,
    cloutScore: 8.7,
    topics: [
      { id: 1, name: "Sneakerheads", slug: "sneakers" },
      { id: 2, name: "Streetwear", slug: "streetwear" },
      { id: 3, name: "Nike Collectors", slug: "nike" },
    ],
    following: 156,
    followers: 423,
    reviews: [
      {
        id: 1,
        product: "Nike Air Force 1",
        rating: 4.4,
        content: "Just got my first pair of Nike Air Force 1s. So fresh and comfyyy",
        image: "/placeholder.svg?height=300&width=500",
        likes: 124,
        comments: 124,
        time: "4 min ago",
      },
      {
        id: 2,
        product: "Jordan 4 Retro",
        rating: 4.8,
        content: "These are absolute fire! Worth every penny.",
        likes: 89,
        comments: 32,
        time: "2 days ago",
      },
    ],
    orderCount: 12,
  },
  "jess-eagan": {
    username: "Jess Eagan",
    avatar: "/placeholder.svg?height=80&width=80",
    reviewCount: 27,
    cloutScore: 7.2,
    topics: [
      { id: 1, name: "Sneakerheads", slug: "sneakers" },
      { id: 4, name: "Fashion", slug: "fashion" },
      { id: 5, name: "Limited Editions", slug: "limited-editions" },
    ],
    following: 98,
    followers: 215,
    reviews: [
      {
        id: 1,
        product: "Nike x Tiffany Dunks",
        rating: 2.3,
        content: "Anyone buy the new Tiffany dunks? Wondering if it's worth it! Would love to hear it all.",
        likes: 45,
        comments: 67,
        time: "4 min ago",
      },
    ],
    orderCount: 5,
  },
  "antony-giulio": {
    username: "Antony Giulio",
    avatar: "/placeholder.svg?height=80&width=80",
    reviewCount: 63,
    cloutScore: 9.1,
    topics: [
      { id: 6, name: "Netflix", slug: "netflix" },
      { id: 7, name: "Streaming", slug: "streaming" },
      { id: 8, name: "TV Shows", slug: "tv-shows" },
    ],
    following: 312,
    followers: 1204,
    reviews: [
      {
        id: 1,
        product: "Netflix Subscription",
        rating: 4.5,
        content: "Anyone see the sneak peek teaser of season 5!? Guys I can NOT waittttt!!",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-11%20at%2011.43.55%E2%80%AFAM-U3iYBEJ7jDlFuFuHUkbT0ayh8qex6t.png",
        likes: 124,
        comments: 124,
        time: "4 min ago",
      },
    ],
    orderCount: 22,
  },
  "current-user": {
    username: "Current User",
    avatar: "/placeholder.svg?height=80&width=80",
    reviewCount: 35,
    cloutScore: 7.9,
    topics: [
      { id: 1, name: "Sneakerheads", slug: "sneakers" },
      { id: 6, name: "Netflix", slug: "netflix" },
      { id: 9, name: "Tech Gadgets", slug: "tech-gadgets" },
    ],
    following: 178,
    followers: 245,
    reviews: [
      {
        id: 1,
        product: "Apple Vision Pro",
        rating: 4.7,
        content: "This is a game changer! The spatial computing experience is unlike anything I've tried before.",
        image: "/placeholder.svg?height=300&width=500",
        likes: 87,
        comments: 42,
        time: "1 day ago",
      },
      {
        id: 2,
        product: "Nike Dunk Low",
        rating: 4.2,
        content: "Clean design and super comfortable. Goes with everything in my wardrobe.",
        image: "/placeholder.svg?height=300&width=500",
        likes: 56,
        comments: 18,
        time: "3 days ago",
      },
    ],
    orderCount: 8,
  },
}

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("reviews")
  const [joinedTopics, setJoinedTopics] = useState<string[]>([])
  const [savedPosts, setSavedPosts] = useState<any[]>([])

  // Convert URL-friendly username to lookup key
  const { username } = use(params)
  const profileKey = username.toLowerCase()
  const profile = Object.values(profileData).find(
    (p) =>
      p.username.toLowerCase().replace(/\s+/g, "-") === profileKey ||
      (profileKey === "current-user" && p.username.toLowerCase().replace(/\s+/g, "-") === "current-user"),
  )

  // Load joined topics from localStorage on component mount
  useEffect(() => {
    const storedTopics = localStorage.getItem("joinedTopics")
    if (storedTopics) {
      setJoinedTopics(JSON.parse(storedTopics))
    }

    // Load saved posts
    const savedPostsData = localStorage.getItem("savedPosts")
    if (savedPostsData) {
      const posts = JSON.parse(savedPostsData)
      setSavedPosts(posts)
    }
  }, [])

  if (!profile) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex items-center p-4 border-b">
          <button onClick={() => router.back()} className="text-gray-600 mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
              <Users size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">User not found</h3>
            <p className="text-gray-500 mb-4">The profile you're looking for doesn't exist or has been removed.</p>
            <button onClick={() => router.push("/explore")} className="text-indigo-500 font-medium">
              Explore topics instead
            </button>
          </div>
        </div>
        <BottomNavigation />
      </div>
    )
  }

  // Determine if this is the current user's profile
  const isCurrentUser = profileKey === "current-user"

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={() => router.back()} className="text-gray-600 mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">{isCurrentUser ? "My Profile" : "Profile"}</h1>
      </div>

      {/* Profile Info */}
      <div className="p-4 border-b">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
            <Image
              src={profile.avatar || "/placeholder.svg"}
              alt={profile.username}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile.username}</h2>
            <div className="flex items-center mt-1 space-x-4">
              <div className="flex items-center">
                <span className="font-medium">{profile.following}</span>
                <span className="text-gray-500 text-sm ml-1">Following</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">{profile.followers}</span>
                <span className="text-gray-500 text-sm ml-1">Followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex justify-center mb-1 text-indigo-500">
              <Star size={20} />
            </div>
            <div className="text-lg font-bold">{profile.reviewCount}</div>
            <div className="text-xs text-gray-500">Reviews</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex justify-center mb-1 text-indigo-500">
              <Users size={20} />
            </div>
            <div className="text-lg font-bold">{profile.cloutScore}</div>
            <div className="text-xs text-gray-500">Clout Score</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex justify-center mb-1 text-indigo-500">
              <Package size={20} />
            </div>
            <button
              onClick={() => router.push(`/profile/${username}/orders`)}
              className="text-lg font-bold hover:text-indigo-500 transition-colors"
            >
              {profile.orderCount || 0}
            </button>
            <div className="text-xs text-gray-500">Orders</div>
          </div>
        </div>

        {/* Topics */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Following Topics</h3>
          <div className="flex flex-wrap gap-2">
            {profile.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => router.push(`/topic/${topic.slug}`)}
                className={`px-3 py-1 rounded-full text-sm ${
                  joinedTopics.includes(topic.slug) ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-600"
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="reviews" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 border-b rounded-none bg-white h-12">
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:shadow-none rounded-none"
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:shadow-none rounded-none"
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </TabsTrigger>
          <TabsTrigger
            value="likes"
            className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:shadow-none rounded-none"
            onClick={() => setActiveTab("likes")}
          >
            Likes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="flex-1 overflow-y-auto pb-16 m-0">
          {profile.reviews.map((review) => (
            <PostCard
              key={review.id}
              avatar={profile.avatar}
              username={profile.username}
              time={review.time}
              product={review.product}
              rating={review.rating}
              ratingColor="bg-green-400"
              image={review.image}
              likes={review.likes}
              comments={review.comments}
              content={review.content}
            />
          ))}
        </TabsContent>
        <TabsContent value="saved" className="flex-1 overflow-y-auto pb-16 m-0">
          {savedPosts && savedPosts.length > 0 ? (
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
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <Bookmark size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No saved items yet</h3>
              <p className="text-gray-500 mb-4">Items you save will appear here.</p>
              <Button onClick={() => router.push("/explore")} variant="outline">
                Browse Items
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="likes" className="flex-1 flex items-center justify-center pb-16 m-0">
          <div className="text-center p-8">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No liked posts yet</p>
          </div>
        </TabsContent>
      </Tabs>

      <BottomNavigation />
    </div>
  )
}

