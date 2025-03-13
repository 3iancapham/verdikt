"use client"

import { Home, Search, PlusCircle, Grid, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

interface BottomNavigationProps {
  activeTab?: string
}

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Determine the active tab
  let currentTab = activeTab
  if (!currentTab) {
    if (pathname === "/") currentTab = "home"
    else if (pathname === "/explore") currentTab = "explore"
    else if (pathname === "/topics") currentTab = "topics"
    else if (pathname.startsWith("/profile/")) currentTab = "profile"
    else if (pathname.startsWith("/topic/")) currentTab = "explore"
    else currentTab = ""
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-6 py-3 bg-black text-white z-10">
      <button
        onClick={() => router.push("/")}
        className={`flex flex-col items-center ${currentTab === "home" ? "text-indigo-500" : "text-gray-400"}`}
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </button>

      <button
        onClick={() => router.push("/explore")}
        className={`flex flex-col items-center ${currentTab === "explore" ? "text-indigo-500" : "text-gray-400"}`}
      >
        <Search size={24} />
        <span className="text-xs mt-1">Explore</span>
      </button>

      <button
        onClick={() => router.push("/create")}
        className={`flex flex-col items-center ${currentTab === "create" ? "text-indigo-500" : "text-gray-400"}`}
      >
        <div className="bg-indigo-500 rounded-full p-2 mb-1">
          <PlusCircle size={20} className="text-white" />
        </div>
        <span className="text-xs mt-1">Create</span>
      </button>

      <button
        onClick={() => router.push("/topics")}
        className={`flex flex-col items-center ${currentTab === "topics" ? "text-indigo-500" : "text-gray-400"}`}
      >
        <Grid size={24} />
        <span className="text-xs mt-1">Topics</span>
      </button>

      <button
        onClick={() => router.push("/profile/current-user")}
        className={`flex flex-col items-center ${currentTab === "profile" ? "text-indigo-500" : "text-gray-400"}`}
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </button>
    </div>
  )
}

