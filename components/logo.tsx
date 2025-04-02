import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export function Logo({ size = "md" }: LogoProps) {
  const dimensions = {
    sm: 32,
    md: 64,
    lg: 128,
  }

  const dimension = dimensions[size]

  return (
    <Link href="/" className="flex items-center justify-center">
      <div className="relative" style={{ width: dimension, height: dimension }}>
        <Image
          src="/goon-logo.png"
          alt="OnlyGoon Logo"
          width={dimension}
          height={dimension}
          className="object-contain"
          priority
        />
      </div>
    </Link>
  )
}

