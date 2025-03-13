"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Package, MapPin, Truck } from "lucide-react"
import { use } from "react"

// Mock tracking data
const mockTrackingData = {
  "9400100000000000000000": {
    carrier: "USPS",
    status: "In Transit",
    estimatedDelivery: "Mar 12-13",
    origin: "Los Angeles, CA",
    destination: "New York, NY",
    updates: [
      {
        date: "Mar 11, 2025",
        time: "3:42 PM",
        location: "Jersey City, NJ",
        status: "Arrived at USPS Regional Facility",
      },
      {
        date: "Mar 10, 2025",
        time: "8:15 AM",
        location: "Chicago, IL",
        status: "Departed USPS Regional Facility",
      },
      {
        date: "Mar 9, 2025",
        time: "2:30 PM",
        location: "Los Angeles, CA",
        status: "Accepted at USPS Origin Facility",
      },
    ],
  },
  "9400100000000000000001": {
    carrier: "USPS",
    status: "Out for Delivery",
    estimatedDelivery: "Mar 11",
    origin: "Miami, FL",
    destination: "Boston, MA",
    updates: [
      {
        date: "Mar 11, 2025",
        time: "7:30 AM",
        location: "Boston, MA",
        status: "Out for Delivery",
      },
      {
        date: "Mar 10, 2025",
        time: "9:45 PM",
        location: "Boston, MA",
        status: "Arrived at Post Office",
      },
      {
        date: "Mar 9, 2025",
        time: "11:20 AM",
        location: "Miami, FL",
        status: "Accepted at USPS Origin Facility",
      },
    ],
  },
}

export default function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const tracking = mockTrackingData[id as keyof typeof mockTrackingData]

  if (!tracking) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex items-center p-4 border-b bg-black text-white">
          <button onClick={() => router.back()} className="text-white mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Tracking Details</h1>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <p className="text-gray-500">Tracking information not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-black text-white">
        <button onClick={() => router.back()} className="text-white mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Tracking Details</h1>
      </div>

      {/* Status Card */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Package className="text-indigo-500" size={20} />
              <span className="font-medium">{tracking.carrier}</span>
            </div>
            <h2 className="text-2xl font-semibold mt-1">{tracking.status}</h2>
            <p className="text-gray-500">Estimated delivery: {tracking.estimatedDelivery}</p>
          </div>
        </div>

        {/* Shipping Route */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span>{tracking.origin}</span>
          </div>
          <Truck size={16} className="text-indigo-500 mx-4" />
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span>{tracking.destination}</span>
          </div>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
        <div className="space-y-6">
          {tracking.updates.map((update, index) => (
            <div key={index} className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className={`w-4 h-4 rounded-full ${index === 0 ? "bg-indigo-500" : "bg-gray-200"}`} />
                {index !== tracking.updates.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{update.status}</p>
                    <p className="text-gray-500">{update.location}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{update.date}</p>
                    <p>{update.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

