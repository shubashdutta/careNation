import { AxiosError } from "axios"

/**
 * Generic API response type
 * T represents the type of the `data` returned by the API
 */
export interface IApiResponseType<T> {
  success: boolean
  statusCode: number
  message: string
  data: {
    records: T
    limit: number
    currentPage: number
    next: string | null
    prev: string | null
    totalPages: number
    totalRecords: number
    pagingCounter: number
    hasPrevious: boolean
    hasNext: boolean
    recordShown: number
  }
}

/**
 * Pagination data type
 */
export interface IPaginationDataType {
  limit: number
  currentPage: number
  next: string | null
  prev: string | null
  totalPages: number
  totalRecords: number
  pagingCounter: number
  hasPrevious: boolean
  hasNext: boolean
  recordShown: number
}

/**
 * Generic API error response type using AxiosError
 * Captures standard A  PI error format with message, status code, and optional error details
 */
export type IApiErrorResponse = AxiosError<{
  message: string
  statusCode: number
  error: Record<string, unknown>
  errors: string | Array<{ path: string; msg: string }>
}>
