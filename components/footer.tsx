export function Footer() {
  return (
    <footer className="bg-purple-900 py-8 px-4">
      <div className="container mx-auto text-center">
        <p className="text-purple-300 mb-2">© 2025 OnlyGoon - The Premier Meme Destination</p>
        <p className="text-purple-400 text-sm">
          This is a parody website. GoonCoin isn't real (yet). Please don't try to invest actual money.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="text-purple-300 hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="text-purple-300 hover:text-white transition-colors">
            Privacy
          </a>
        </div>
        <div className="mt-6 text-sm text-purple-400">Made with 💜 by Goons, for Goons</div>
      </div>
    </footer>
  )
}

