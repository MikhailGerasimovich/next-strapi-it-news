import Link from "next/link";
import { Newspaper } from "lucide-react";

export default function Header() {
  return (
    <header className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <Newspaper className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                IT News Portal
              </h1>
              <p className="text-sm text-blue-100">Latest technology news</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/#news"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              News
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
