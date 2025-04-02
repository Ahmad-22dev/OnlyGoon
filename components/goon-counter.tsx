"use client"

import { useState, useEffect } from "react"
import { Sparkles, Award, Brain } from "lucide-react"
import confetti from "canvas-confetti"

interface GoonCounterProps {
  points?: number
  externalPoints?: number
  disableClicking?: boolean
}

export function GoonCounter({ points = 0, externalPoints = 0, disableClicking = false }: GoonCounterProps) {
  const [count, setCount] = useState(points)
  const [multiplier, setMultiplier] = useState(1)
  const [level, setLevel] = useState(1)
  const [animatePoints, setAnimatePoints] = useState(false)

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  // Initialize level and multiplier based on points
  useEffect(() => {
    if (points > 0) {
      setCount(points)
      const newLevel = Math.floor(points / 100) + 1
      setLevel(newLevel)
      const newMultiplier = Math.min(Math.floor(points / 50) + 1, 10)
      setMultiplier(newMultiplier)
    }
  }, [points])

  useEffect(() => {
    if (externalPoints > 0) {
      setAnimatePoints(true)

      // Animate the points increasing
      const timeout = setTimeout(() => {
        setAnimatePoints(false)

        setCount((prev) => {
          const newCount = prev + externalPoints

          // Check for level up
          const newLevel = Math.floor(newCount / 100) + 1
          if (newLevel > level) {
            setLevel(newLevel)
            triggerConfetti()
          }

          // Check for multiplier increase
          const newMultiplier = Math.min(Math.floor(newCount / 50) + 1, 10)
          if (newMultiplier > multiplier) {
            setMultiplier(newMultiplier)
            if (newCount % 50 === 0) {
              triggerConfetti()
            }
          }

          return newCount
        })
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [externalPoints, level, multiplier])

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-6">
        <div
          className={`text-5xl font-bold mb-2 transition-all duration-500 ${animatePoints ? "scale-125 text-yellow-300" : ""}`}
        >
          {count}
        </div>
        <div className="text-purple-300">Goon Points</div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="bg-purple-700 px-3 py-1 rounded-full text-sm">Level {level}</div>
          <div className="bg-purple-700 px-3 py-1 rounded-full text-sm flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            {multiplier}x
          </div>
        </div>
      </div>

      <div className="bg-purple-700/30 p-4 rounded-lg text-center">
        <Brain className="inline-block mr-2 h-5 w-5 text-yellow-400" />
        <span>Solve puzzles to earn more Goon Points!</span>
      </div>

      {level > 1 && (
        <div className="mt-4 flex items-center justify-center">
          <Award className="text-yellow-400 w-5 w-5 mr-2" />
          <span className="text-yellow-300">You've reached Goon Level {level}!</span>
        </div>
      )}
    </div>
  )
}

