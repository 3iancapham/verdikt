"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const sizes = [
  "M 8 / W 9.5",
  "M 8.5 / W 10",
  "M 9 / W 10.5",
  "M 9.5 / W 11",
  "M 10 / W 11.5",
  "M 10.5 / W 12",
  "M 11 / W 12.5",
  "M 11.5 / W 13",
]

const colors = ["White", "Black", "Crocodile Gray", "Triple White", "Triple Black"]

// Mock product images for the slideshow
const productImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-11%20at%2011.30.33%E2%80%AFAM-c2F2Tc5oGZQ9811gMQaLfElQg3NNTt.png",
    alt: "Nike Air Force 1 - Front View",
  },
  {
    src: "/placeholder.svg?height=500&width=500&text=Side%20View",
    alt: "Nike Air Force 1 - Side View",
  },
  {
    src: "/placeholder.svg?height=500&width=500&text=Back%20View",
    alt: "Nike Air Force 1 - Back View",
  },
  {
    src: "/placeholder.svg?height=500&width=500&text=Top%20View",
    alt: "Nike Air Force 1 - Top View",
  },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState("M 10 / W 11.5")
  const [selectedColor, setSelectedColor] = useState("Crocodile Gray")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Handle image navigation
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === productImages.length - 1 ? 0 : prevIndex + 1))
  }

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? productImages.length - 1 : prevIndex - 1))
  }

  // Handle swipe events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX
    document.documentElement.style.setProperty("--touch-start-x", `${touchDown}px`)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!document.documentElement.style.getPropertyValue("--touch-start-x")) return

    const touchDown = Number.parseFloat(document.documentElement.style.getPropertyValue("--touch-start-x"))
    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    // If swiped left (diff > 50), go to next image
    // If swiped right (diff < -50), go to previous image
    if (diff > 50) {
      goToNextImage()
      document.documentElement.style.removeProperty("--touch-start-x")
    } else if (diff < -50) {
      goToPrevImage()
      document.documentElement.style.removeProperty("--touch-start-x")
    }
  }

  const handleTouchEnd = () => {
    document.documentElement.style.removeProperty("--touch-start-x")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Product Image Slideshow */}
      <div
        className="relative h-[45vh] bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button onClick={() => router.back()} className="absolute right-3 top-3 z-10 bg-white rounded-full p-1.5 shadow-md">
          <X size={20} />
        </button>

        {/* Navigation buttons */}
        <button
          onClick={goToPrevImage}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1.5 shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={goToNextImage}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1.5 shadow-md"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>

        {/* Current image */}
        <Image
          src={productImages[currentImageIndex].src || "/placeholder.svg"}
          alt={productImages[currentImageIndex].alt}
          fill
          className="object-cover transition-opacity duration-300"
        />

        {/* Image indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="relative flex-1 bg-white px-4 pt-6 sm:px-6">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full" />

        <div className="space-y-4 pb-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Nike Air Force 1</h1>

          <div className="text-lg sm:text-xl">
            $115.00 <span className="text-gray-500 text-sm sm:text-base">+ Delivery & Tax</span>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="size" className="border-b">
              <AccordionTrigger className="py-3">
                <div className="flex justify-between w-full pr-4">
                  <span className="text-base sm:text-lg font-normal">Size</span>
                  <span className="text-gray-500">{selectedSize}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pb-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 px-3 rounded-lg border text-sm sm:text-base ${
                        selectedSize === size ? "border-black bg-black text-white" : "border-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="color" className="border-b">
              <AccordionTrigger className="py-4">
                <div className="flex justify-between w-full pr-6">
                  <span className="text-lg font-normal">Color</span>
                  <span className="text-gray-500">{selectedColor}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pb-4">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-3 px-4 rounded-lg border ${
                        selectedColor === color ? "border-black bg-black text-white" : "border-gray-200"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            className="w-full py-6 text-lg bg-gray-900 hover:bg-gray-800 rounded-xl"
            onClick={() => {
              // Handle add to cart
              console.log("Added to cart:", {
                product: "Nike Air Force 1",
                size: selectedSize,
                color: selectedColor,
              })
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

