import Link from "next/link";
import { FrownIcon } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6">
        <FrownIcon className="w-24 h-24 text-gray-300" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">News not found</h3>
      <p className="text-gray-600 mb-6">
        Try changing the search parameters or filters
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Reset filters
      </Link>
    </div>
  );
}
