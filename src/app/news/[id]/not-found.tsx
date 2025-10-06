import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="inline-block p-4 bg-red-100 rounded-full">
              <AlertTriangle className="w-16 h-16 text-red-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            News not found
          </h1>

          <p className="text-gray-600 mb-8">
            Unfortunately, the requested news does not exist or has been
            deleted.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            All news
          </Link>
        </div>
      </main>
    </>
  );
}
