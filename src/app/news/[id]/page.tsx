import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getNewsArticleById } from "@/lib/strapi";
import { getStrapiImageURL } from "@/lib/strapi";
import { getTextPreview } from "@/lib/textUtils";
import { getNewsArticleUrl } from "@/lib/urlUtils";
import Header from "@/components/Header";
import RichTextRenderer from "@/components/RichTextRenderer";
import ShareButton from "@/components/ShareButton";
import type { Metadata } from "next";

interface NewsArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await getNewsArticleById(id);
    const article = response.data;

    const imageUrl = getStrapiImageURL(article.preview?.url);
    const descriptionText = getTextPreview(article.content, 160);

    return {
      title: `${article.title} | IT News Portal`,
      description: descriptionText,
      openGraph: {
        title: article.title,
        description: descriptionText,
        images: imageUrl ? [imageUrl] : [],
        type: "article",
        publishedTime: article.publishedAt,
      },
    };
  } catch {
    return {
      title: "News not found | IT News Portal",
    };
  }
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  let article;

  try {
    const { id } = await params;
    const response = await getNewsArticleById(id);
    console.log("response", response);
    article = response.data;
  } catch {
    notFound();
  }

  const imageUrl = getStrapiImageURL(article.preview?.url);
  const publishDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to news
          </Link>
        </div>

        <article className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              {imageUrl && (
                <div className="relative w-full h-[400px] md:h-[500px] bg-gray-200">
                  <Image
                    src={imageUrl}
                    alt={article.preview?.alternativeText || article.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      {article.title}
                    </h1>

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-900 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!imageUrl && (
                <div className="p-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {article.title}
                  </h1>

                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1.5 text-sm font-medium bg-blue-100 text-blue-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <time dateTime={article.publishedAt}>{publishDate}</time>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {article.content ? (
                <RichTextRenderer content={article.content} />
              ) : (
                <p className="text-gray-600 italic">
                  The article content is missing.
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl shadow-lg">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                All news
              </Link>

              <ShareButton url={getNewsArticleUrl(article.documentId)} />
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
