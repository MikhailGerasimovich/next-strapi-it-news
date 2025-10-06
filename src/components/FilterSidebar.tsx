"use client";

import { Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface FilterSidebarProps {
  availableTags: string[];
}

export default function FilterSidebar({ availableTags }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const tagsParam = searchParams.get("tags");
    if (tagsParam) {
      setSelectedTags(tagsParam.split(","));
    } else {
      setSelectedTags([]);
    }
  }, [searchParams]);

  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedTags: string[];

    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }

    if (newSelectedTags.length > 0) {
      params.set("tags", newSelectedTags.join(","));
    } else {
      params.delete("tags");
    }

    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tags");
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <aside className="bg-white rounded-xl shadow-md p-6 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        {selectedTags.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Tags
          </h3>

          {availableTags.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availableTags.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {tag}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Tags not found</p>
          )}
        </div>

        {selectedTags.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2">
              Selected tags: {selectedTags.length}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md"
                >
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="hover:text-blue-900"
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
