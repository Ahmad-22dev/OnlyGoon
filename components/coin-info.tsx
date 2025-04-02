"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, ArrowUpRight } from "lucide-react"

export function CoinInfo() {
  return (
    <div className="bg-purple-800 rounded-xl p-6 shadow-xl mb-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">Introducing GoonCoin</h2>
        <p className="text-purple-300 text-lg">
          The memetic cryptocurrency that's definitely going to the moon! (not financial advice)
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative h-40 w-40">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-36 w-36 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:rotate-12">
              <span className="text-6xl">🤪</span>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5" /> About GoonCoin
          </CardTitle>
          <CardDescription>The most revolutionary meme coin that does absolutely nothing!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            GoonCoin was created in 2025 as a joke, but we're pretending it's serious because that's how meme coins
            work!
          </p>
          <p>
            Unlike other cryptocurrencies that claim to solve real problems, GoonCoin proudly does nothing except make
            funny numbers go up and down.
          </p>
          <p>Join our community of Goon enthusiasts who spend way too much time making memes about a fictional coin!</p>

          <div className="bg-yellow-500/20 border border-yellow-500/30 p-4 rounded-lg mt-6">
            <h4 className="font-bold text-yellow-300 mb-2 flex items-center">
              <ArrowUpRight className="mr-2 h-5 w-5" />
              Investment Opportunity
            </h4>
            <p className="mb-2">
              If you're feeling adventurous, you might consider investing in GoonCoin when it launches!
            </p>
            <p className="text-sm text-yellow-200/70">
              <strong>Disclaimer:</strong> This is NOT financial advice. Investing in cryptocurrencies involves
              significant risk. Only invest what you can afford to lose. GoonCoin is a meme project and should be
              treated as entertainment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

