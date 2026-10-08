export interface AboutUsPayload {
  title?: string
  description?: string
  image?: string
}

export interface AboutUsResponse {
  success: boolean
  title: string
  description: string
  image: string
}

export interface AboutUsResponse {
  success: boolean
  message: string
  data: AboutUsPayload & {
    id: string
    createdAt?: string
    updatedAt?: string
  }
}
