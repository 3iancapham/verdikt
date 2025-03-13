import { useRouter } from "next/navigation"
import BottomNavigation from "@/components/bottom-navigation"
import RecommendationCard from "@/components/recommendation-card"

export default function ExplorePage() {
  const trendingTopics = [
    {
      id: 1,
      title: "Netflix",
      slug: "netflix",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["15,243 members", "High activity"],
    },
    {
      id: 2,
      title: "Pilates",
      slug: "pilates",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["8,752 members", "Growing community"],
    },
    {
      id: 3,
      title: "Festivals",
      slug: "festivals",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["18,432 members", "Upcoming events"],
    },
    {
      id: 4,
      title: "Podcasts",
      slug: "podcasts",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["12,543 members", "New episodes daily"],
    },
    {
      id: 5,
      title: "Books",
      slug: "books",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["22,187 members", "Active discussions"],
    },
  ]

  const justForYou = [
    {
      id: 1,
      title: "Lupe's Tacos",
      slug: "lupes-tacos",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["150+ people talking", "50+ reservations made"],
    },
    {
      id: 2,
      title: "Apple Vision Pro",
      slug: "apple-vision-pro",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["3000+ people talking", "1545 purchases made"],
    },
    {
      id: 3,
      title: "Nike Air Max",
      slug: "nike-air-max",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["900+ people talking", "3675 purchases made"],
    },
  ]

  const popularAmongFriends = [
    {
      id: 1,
      title: "Legend of Zelda",
      slug: "legend-of-zelda",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["5 friends playing", "20+ hours played"],
    },
    {
      id: 2,
      title: "Stranger Things S5",
      slug: "stranger-things",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["12 friends watching", "89% match"],
    },
    {
      id: 3,
      title: "AMC Theaters",
      slug: "amc-theaters",
      image: "/placeholder.svg?height=200&width=300",
      stats: ["3 friends nearby", "Now showing"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 overflow-y-auto pb-16">
        <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-6 sm:space-y-8">
          {/* Trending Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Trending</h2>
            <div className="flex overflow-x-auto space-x-3 sm:space-x-4 pb-3 sm:pb-4 no-scrollbar">
              {trendingTopics.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-[200px] sm:w-[250px]">
                  <RecommendationCard title={item.title} image={item.image} stats={item.stats} slug={item.slug} />
                </div>
              ))}
            </div>
          </section>

          {/* Just For You Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Just For You</h2>
            <div className="flex overflow-x-auto space-x-3 sm:space-x-4 pb-3 sm:pb-4 no-scrollbar">
              {justForYou.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-[200px] sm:w-[250px]">
                  <RecommendationCard title={item.title} image={item.image} stats={item.stats} slug={item.slug} />
                </div>
              ))}
            </div>
          </section>

          {/* Popular amongst Friends Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Popular amongst Friends</h2>
            <div className="flex overflow-x-auto space-x-3 sm:space-x-4 pb-3 sm:pb-4 no-scrollbar">
              {popularAmongFriends.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-[200px] sm:w-[250px]">
                  <RecommendationCard title={item.title} image={item.image} stats={item.stats} slug={item.slug} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <BottomNavigation activeTab="explore" />
    </div>
  )
}

