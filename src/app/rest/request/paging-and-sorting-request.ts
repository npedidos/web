export interface PagingAndSortingRequest {
  paging: Paging;
  sorting: Sorting[];
}

export interface Paging {
  page: number;
  size: number;
}

export interface Sorting {
  property: string;
  direction: string;
}
