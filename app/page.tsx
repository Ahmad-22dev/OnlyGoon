"use client"

import { useState, useEffect } from "react"
import { GoonCounter } from "@/components/goon-counter"
import { Leaderboard } from "@/components/leaderboard"
import { CoinInfo } from "@/components/coin-info"
import { Footer } from "@/components/footer"
import { PuzzleChallenge } from "@/components/puzzle-challenge"
import { NameEntryModal } from "@/components/name-entry-modal"
import { ContractAddressDisplay } from "@/components/contract-address-display"
import { Logo } from "@/components/logo"

// Define the user score type
type UserScore = {
  name: string
  points: number
}

export default function Home() {
  const [puzzlePoints, setPuzzlePoints] = useState(0)
  const [userName, setUserName] = useState<string | null>(null)
  const [showNameModal, setShowNameModal] = useState(true)
  const [userScores, setUserScores] = useState<UserScore[]>([])
  const [totalPoints, setTotalPoints] = useState(0)

  // Load saved scores from localStorage on initial render
  useEffect(() => {
    const savedScores = localStorage.getItem("goonLeaderboard")
    if (savedScores) {
      try {
        const parsedScores = JSON.parse(savedScores) as UserScore[]
        setUserScores(parsedScores)
      } catch (error) {
        console.error("Failed to parse saved scores:", error)
      }
    }

    const storedName = localStorage.getItem("goonUserName")
    if (storedName) {
      setUserName(storedName)
      setShowNameModal(false)

      // Load user's total points
      const storedPoints = localStorage.getItem(`goonPoints_${storedName}`)
      if (storedPoints) {
        setTotalPoints(Number.parseInt(storedPoints, 10) || 0)
      }
    }
  }, [])

  const handleNameSubmit = (name: string) => {
    setUserName(name)
    localStorage.setItem("goonUserName", name)
    setShowNameModal(false)

    // Check if user already exists in leaderboard
    const existingUserIndex = userScores.findIndex((user) => user.name === name)
    if (existingUserIndex === -1) {
      // Add new user with 0 points
      const updatedScores = [...userScores, { name, points: 0 }].sort((a, b) => b.points - a.points)
      setUserScores(updatedScores)
      localStorage.setItem("goonLeaderboard", JSON.stringify(updatedScores))
    }
  }

  const handlePuzzlePointsEarned = (points: number) => {
    setPuzzlePoints(points)

    // Update user's total points
    const newTotalPoints = totalPoints + points
    setTotalPoints(newTotalPoints)

    // Update leaderboard if user has a name
    if (userName) {
      // Save user's total points
      localStorage.setItem(`goonPoints_${userName}`, newTotalPoints.toString())

      setUserScores((prev) => {
        // Check if user already exists in scores
        const existingUserIndex = prev.findIndex((user) => user.name === userName)

        let updatedScores: UserScore[]

        if (existingUserIndex >= 0) {
          // Update existing user's score
          updatedScores = [...prev]
          updatedScores[existingUserIndex].points = newTotalPoints
        } else {
          // Add new user
          updatedScores = [...prev, { name: userName, points: newTotalPoints }]
        }

        // Sort by points in descending order
        const sortedScores = updatedScores.sort((a, b) => b.points - a.points)

        // Save to localStorage
        localStorage.setItem("goonLeaderboard", JSON.stringify(sortedScores))

        return sortedScores
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 text-white">
      {showNameModal && <NameEntryModal onSubmit={handleNameSubmit} />}

      <header className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
            OnlyGoon
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-200">
            The internet's premier destination for Goon enthusiasts!
          </p>
          {userName && (
            <div className="bg-purple-800/50 px-4 py-2 rounded-full mb-4">
              Welcome, <span className="font-bold text-yellow-300">{userName}</span>!
            </div>
          )}
          <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-purple-300 shadow-lg rounded-full flex items-center justify-center mb-8">
            <svg
              className="w-6 h-6 text-purple-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <ContractAddressDisplay />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-purple-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Goon Points</h2>
            <GoonCounter points={totalPoints} externalPoints={puzzlePoints} disableClicking={true} />
          </div>

          <div className="bg-purple-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Goon Leaderboard</h2>
            <Leaderboard userScores={userScores} currentUserName={userName} />
          </div>
        </div>

        <div className="bg-purple-800 rounded-xl p-6 shadow-xl mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Puzzle Challenge</h2>
          <p className="text-center text-purple-200 mb-6">Solve puzzles to earn Goon Points!</p>
          <PuzzleChallenge onPointsEarned={handlePuzzlePointsEarned} />
        </div>

        <CoinInfo />
      </main>

      <Footer />
    </div>
  )
}

