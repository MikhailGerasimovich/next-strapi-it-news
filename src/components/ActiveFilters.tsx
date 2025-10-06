import { Filter } from "lucide-react";

interface ActiveFiltersProps {
  search?: string;
  tags: string[];
}

export default function ActiveFilters({ search, tags }: ActiveFiltersProps) {
  if (!search && tags.length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-2 text-sm">
        <Filter className="w-5 h-5 text-blue-600" />
        <span className="font-medium text-gray-700"> Active filters:</span>
        {search && (
          <span className="px-2 py-1 bg-white rounded text-gray-700">
            Search: &quot;{search}&quot;
          </span>
        )}
        {tags.length > 0 && (
          <span className="px-2 py-1 bg-white rounded text-gray-700">
            Tags: {tags.length}
          </span>
        )}
      </div>
    </div>
  );
}
