export interface CompanyProfilePayload {
  companyName?: string
  companyEmail?: string
  companyPhone?: string
  companyAddress?: string
  website?: string
  facebook?: string
  instagram?: string
  x?: string
  linkedin?: string
  youtube?: string
  tiktok?: string
}

export interface CompanyProfileResponse {
  success: boolean
  message: string
  data: CompanyProfilePayload & {
    id: string
    createdAt?: string
    updatedAt?: string
  }
}
