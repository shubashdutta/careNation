export type CategoryLevel = 0 | 1 | 2

export type Step = "basic" | "image" | "seo"

export interface ICategoryRoot {
  records: ICategory[]
  limit: number
  currentPage: number
  next: any
  prev: any
  totalPages: number
  totalRecords: number
  pagingCounter: number
  hasPrevious: boolean
  hasNext: boolean
  recordShown: number
}

export interface ICategory {
  id: string
  name: string
  slug: string
  description: string
  logo: string
  parentId: any
  sortOrder: number
  status: "ACTIVE" | "INACTIVE"
  metaTitle: string
  metaDescription: string
  createdAt: string
  updatedAt: string
  children: ICategory[]
}

export interface Children {
  id: string
  name: string
  slug: string
  description: string
  logo: string
  parentId: string
  sortOrder: number
  metaTitle: string
  metaDescription: string
  status: string
  createdAt: string
  updatedAt: string
  children: any[]
}
