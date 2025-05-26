export interface ReqPage { page?: number, limit?: number }

export interface Res<T> {
  context: T,
  message: string | null,
  status: number
}
export interface ResPaginate<T> {
  current_page: number;
  data: T;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number
}