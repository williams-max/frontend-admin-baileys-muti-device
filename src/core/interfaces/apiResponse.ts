export interface ApiResponse<T> {
  currentPage: string;
  status: string;
  total: string;
  totalPages: string;
  response: T;
}
