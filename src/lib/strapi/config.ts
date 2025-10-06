export const STRAPI_CONFIG = {
  URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
  API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
  REVALIDATE_TIME: 60,
  DEFAULT_PAGE_SIZE: 9,
} as const;

export const STRAPI_ENDPOINTS = {
  NEWS_ARTICLES: "/api/news-articles",
  NEWS_ARTICLE_BY_ID: (id: string) => `/api/news-articles/${id}`,
} as const;
