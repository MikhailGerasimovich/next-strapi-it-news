import { NewsArticle } from "@/types/news.types";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import ActiveFilters from "@/components/ActiveFilters";
import EmptyState from "@/components/EmptyState";

interface NewsContentProps {
  articles: NewsArticle[];
  availableTags: string[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  filters: {
    search?: string;
    tags: string[];
  };
}

export default function NewsContent({
  articles,
  availableTags,
  pagination,
  filters,
}: NewsContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All news</h2>
            <SearchBar />
          </div>

          <ActiveFilters search={filters.search} tags={filters.tags} />

          {articles.length > 0 && (
            <p className="text-sm text-gray-600 mb-4">
              Found news: {pagination.total}
            </p>
          )}

          {articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>

              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
                totalItems={pagination.total}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </div>

        <div className="lg:w-80">
          <FilterSidebar availableTags={availableTags} />
        </div>
      </div>
    </div>
  );
}
