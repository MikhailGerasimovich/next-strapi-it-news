import Link from "next/link";
import Image from "next/image";
import { ImageIcon, ChevronRight } from "lucide-react";
import { NewsArticle } from "@/types/news.types";
import { getStrapiImageURL } from "@/lib/strapi";
import { getTextPreview } from "@/lib/textUtils";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const imageUrl = getStrapiImageURL(article.preview?.url);
  const publishDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Link href={`/news/${article.documentId}`}>
      <article className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 hover:border-blue-300">
        <div className="relative w-full h-48 overflow-hidden bg-gray-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={article.preview?.alternativeText || article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
              <ImageIcon className="w-16 h-16 text-blue-300" />
            </div>
          )}

          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-lg">
            {publishDate}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
            {getTextPreview(article.content)}
          </p>

          <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
            <span className="group-hover:mr-2 transition-all">Read more</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
          </div>
        </div>
      </article>
    </Link>
  );
}
