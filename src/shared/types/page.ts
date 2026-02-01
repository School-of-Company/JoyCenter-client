export interface PageInfo {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PageResponse<T> {
  content: T[];
  page: PageInfo;
}
