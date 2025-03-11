"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, X, Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Nike Air Force 1",
    price: 115.0,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 1,
    size: "M 10 / W 11.5",
    color: "Crocodile Gray",
  },
  {
    id: 2,
    name: "Nike x Tiffany Dunks",
    price: 225.0,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 1,
    size: "M 9 / W 10.5",
    color: "Tiffany Blue",
  },
]

export default function Header() {
  const router = useRouter()
  const [cartOpen, setCartOpen] = useState(false)

  // Add state for cart items
  const [cartItems, setCartItems] = useState(initialCartItems)

  // Function to update item quantity
  const updateItemQuantity = (itemId: number, newQuantity: number) => {
    const updatedItems = cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    setCartItems(updatedItems)
  }

  // Function to remove item from cart
  const removeItem = (itemId: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedItems)
  }

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.0825 // 8.25% tax
  const total = subtotal + tax

  return (
    <div className="flex justify-between items-center px-4 py-3 border-b bg-black text-white">
      {/* Notification Bell */}
      <button
        onClick={() => router.push("/notifications")}
        className="text-white hover:text-indigo-300 transition-colors"
        aria-label="View notifications"
      >
        <Bell size={24} />
      </button>

      {/* Logo */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 4L24 20H4L14 4Z" fill="#6366F1" />
            <path d="M14 10L19 20H9L14 10Z" fill="#818CF8" />
          </svg>
        </div>
        <div className="text-white text-sm font-medium">verdikt</div>
      </div>

      {/* Cart */}
      <button
        onClick={() => setCartOpen(true)}
        className="text-indigo-300 hover:text-indigo-200 transition-colors relative"
        aria-label="Open shopping cart"
      >
        <ShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full">
          <SheetHeader className="px-4 py-3 border-b bg-black text-white">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-semibold text-white">Your Cart</SheetTitle>
              <SheetClose className="rounded-full hover:bg-gray-800 p-1 text-white">
                <X size={20} />
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {cartItems.length > 0 ? (
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 flex">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.size} • {item.color}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                            onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                        <button
                          className="ml-2 text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingCart size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Looks like you haven't added any products yet.</p>
                <Button onClick={() => router.push("/explore")}>Start Shopping</Button>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full py-6 bg-black hover:bg-gray-800 flex items-center justify-center space-x-2"
                  onClick={() => alert("Apple Pay checkout would open here")}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.0996 5.6C17.6996 4.9 18.0996 3.9 17.9996 3C17.0996 3.1 15.9996 3.6 15.3996 4.3C14.7996 4.9 14.3996 5.9 14.4996 6.8C15.4996 6.8 16.4996 6.3 17.0996 5.6ZM19.9996 12.6C19.9996 9.8 22.0996 8.9 22.1996 8.9C22.1996 8.9 21.7996 7.5 20.7996 6.7C19.7996 5.8 18.7996 5.8 18.3996 5.8C16.9996 5.7 15.6996 6.7 14.9996 6.7C14.2996 6.7 13.1996 5.8 12.0996 5.8C10.5996 5.8 9.19961 6.7 8.39961 8.1C6.89961 10.7 7.99961 14.5 9.49961 16.7C10.1996 17.7 11.0996 18.9 12.1996 18.9C13.2996 18.9 13.6996 18.2 14.9996 18.2C16.2996 18.2 16.6996 18.9 17.7996 18.9C18.8996 18.9 19.6996 17.8 20.3996 16.8C20.9996 16 21.2996 15.2 21.2996 15.1C21.2996 15.1 19.9996 14.6 19.9996 12.6Z"
                      fill="white"
                    />
                  </svg>
                  <span>Pay</span>
                </Button>

                <Button
                  className="w-full py-6 bg-white text-black border border-gray-300 hover:bg-gray-50 flex items-center justify-center space-x-2"
                  onClick={() => alert("Google Pay checkout would open here")}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.545 10.239v3.821h5.5c-0.251 1.516-1.045 2.771-2.296 3.571l3.498 2.696c2.022-1.893 3.137-4.618 3.137-7.838 0-0.654-0.089-1.359-0.25-2.001l-9.589-0.25zM5.938 14.605l-0.979 0.763-3.475 2.696c2.179 4.392 6.698 7.429 11.896 7.429 3.591 0 6.612-1.179 8.83-3.404l-3.498-2.696c-0.955 0.639-2.296 1.107-3.771 1.107-2.903 0-5.391-1.893-6.294-4.475l-6.707-1.42zM5.938 9.884c-0.341-1.107-0.341-2.214 0-3.321v-1.42l-4.454-3.459c-1.886 3.759-1.886 8.107 0 11.866l4.454-3.666zM12.545 4.837c1.932-0.048 3.752 0.715 5.161 2.001l3.107-3.035c-2.386-2.259-5.617-3.571-9.089-3.404-5.198 0-9.717 3.035-11.896 7.429l4.454 3.459c0.903-2.582 3.39-4.475 6.294-4.475l1.968 0.025z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.545 4.837v0c1.932-0.048 3.752 0.715 5.161 2.001l3.107-3.035c-2.386-2.259-5.617-3.571-9.089-3.404-5.198 0-9.717 3.035-11.896 7.429l4.454 3.459c0.903-2.582 3.39-4.475 6.294-4.475"
                      fill="#EA4335"
                    />
                    <path
                      d="M5.938 14.605c-0.341-1.107-0.341-2.214 0-3.321v-1.42l-4.454-3.459c-1.886 3.759-1.886 8.107 0 11.866l4.454-3.666z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.545 19.5c3.591 0 6.612-1.179 8.83-3.404l-3.498-2.696c-0.955 0.639-2.296 1.107-3.771 1.107-2.903 0-5.391-1.893-6.294-4.475l-6.707-1.42c2.179 4.392 6.698 7.429 11.896 7.429z"
                      fill="#34A853"
                    />
                    <path
                      d="M18.045 14.06l3.498 2.696c2.022-1.893 3.137-4.618 3.137-7.838 0-0.654-0.089-1.359-0.25-2.001l-9.589-0.25v3.821h5.5c-0.251 1.516-1.045 2.771-2.296 3.571z"
                      fill="#4285F4"
                    />
                  </svg>
                  <span>Pay</span>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

