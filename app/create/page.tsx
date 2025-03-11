"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Camera, ImageIcon, Lock, Unlock, Plus, X, ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

// Mock data for existing categories and subcategories
const initialCategories = [
  {
    id: 1,
    name: "Nike",
    subcategories: ["Air Force 1", "Dunk Low", "Air Max", "Jordan 4"],
  },
  {
    id: 2,
    name: "Netflix",
    subcategories: ["Stranger Things", "Lift", "Squid Game", "Wednesday"],
  },
  {
    id: 3,
    name: "Pilates",
    subcategories: ["Reformer", "Mat", "Tower", "Chair"],
  },
  {
    id: 4,
    name: "Apple",
    subcategories: ["Vision Pro", "iPhone 15", "MacBook Pro", "AirPods"],
  },
  {
    id: 5,
    name: "Restaurants",
    subcategories: ["Lupe's Tacos", "Sushi Roku", "Nobu", "Carbone"],
  },
]

// Mock data for official products
const officialProducts = [
  { id: 1, name: "Nike Air Force 1", brand: "Nike", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 2, name: "Nike Dunk Low", brand: "Nike", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 3, name: "Nike Air Max 90", brand: "Nike", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 4, name: "Jordan 4 Retro", brand: "Nike", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 5, name: "Stranger Things S5", brand: "Netflix", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 6, name: "Lift", brand: "Netflix", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 7, name: "Squid Game S2", brand: "Netflix", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 8, name: "Wednesday S2", brand: "Netflix", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 9, name: "Reformer Pilates", brand: "Pilates", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 10, name: "Mat Pilates", brand: "Pilates", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 11, name: "Apple Vision Pro", brand: "Apple", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 12, name: "iPhone 15 Pro", brand: "Apple", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 13, name: "MacBook Pro M3", brand: "Apple", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 14, name: "AirPods Pro 2", brand: "Apple", image: "/placeholder.svg?height=40&width=40", verified: true },
  { id: 15, name: "Lupe's Tacos", brand: "Restaurants", image: "/placeholder.svg?height=40&width=40", verified: true },
]

const ratingEmojis = [
  { emoji: "😠", value: 1 },
  { emoji: "🙁", value: 2 },
  { emoji: "😐", value: 3 },
  { emoji: "😊", value: 4 },
  { emoji: "😍", value: 5 },
]

export default function CreateReview() {
  const router = useRouter()
  const [rating, setRating] = useState<number>(0)
  const [content, setContent] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)

  // Refs for file inputs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // Category and subcategory state
  const [categories, setCategories] = useState(initialCategories)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [newSubcategory, setNewSubcategory] = useState("")
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)
  const [showNewSubcategoryInput, setShowNewSubcategoryInput] = useState(false)

  // Product tagging state
  const [productSearchQuery, setProductSearchQuery] = useState("")
  const [productSearchResults, setProductSearchResults] = useState<typeof officialProducts>([])
  const [selectedProduct, setSelectedProduct] = useState<(typeof officialProducts)[0] | null>(null)
  const [productSearchOpen, setProductSearchOpen] = useState(false)

  // Category popover state
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [subcategoryOpen, setSubcategoryOpen] = useState(false)

  // Handle camera capture
  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click()
    }
  }

  // Handle file upload
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setMediaPreview(fileUrl)
    }
  }

  // Handle privacy toggle
  const togglePrivacy = () => {
    setIsPrivate(!isPrivate)
  }

  // Remove media preview
  const removeMedia = () => {
    setMediaPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }

  // Get subcategories for selected category
  const getSubcategories = () => {
    const category = categories.find((c) => c.name === selectedCategory)
    return category ? category.subcategories : []
  }

  // Format product string
  const getFormattedProduct = () => {
    if (!selectedCategory) return ""
    if (!selectedSubcategory) return selectedCategory
    return `${selectedCategory}: ${selectedSubcategory}`
  }

  // Search products based on query and selected category
  useEffect(() => {
    if (productSearchQuery.trim() === "") {
      // If no search query, show products from selected category
      if (selectedCategory) {
        setProductSearchResults(
          officialProducts.filter(
            (product) =>
              product.brand.toLowerCase() === selectedCategory.toLowerCase() ||
              product.name.toLowerCase().includes(selectedCategory.toLowerCase()),
          ),
        )
      } else {
        setProductSearchResults([])
      }
    } else {
      // Filter products based on search query and selected category
      const filteredProducts = officialProducts.filter((product) => {
        const matchesQuery = product.name.toLowerCase().includes(productSearchQuery.toLowerCase())
        const matchesCategory =
          !selectedCategory ||
          product.brand.toLowerCase() === selectedCategory.toLowerCase() ||
          product.name.toLowerCase().includes(selectedCategory.toLowerCase())

        return matchesQuery && matchesCategory
      })
      setProductSearchResults(filteredProducts)
    }
  }, [productSearchQuery, selectedCategory])

  // Open subcategory selection
  const openSubcategorySelection = () => {
    if (selectedCategory) {
      setSubcategoryOpen(true)
    } else {
      // If no category is selected, open category selection first
      setCategoryOpen(true)
    }
  }

  // Add new category
  const handleAddCategory = () => {
    if (!newCategory.trim()) return

    // Check if category already exists
    if (categories.some((c) => c.name.toLowerCase() === newCategory.toLowerCase())) {
      alert("This category already exists")
      return
    }

    const updatedCategories = [
      ...categories,
      {
        id: categories.length + 1,
        name: newCategory,
        subcategories: [],
      },
    ]

    setCategories(updatedCategories)
    setSelectedCategory(newCategory)
    setNewCategory("")
    setShowNewCategoryInput(false)
    setCategoryOpen(false)
  }

  // Add new subcategory
  const handleAddSubcategory = () => {
    if (!newSubcategory.trim() || !selectedCategory) return

    const categoryIndex = categories.findIndex((c) => c.name === selectedCategory)
    if (categoryIndex === -1) return

    // Check if subcategory already exists
    if (categories[categoryIndex].subcategories.some((s) => s.toLowerCase() === newSubcategory.toLowerCase())) {
      alert("This subcategory already exists")
      return
    }

    const updatedCategories = [...categories]
    updatedCategories[categoryIndex].subcategories.push(newSubcategory)

    setCategories(updatedCategories)
    setSelectedSubcategory(newSubcategory)
    setNewSubcategory("")
    setShowNewSubcategoryInput(false)
    setSubcategoryOpen(false)
  }

  // Select a product from search results
  const handleSelectProduct = (product: (typeof officialProducts)[0]) => {
    setSelectedProduct(product)
    setProductSearchOpen(false)
    setProductSearchQuery("")
  }

  // Clear selected product
  const clearSelectedProduct = () => {
    setSelectedProduct(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!content.trim()) {
      alert("Please enter your review content")
      return
    }

    if (!selectedCategory) {
      alert("Please select a category")
      return
    }

    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    // Handle form submission here
    console.log({
      content,
      product: getFormattedProduct(),
      rating,
      isPrivate,
      mediaUrl: mediaPreview,
      taggedProduct: selectedProduct,
      // Add other fields as needed
    })

    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-black text-white">
        <button onClick={() => router.back()} className="text-white">
          <ArrowLeft size={24} />
        </button>
        <div className="text-xl font-semibold">New Verdikt</div>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Category & Product */}
        <div className="space-y-4">
          {/* Category Selection */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">Category</span>
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-1/2 justify-between ${!selectedCategory ? "text-gray-400" : ""}`}
                >
                  {selectedCategory || "Select category"}
                  <ChevronDown size={16} className="ml-2 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[200px]" align="end">
                <Command>
                  <CommandInput placeholder="Search categories..." />
                  <CommandList>
                    <CommandEmpty>No categories found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.id}
                          onSelect={() => {
                            setSelectedCategory(category.name)
                            setSelectedSubcategory("")
                            setCategoryOpen(false)
                          }}
                        >
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandGroup>
                      {showNewCategoryInput ? (
                        <div className="flex items-center p-2">
                          <Input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category name"
                            className="flex-1 h-8"
                            autoFocus
                          />
                          <Button size="sm" className="ml-2 h-8 px-2" onClick={handleAddCategory}>
                            Add
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2"
                            onClick={() => {
                              setShowNewCategoryInput(false)
                              setNewCategory("")
                            }}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ) : (
                        <CommandItem onSelect={() => setShowNewCategoryInput(true)} className="text-indigo-500">
                          <Plus size={16} className="mr-2" />
                          Add new category
                        </CommandItem>
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Product Tag */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">Tag Product (Subcategory)</span>
            <div className="w-1/2">
              {selectedProduct ? (
                <div className="flex items-center justify-between bg-indigo-50 rounded-md p-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-2 relative">
                      <Image
                        src={selectedProduct.image || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        width={24}
                        height={24}
                        className="rounded-sm"
                      />
                      {selectedProduct.verified && (
                        <div className="absolute -right-1 -bottom-1 bg-indigo-500 rounded-full w-3 h-3 flex items-center justify-center">
                          <span className="text-white text-[8px]">✓</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium truncate max-w-[120px]">{selectedProduct.name}</span>
                  </div>
                  <button type="button" onClick={clearSelectedProduct} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <Popover open={productSearchOpen} onOpenChange={setProductSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between text-gray-400">
                      <div className="flex items-center">
                        <Search size={16} className="mr-2" />
                        Search official products
                        <ChevronDown size={16} className="ml-2" />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[250px]" align="end">
                    <Command>
                      <CommandInput
                        placeholder="Search products..."
                        value={productSearchQuery}
                        onValueChange={setProductSearchQuery}
                      />
                      <CommandList>
                        <CommandEmpty>
                          {selectedCategory ? (
                            <div className="p-2 text-sm text-gray-500">
                              No official products found for "{selectedCategory}".
                              <br />
                              Try a different search term.
                            </div>
                          ) : (
                            <div className="p-2 text-sm text-gray-500">
                              Select a category first or search for a product.
                            </div>
                          )}
                        </CommandEmpty>
                        <CommandGroup>
                          {productSearchResults.map((product) => (
                            <CommandItem
                              key={product.id}
                              onSelect={() => handleSelectProduct(product)}
                              className="flex items-center"
                            >
                              <div className="flex items-center flex-1">
                                <div className="w-6 h-6 mr-2 relative">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    width={24}
                                    height={24}
                                    className="rounded-sm"
                                  />
                                  {product.verified && (
                                    <div className="absolute -right-1 -bottom-1 bg-indigo-500 rounded-full w-3 h-3 flex items-center justify-center">
                                      <span className="text-white text-[8px]">✓</span>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-xs text-gray-500">{product.brand}</div>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-sm">Rating</span>
          <div className="flex items-center space-x-2 w-1/2 justify-between">
            {ratingEmojis.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setRating(item.value)}
                className={`text-2xl transition-transform ${rating === item.value ? "transform scale-125 text-indigo-500" : "text-gray-400"}`}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Media Buttons */}
        <div className="flex justify-between items-center pb-4 mb-2 border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              type="button"
              className="text-gray-500 hover:text-indigo-500 transition-colors"
              onClick={handleCameraCapture}
              aria-label="Take a photo with camera"
            >
              <Camera size={24} />
            </button>
            <button
              type="button"
              className="text-gray-500 hover:text-indigo-500 transition-colors"
              onClick={handleFileUpload}
              aria-label="Upload photo or video"
            >
              <ImageIcon size={24} />
            </button>
          </div>
          <button
            type="button"
            className={`transition-colors ${isPrivate ? "text-indigo-500" : "text-gray-500"}`}
            onClick={togglePrivacy}
            aria-label={isPrivate ? "Private review (only visible to friends)" : "Public review"}
          >
            {isPrivate ? <Lock size={24} /> : <Unlock size={24} />}
          </button>
        </div>

        {/* Textarea moved here */}
        <Textarea
          placeholder="Share your recommendation, thoughts...."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] text-lg border-none resize-none focus:ring-0"
        />

        {/* Media Preview */}
        {mediaPreview && (
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={mediaPreview || "/placeholder.svg"}
              alt="Media preview"
              width={500}
              height={300}
              className="w-full object-cover max-h-[300px]"
            />
            <button
              type="button"
              onClick={removeMedia}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Hidden file inputs */}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" className="hidden" />
        <input
          type="file"
          ref={cameraInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          className="hidden"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl"
          disabled={!content.trim() || !selectedCategory || rating === 0}
        >
          Post Verdikt
        </Button>
      </form>
    </div>
  )
}

