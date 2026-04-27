export interface Result<T> {
  isSuccess: boolean;
  value?: T;
  error?: string;
}

export interface PaginatedList<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  token?: string;
}
