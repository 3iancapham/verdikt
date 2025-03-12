"use client"

import { useRouter } from "next/navigation"
import { CreateVerdiktForm } from "./components/create-verdikt-form"
import { CreateVerdiktFormData } from "./types"

export default function CreatePage() {
  const router = useRouter()

  const handleSubmit = (data: CreateVerdiktFormData) => {
    // TODO: Implement API call to save review
    console.log("Submitting review:", data)
    router.push("/") // Redirect to home page after submission
  }

  const handleCancel = () => {
    router.back() // Go back to previous page
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h1 className="text-lg font-semibold">Create Verdikt</h1>
      </header>

      {/* Form */}
      <CreateVerdiktForm onSubmit={handleSubmit} onCancel={handleCancel} />

      {/* Sticky Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button
          type="submit"
          form="create-review-form"
          className="w-full bg-indigo-500 text-white py-3.5 rounded-lg font-medium hover:bg-indigo-600 transition-colors"
        >
          Post Verdikt
        </button>
      </div>
    </div>
  )
}

