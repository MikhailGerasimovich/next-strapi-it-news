import { STRAPI_CONFIG } from "./config";
import { getStrapiURL } from "./helpers";

export async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_CONFIG.API_TOKEN && {
        Authorization: `Bearer ${STRAPI_CONFIG.API_TOKEN}`,
      }),
    },
    next: {
      revalidate: STRAPI_CONFIG.REVALIDATE_TIME,
    },
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(getStrapiURL(path), mergedOptions);

    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch from Strapi: ${path}`, error);
    throw error;
  }
}
