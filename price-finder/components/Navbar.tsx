import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          <span className="text-pink-500">💰</span> PriceFinder
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
            Home
          </Link>
          <Link href="/saved" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
            Saved
          </Link>
        </div>
      </div>
    </nav>
  );
}
