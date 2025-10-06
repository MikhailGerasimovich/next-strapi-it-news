import { NewsArticle, StrapiResponse, NewsFilters } from "@/types/news.types";
import { fetchAPI } from "./api";
import { STRAPI_ENDPOINTS, STRAPI_CONFIG } from "./config";

export async function getNewsArticles(
  filters: NewsFilters = {}
): Promise<StrapiResponse<NewsArticle[]>> {
  const {
    search,
    tags,
    page = 1,
    pageSize = STRAPI_CONFIG.DEFAULT_PAGE_SIZE,
  } = filters;

  const params = new URLSearchParams({
    populate: "*",
    "pagination[page]": page.toString(),
    "pagination[pageSize]": pageSize.toString(),
    sort: "publishedAt:desc",
  });

  if (search) {
    params.append("filters[title][$containsi]", search);
  }

  if (tags && tags.length > 0) {
    tags.forEach((tag) => {
      params.append("filters[tags][$containsi]", tag);
    });
  }

  return fetchAPI<StrapiResponse<NewsArticle[]>>(
    `${STRAPI_ENDPOINTS.NEWS_ARTICLES}?${params.toString()}`
  );
}

export async function getNewsArticleById(
  id: string
): Promise<{ data: NewsArticle }> {
  return fetchAPI<{ data: NewsArticle }>(
    `${STRAPI_ENDPOINTS.NEWS_ARTICLE_BY_ID(id)}?populate=*`
  );
}

export async function getAllTags(): Promise<string[]> {
  try {
    const response = await fetchAPI<StrapiResponse<NewsArticle[]>>(
      `${STRAPI_ENDPOINTS.NEWS_ARTICLES}?fields[0]=tags&pagination[pageSize]=100`
    );

    const tagsSet = new Set<string>();
    response.data.forEach((article) => {
      article.tags?.forEach((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}
