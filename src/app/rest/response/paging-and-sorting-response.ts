export interface PagingAndSortingResponse<T> {
  content: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  total: number;
}
