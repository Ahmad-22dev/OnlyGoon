"use client"

import { Trophy, Crown, Medal, Users, User } from "lucide-react"

type GoonUser = {
  name: string
  points: number
}

interface LeaderboardProps {
  userScores: GoonUser[]
  currentUserName: string | null
}

export function Leaderboard({ userScores, currentUserName }: LeaderboardProps) {
  if (userScores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Users className="h-12 w-12 text-purple-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">No Gooners Yet!</h3>
        <p className="text-purple-300">Be the first to solve puzzles and get on the leaderboard!</p>
      </div>
    )
  }

  // Get top 10 users
  const topUsers = userScores.slice(0, 10)

  // Find current user's position
  const currentUserIndex = currentUserName ? userScores.findIndex((user) => user.name === currentUserName) : -1

  const currentUserRank = currentUserIndex + 1
  const currentUser = currentUserIndex >= 0 ? userScores[currentUserIndex] : null
  const isCurrentUserInTop10 = currentUserIndex >= 0 && currentUserIndex < 10

  const getIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Crown className="h-5 w-5 text-yellow-400" />
      case 1:
        return <Trophy className="h-5 w-5 text-gray-300" />
      case 2:
        return <Medal className="h-5 w-5 text-amber-700" />
      default:
        return <span className="text-sm text-purple-300">{position + 1}</span>
    }
  }

  return (
    <div className="space-y-4">
      {topUsers.map((user, index) => (
        <div
          key={user.name}
          className={`flex items-center p-3 rounded-lg ${
            index === 0
              ? "bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 border border-yellow-500/50"
              : user.name === currentUserName
                ? "bg-purple-600/50 border border-purple-400/50"
                : "bg-purple-700/50"
          }`}
        >
          <div className="flex items-center justify-center w-8 h-8 mr-3">{getIcon(index)}</div>
          <div className="flex-1">
            <div className="flex items-center">
              {user.name === currentUserName ? (
                <span className="font-bold text-yellow-300">{user.name} (You)</span>
              ) : (
                <span className="font-bold">{user.name}</span>
              )}
            </div>
          </div>
          <div className="font-mono font-bold">{user.points.toLocaleString()}</div>
        </div>
      ))}

      {/* Show current user if not in top 10 */}
      {currentUser && !isCurrentUserInTop10 && (
        <>
          {topUsers.length > 0 && (
            <div className="relative py-2 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dashed border-purple-500/50"></div>
              </div>
              <div className="relative bg-purple-800 px-4">
                <span className="text-sm text-purple-400">Your Ranking</span>
              </div>
            </div>
          )}

          <div className="flex items-center p-3 rounded-lg bg-purple-600/50 border border-purple-400/50">
            <div className="flex items-center justify-center w-8 h-8 mr-3">
              <span className="text-sm text-purple-300">{currentUserRank}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-yellow-300" />
                <span className="font-bold text-yellow-300">{currentUser.name} (You)</span>
              </div>
            </div>
            <div className="font-mono font-bold">{currentUser.points.toLocaleString()}</div>
          </div>
        </>
      )}

      <div className="mt-4 text-center text-sm text-purple-300">
        {userScores.length > 10 && <div className="mb-2">Showing top 10 of {userScores.length} Gooners</div>}
        Solve more puzzles to climb the leaderboard!
      </div>
    </div>
  )
}

