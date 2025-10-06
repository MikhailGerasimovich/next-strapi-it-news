export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  return "http://localhost:3000";
}

export function getNewsArticleUrl(documentId: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/news/${documentId}`;
}

export function getCurrentUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.href;
  }
  return "";
}
