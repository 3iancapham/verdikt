"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import PostCard from "@/components/post-card"
import BottomNavigation from "@/components/bottom-navigation"

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

// Mock data for topics
const topicData: Record<
  string,
  {
    title: string
    posts: TopicPost[]
    memberCount: number
    description?: string
  }
> = {
  netflix: {
    title: "Netflix",
    memberCount: 15243,
    description: "Discuss the latest shows, movies, and Netflix originals. Share recommendations and reviews.",
    posts: [
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
  },
  pilates: {
    title: "Pilates",
    memberCount: 8752,
    description: "Connect with Pilates enthusiasts. Share your favorite studios, instructors, and equipment.",
    posts: [
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
  },
  sneakers: {
    title: "Sneakers",
    memberCount: 24891,
    description:
      "The ultimate community for sneakerheads. Discuss releases, share your collection, and find the best deals.",
    posts: [
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
  },
  "lupes-tacos": {
    title: "Lupe's Tacos",
    memberCount: 3421,
    description: "The best taco spot in town. Share your favorite menu items, experiences, and food pics!",
    posts: [
      {
        id: 1,
        avatar: "/placeholder.svg?height=40&width=40",
        username: "Maria Rodriguez",
        time: "1 hour ago",
        product: "Lupe's Tacos",
        content: "The carnitas tacos are absolutely incredible. Best I've had in the city!",
        image: "/placeholder.svg?height=300&width=500",
        likes: 87,
        comments: 32,
      },
      {
        id: 2,
        avatar: "/placeholder.svg?height=40&width=40",
        username: "Carlos Mendez",
        time: "3 hours ago",
        product: "Lupe's Tacos",
        content: "Has anyone tried their new birria tacos? Worth the hype?",
        likes: 45,
        comments: 23,
      },
    ],
  },
  "apple-vision-pro": {
    title: "Apple Vision Pro",
    memberCount: 9876,
    description:
      "Discuss the revolutionary spatial computing device from Apple. Share experiences, apps, and use cases.",
    posts: [
      {
        id: 1,
        avatar: "/placeholder.svg?height=40&width=40",
        username: "Mike Johnson",
        time: "1 day ago",
        product: "Apple Vision Pro",
        content: "Finally got my hands on the Vision Pro. Mind = blown. The spatial computing is next level!",
        image: "/placeholder.svg?height=300&width=500",
        likes: 231,
        comments: 87,
      },
      {
        id: 2,
        avatar: "/placeholder.svg?height=40&width=40",
        username: "Sarah Kim",
        time: "2 days ago",
        product: "Apple Vision Pro",
        content: "What apps are you all using on Vision Pro? Looking for recommendations!",
        likes: 156,
        comments: 64,
      },
    ],
  },
  "nike-air-max": {
    title: "Nike Air Max",
    memberCount: 15678,
    description: "All about Nike Air Max sneakers. Discuss releases, colorways, and your collection.",
    posts: [
      {
        id: 1,
        avatar: "/placeholder.svg?height=40&width=40",
        username: "Marcus Williams",
        time: "5 hours ago",
        product: "Nike Air Max 90",
        content: "Just copped the new Air Max 90 'Infrared'. Classic colorway that never gets old!",
        image: "/placeholder.svg?height=300&width=500",
        likes: 189,
        comments: 42,
      },
      {
        id: 2,
        avatar: "/placeholder.svg?height=40&width=40",
        username: "Jessica Lee",
        time: "1 day ago",
        product: "Nike Air Max 1",
        content: "Air Max Day is coming up! What releases are you all excited about?",
        likes: 134,
        comments: 56,
      },
    ],
  },
  "legend-of-zelda": {
    title: "Legend of Zelda",
    memberCount: 28943,
    description: "For fans of the Legend of Zelda series. Discuss games, strategies, and theories.",
    posts: [
      {
        id: 1,
        avatar: "/placeholder.svg?height=40&width=40",
        username: "Link Hyrule",
        time: "2 days ago",
        product: "Tears of the Kingdom",
        content: "Just finished all the shrines in TOTK. The physics engine in this game is incredible!",
        image: "/placeholder.svg?height=300&width=500",
        likes: 342,
        comments: 87,
      },
    ],
  },
  "stranger-things": {
    title: "Stranger Things",
    memberCount: 19876,
    description:
      "Discuss the hit Netflix series Stranger Things. Share theories, favorite moments, and season 5 predictions.",
    posts: [
      {
        id: 1,
        avatar: "/placeholder.svg?height=40&width=40",
        username: "Eleven Fan",
        time: "1 day ago",
        product: "Stranger Things S5",
        content: "The teaser for season 5 just dropped! What do you think will happen to the gang?",
        image: "/placeholder.svg?height=300&width=500",
        likes: 276,
        comments: 124,
      },
    ],
  },
  "amc-theaters": {
    title: "AMC Theaters",
    memberCount: 7654,
    description: "Discuss AMC Theaters, movie experiences, and upcoming releases.",
    posts: [
      {
        id: 1,
        avatar: "/placeholder.svg?height=40&width=40",
        username: "Movie Buff",
        time: "3 hours ago",
        product: "AMC A-List",
        content: "Is the A-List membership worth it if you watch 2-3 movies a month?",
        likes: 87,
        comments: 45,
      },
    ],
  },
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [isJoined, setIsJoined] = useState(false)
  const [joinedTopics, setJoinedTopics] = useState<string[]>([])
  const topic = topicData[params.slug]

  // Load joined topics from localStorage on component mount
  useEffect(() => {
    const storedTopics = localStorage.getItem("joinedCamps")
    if (storedTopics) {
      const topics = JSON.parse(storedTopics)
      setJoinedTopics(topics)
      setIsJoined(topics.includes(params.slug))
    }
  }, [params.slug])

  // Handle joining/leaving a topic
  const toggleJoin = () => {
    const newJoinedState = !isJoined
    setIsJoined(newJoinedState)

    let updatedTopics = [...joinedTopics]
    if (newJoinedState) {
      // Join the topic
      if (!updatedTopics.includes(params.slug)) {
        updatedTopics.push(params.slug)
      }
    } else {
      // Leave the topic
      updatedTopics = updatedTopics.filter((topic) => topic !== params.slug)
    }

    setJoinedTopics(updatedTopics)
    localStorage.setItem("joinedCamps", JSON.stringify(updatedTopics))
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
        {topic.posts.map((post) => (
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

