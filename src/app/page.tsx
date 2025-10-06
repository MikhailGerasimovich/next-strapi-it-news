import { Suspense } from "react";
import { getNewsArticles, getAllTags } from "@/lib/strapi";
import { HomePageProps } from "@/types/page.types";
import Header from "@/components/Header";
import NewsContent from "@/components/NewsContent";
import { NewsGridSkeleton } from "@/components/NewsGridSkeleton";

async function NewsDataLoader({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || "";
  const tags = params.tags ? params.tags.split(",") : [];

  const [newsResponse, availableTags] = await Promise.all([
    getNewsArticles({ search, tags, page, pageSize: 9 }),
    getAllTags(),
  ]);

  return (
    <NewsContent
      articles={newsResponse.data}
      availableTags={availableTags}
      pagination={newsResponse.meta.pagination}
      filters={{ search, tags }}
    />
  );
}

export default function Home(props: HomePageProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<NewsGridSkeleton />}>
          <NewsDataLoader {...props} />
        </Suspense>
      </main>
    </>
  );
}
