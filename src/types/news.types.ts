export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface StrapiTextNode {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface StrapiBlock {
  type: string;
  level?: number;
  format?: string;
  children?: (StrapiTextNode | StrapiBlock)[];
  image?: StrapiImage;
  text?: string;
}

export interface NewsArticle {
  id: number;
  documentId: string;
  title: string;
  content?: string;
  tags?: string[];
  preview?: StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface NewsFilters {
  search?: string;
  tags?: string[];
  page?: number;
  pageSize?: number;
}
