"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContractAddressDisplay() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // This will be replaced with the actual contract address when provided
  const contractAddress = "FsdF9BpeFoMppokzUXJBLWdswSnZq3GPv8JTgmi4pump"

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Contract address copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-purple-800 rounded-xl p-6 shadow-xl mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <ExternalLink className="mr-2 h-5 w-5 text-yellow-400" />
        GoonCoin Contract Address
      </h2>

      <div className="flex gap-2">
        <Input value={contractAddress} readOnly className="font-mono text-sm bg-purple-900/50" />
        <Button variant="outline" size="icon" onClick={handleCopy} className="flex-shrink-0">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      <p className="text-sm text-purple-300 mt-2">
        Use this contract address to interact with GoonCoin when it launches
      </p>
    </div>
  )
}

