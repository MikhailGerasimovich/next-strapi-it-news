export interface SearchParams {
  search?: string;
  tags?: string;
  page?: string;
}

export interface HomePageProps {
  searchParams: Promise<SearchParams>;
}
