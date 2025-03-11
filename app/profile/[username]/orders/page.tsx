"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Package, ArrowRight, Box } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for orders
const mockOrders = {
  active: [
    {
      id: "1",
      carrier: "USPS",
      trackingNumber: "9400100000000000000000",
      status: "In Transit",
      progress: 65,
      estimatedDelivery: "Mar 12-13",
      product: {
        name: "Nike Air Force 1",
        image: "/placeholder.svg?height=80&width=80",
        price: 115.0,
      },
    },
    {
      id: "2",
      carrier: "USPS",
      trackingNumber: "9400100000000000000001",
      status: "Out for Delivery",
      progress: 90,
      estimatedDelivery: "Mar 11",
      product: {
        name: "Nike x Tiffany Dunks",
        image: "/placeholder.svg?height=80&width=80",
        price: 225.0,
      },
    },
  ],
  history: [
    {
      id: "3",
      carrier: "USPS",
      deliveredDate: "Mar 8",
      product: {
        name: "Jordan 4 Retro",
        image: "/placeholder.svg?height=80&width=80",
        price: 190.0,
      },
    },
    {
      id: "4",
      carrier: "USPS",
      deliveredDate: "Feb 25",
      product: {
        name: "Nike Dunk Low",
        image: "/placeholder.svg?height=80&width=80",
        price: 110.0,
      },
    },
  ],
  buyAgain: [
    {
      id: "5",
      name: "Nike Air Force 1",
      image: "/placeholder.svg?height=200&width=200",
      price: 115.0,
    },
    {
      id: "6",
      name: "Nike x Tiffany Dunks",
      image: "/placeholder.svg?height=200&width=200",
      price: 225.0,
    },
    {
      id: "7",
      name: "Jordan 4 Retro",
      image: "/placeholder.svg?height=200&width=200",
      price: 190.0,
    },
  ],
}

export default function OrdersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("tracking")

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-black text-white">
        <button onClick={() => router.back()} className="text-white mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Orders</h1>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="tracking" className="flex-1">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 gap-1">
          <TabsTrigger
            value="tracking"
            className="data-[state=active]:bg-white rounded-lg"
            onClick={() => setActiveTab("tracking")}
          >
            Active Orders
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-white rounded-lg"
            onClick={() => setActiveTab("history")}
          >
            Order History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="flex-1 p-4 space-y-4">
          {/* Active Orders */}
          {mockOrders.active.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <Package className="text-indigo-500" size={20} />
                    <span className="font-medium">{order.carrier}</span>
                  </div>
                  <p className="text-2xl font-semibold mt-1">{order.status}</p>
                  <p className="text-gray-500">Arrives {order.estimatedDelivery}</p>
                </div>
                <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={order.product.image || "/placeholder.svg"}
                    alt={order.product.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative pt-4">
                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                  <div
                    style={{ width: `${order.progress}%` }}
                    className="bg-indigo-500 rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              <button
                onClick={() => router.push(`/tracking/${order.trackingNumber}`)}
                className="w-full py-2 text-indigo-500 font-medium hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Track Package
              </button>
            </div>
          ))}

          {/* Buy Again Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Buy Again</h2>
              <button className="text-indigo-500 flex items-center">
                View All
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="flex overflow-x-auto space-x-4 no-scrollbar pb-4">
              {mockOrders.buyAgain.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-40">
                  <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 relative group">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={160}
                      height={160}
                      className="object-cover"
                    />
                    <button
                      onClick={() => router.push(`/product/${item.id}`)}
                      className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center"
                    >
                      <span className="bg-white text-black rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-200">
                        <Package size={16} />
                      </span>
                    </button>
                  </div>
                  <h3 className="font-medium text-sm truncate">{item.name}</h3>
                  <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="p-4">
          <div className="space-y-4">
            {mockOrders.history.map((order) => (
              <div key={order.id} className="flex items-center space-x-4 p-4 border rounded-xl">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Box className="text-indigo-500" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{order.product.name}</p>
                      <p className="text-gray-500 text-sm">
                        Delivered {order.deliveredDate} • {order.carrier}
                      </p>
                    </div>
                    <button
                      onClick={() => router.push(`/product/${order.id}`)}
                      className="text-indigo-500 text-sm hover:underline"
                    >
                      Buy Again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

