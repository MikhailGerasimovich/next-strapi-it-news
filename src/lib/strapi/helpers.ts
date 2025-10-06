import { STRAPI_CONFIG } from "./config";

export function getStrapiURL(path: string = ""): string {
  return `${STRAPI_CONFIG.URL}${path}`;
}

export function getStrapiImageURL(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_CONFIG.URL}${url}`;
}

export function buildQueryParams(
  params: Record<string, string | number>
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value.toString());
  });

  return searchParams.toString();
}
