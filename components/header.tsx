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
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full bg-white">
          <SheetHeader className="px-4 py-3 border-b bg-black text-white">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-semibold text-white">Your Cart</SheetTitle>
              <SheetClose className="rounded-full hover:bg-gray-800 p-2 text-white">
                <X size={20} />
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 flex border-b border-gray-100">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src="/placeholder.svg"
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover"
                        priority
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
                  className="w-full py-6 bg-black hover:bg-gray-800 flex items-center justify-center"
                  onClick={() => alert("Apple Pay checkout would open here")}
                >
                  <span className="text-white">Apple Pay</span>
                </Button>

                <Button
                  className="w-full py-6 bg-white text-black border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                  onClick={() => alert("Google Pay checkout would open here")}
                >
                  <span>Google Pay</span>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

