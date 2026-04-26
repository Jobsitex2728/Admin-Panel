export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

export interface PaginatedResult<T> {
  total: number
  page: number
  limit: number
  data: T[]
}

export interface PaginationParams {
  page?: number
  limit?: number
}
