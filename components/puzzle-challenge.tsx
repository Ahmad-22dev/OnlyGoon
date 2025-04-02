"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock, RefreshCw, Award, EyeOff, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Puzzle = {
  id: number
  question: string
  answer: string
  hint: string
  points: number
  difficulty: "easy" | "medium" | "hard"
  image?: string
}

const puzzles: Puzzle[] = [
  {
    id: 1,
    question: "What do you call a cryptocurrency that's also a dog food?",
    answer: "kibble",
    hint: "Dogs eat this",
    points: 25,
    difficulty: "easy",
  },
  {
    id: 2,
    question: "Complete the meme: 'One does not simply _____ into Mordor'",
    answer: "walk",
    hint: "It's a basic form of movement",
    points: 20,
    difficulty: "easy",
  },
  {
    id: 3,
    question: "How many 'stonks' would a stonksman stonk if a stonksman could stonk stonks?",
    answer: "42069",
    hint: "It's a combination of two meme numbers",
    points: 30,
    difficulty: "medium",
  },
  {
    id: 4,
    question: "What year is it according to the 'It's Wednesday my dudes' frog?",
    answer: "wednesday",
    hint: "It's always this day for the frog",
    points: 15,
    difficulty: "easy",
  },
  {
    id: 5,
    question: "If you have diamond hands, what do you never do with your crypto?",
    answer: "sell",
    hint: "HODL means you don't do this",
    points: 25,
    difficulty: "medium",
  },
  {
    id: 6,
    question: "Solve this equation: 69 + 420 - 351 = ?",
    answer: "138",
    hint: "Do the math, it's not a meme number this time",
    points: 35,
    difficulty: "medium",
  },
  {
    id: 7,
    question: "Unscramble these letters to find a popular crypto term: ONTOMOH",
    answer: "moontoh",
    hint: "Where crypto prices go (hopefully) + slang for thousand",
    points: 40,
    difficulty: "hard",
  },
  {
    id: 8,
    question: "What color is the Reddit upvote button? (one word)",
    answer: "orange",
    hint: "Some say it's red, but it's actually...",
    points: 20,
    difficulty: "easy",
  },
  {
    id: 9,
    question: "What does the Doge say? (hint: wow)",
    answer: "wow",
    hint: "Such hint. Very obvious. Much __.",
    points: 15,
    difficulty: "easy",
  },
  {
    id: 10,
    question: "How many brain cells does the average GoonCoin investor have?",
    answer: "3",
    hint: "It's a single-digit number less than 5",
    points: 30,
    difficulty: "medium",
  },
]

interface PuzzleChallengeProps {
  onPointsEarned: (points: number) => void
}

export function PuzzleChallenge({ onPointsEarned }: PuzzleChallengeProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [puzzlesSolved, setPuzzlesSolved] = useState(0)
  const [answerRevealed, setAnswerRevealed] = useState(false)
  const { toast } = useToast()

  // Get a new random puzzle
  const getRandomPuzzle = () => {
    const randomIndex = Math.floor(Math.random() * puzzles.length)
    setCurrentPuzzle(puzzles[randomIndex])
    setTimeRemaining(60)
    setUserAnswer("")
    setShowHint(false)
    setIsCorrect(null)
    setAnswerRevealed(false)
  }

  // Initialize with a random puzzle
  useEffect(() => {
    getRandomPuzzle()

    // Set up timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          toast({
            title: "Time's up!",
            description: "The puzzle has expired. Here's a new one!",
            variant: "destructive",
          })
          getRandomPuzzle()
          return 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPuzzle) return

    const normalizedUserAnswer = userAnswer.trim().toLowerCase()
    const normalizedCorrectAnswer = currentPuzzle.answer.trim().toLowerCase()

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setIsCorrect(true)
      setPuzzlesSolved((prev) => prev + 1)

      // Award points only if answer wasn't revealed
      if (!answerRevealed) {
        onPointsEarned(currentPuzzle.points)

        toast({
          title: "Correct!",
          description: `You earned ${currentPuzzle.points} Goon Points!`,
          variant: "default",
        })
      } else {
        toast({
          title: "Correct!",
          description: "No points awarded since the answer was revealed.",
          variant: "default",
        })
      }

      // Get a new puzzle after a short delay
      setTimeout(() => {
        getRandomPuzzle()
      }, 2000)
    } else {
      setIsCorrect(false)
      toast({
        title: "Wrong answer!",
        description: "Try again or use a hint.",
        variant: "destructive",
      })
    }
  }

  const handleSkip = () => {
    toast({
      title: "Puzzle skipped",
      description: "Here's a new brain teaser for you!",
    })
    getRandomPuzzle()
  }

  const handleShowHint = () => {
    setShowHint(true)
  }

  const handleRevealAnswer = () => {
    if (!currentPuzzle) return

    setAnswerRevealed(true)
    setUserAnswer(currentPuzzle.answer)

    toast({
      title: "Answer Revealed",
      description: "You won't earn points for this puzzle.",
      variant: "destructive",
    })
  }

  if (!currentPuzzle) return <div>Loading puzzle...</div>

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-purple-400" />
            Goon Puzzle Challenge
          </div>
          <div className="flex items-center text-sm font-normal">
            <Clock className="mr-1 h-4 w-4 text-orange-400" />
            <span className={timeRemaining < 10 ? "text-red-400 animate-pulse" : ""}>{timeRemaining}s</span>
          </div>
        </CardTitle>
        <CardDescription>Solve the puzzle to earn Goon Points!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-purple-700/30 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{currentPuzzle.question}</h3>

            {showHint && (
              <div className="mt-2 text-sm bg-purple-700/50 p-2 rounded">
                <span className="font-bold">Hint:</span> {currentPuzzle.hint}
              </div>
            )}

            {answerRevealed && (
              <div className="mt-2 bg-yellow-500/20 border border-yellow-500/30 p-2 rounded flex items-center">
                <Eye className="h-4 w-4 mr-2 text-yellow-400" />
                <div>
                  <span className="font-bold">Answer:</span> {currentPuzzle.answer}
                  <div className="text-xs text-yellow-300/70">No points will be awarded for this puzzle</div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className={`${
                  isCorrect === true ? "border-green-500" : isCorrect === false ? "border-red-500" : ""
                } ${answerRevealed ? "border-yellow-500 bg-yellow-500/10" : ""}`}
                readOnly={answerRevealed}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={!userAnswer.trim()}>
                Submit Answer
              </Button>

              <Button type="button" variant="outline" onClick={handleShowHint} disabled={showHint}>
                {showHint ? "Hint Revealed" : "Need a Hint?"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleRevealAnswer}
                disabled={answerRevealed}
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/20"
              >
                {answerRevealed ? (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Answer Revealed
                  </>
                ) : (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Reveal Answer
                  </>
                )}
              </Button>

              <Button type="button" variant="ghost" onClick={handleSkip} className="ml-auto">
                <RefreshCw className="mr-2 h-4 w-4" />
                Skip Puzzle
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-sm text-purple-300">
          <Award className="mr-1 h-4 w-4" />
          {answerRevealed ? (
            <span className="line-through">Worth: {currentPuzzle.points} points</span>
          ) : (
            <span>Worth: {currentPuzzle.points} points</span>
          )}
        </div>
        <div className="text-sm text-purple-300">Puzzles solved: {puzzlesSolved}</div>
      </CardFooter>
    </Card>
  )
}

