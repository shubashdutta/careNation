export interface IBrand {
  id: string
  name: string
  slug: string
  status: "ACTIVE" | "INACTIVE"
  description: string
  logo?: string | null
  metaTitle: string
  metaDescription: string
  isFeatured?: boolean
}

export type Step = "basic" | "image"
