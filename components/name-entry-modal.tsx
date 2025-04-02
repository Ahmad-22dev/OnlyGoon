"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NameEntryModalProps {
  onSubmit: (name: string) => void
}

export function NameEntryModal({ onSubmit }: NameEntryModalProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Please enter a name")
      return
    }

    if (name.length > 20) {
      setError("Name must be 20 characters or less")
      return
    }

    onSubmit(name.trim())
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-800 rounded-xl p-6 shadow-2xl max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome to OnlyGoon!</h2>
          <p className="text-purple-300">Enter your name to start earning Goon Points</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your Goon Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError("")
              }}
              className={error ? "border-red-500" : ""}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-yellow-500">
            Start Gooning!
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-purple-300">
          Your name will appear on the leaderboard when you earn points
        </div>
      </div>
    </div>
  )
}

