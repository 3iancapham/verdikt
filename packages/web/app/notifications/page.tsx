"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell, BellOff } from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "like",
    username: "Jay Russo",
    content: "liked your review of Nike Air Force 1",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    username: "Sarah Kim",
    content: "commented on your review: \"I've been thinking about getting these! How's the comfort level?\"",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    username: "Mike Johnson",
    content: "started following you",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "mention",
    username: "Alex Rodriguez",
    content: "mentioned you in a comment",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "product",
    username: "Nike",
    content: "just released a new product you might be interested in",
    time: "2 days ago",
    read: true,
  },
]

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  // Filter notifications based on read status
  const filteredNotifications = showUnreadOnly ? notifications.filter((n) => !n.read) : notifications

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-black text-white">
        <button onClick={() => router.back()} className="text-white">
          <ArrowLeft size={24} />
        </button>
        <div className="text-xl font-semibold">Notifications</div>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-16">
        {/* Notification Controls */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <Bell size={18} className="text-indigo-500 mr-2" />
            <span className="font-medium">{unreadCount > 0 ? `${unreadCount} unread` : "No unread notifications"}</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={showUnreadOnly ? "bg-indigo-50 text-indigo-500" : ""}
            >
              {showUnreadOnly ? "Show All" : "Unread Only"}
            </Button>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="divide-y">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${!notification.read ? "bg-indigo-50" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium">{notification.username}</p>
                    <p className="text-gray-600">{notification.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 p-8 text-center">
            <BellOff size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No notifications</h3>
            <p className="text-gray-500">
              {showUnreadOnly
                ? "You don't have any unread notifications."
                : "When you get notifications, they'll appear here."}
            </p>
            {showUnreadOnly && (
              <Button variant="outline" className="mt-4" onClick={() => setShowUnreadOnly(false)}>
                Show All Notifications
              </Button>
            )}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}

