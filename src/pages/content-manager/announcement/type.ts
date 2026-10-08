export const CAMPING_TYPES = {
  FLASH_SALE: "FASH_SALE",
  FESTIVAL: "FESTIVAL",
} as const

export type CampingType = (typeof CAMPING_TYPES)[keyof typeof CAMPING_TYPES]

export const DISCOUNT_TYPES = {
  PERCENTAGE: "PERCENTAGE",
  FLAT: "FLAT",
  BUY_ONE_GET_ONE: "BUY_ONE_GET_ONE",
  SHIPPING_FREE: "SHIPPING_FREE",
  BUNDEL_OFFER: "BUNDEL_OFFER",
  CASHBACK: "CASHBACK",
  COUPON_CAMPING: "COUPON_CAMPING",
} as const

export type DiscountType = (typeof DISCOUNT_TYPES)[keyof typeof DISCOUNT_TYPES]

export const VENDOR_ELIGIBILITY = {
  ALL: "ALL",
  SELECTED: "SELECTED",
  VERIFIED: "VERIFIED",
  PREMIUM_VENDOR: "PREMIUM_VENDOR",
} as const

export type VendorEligibility =
  (typeof VENDOR_ELIGIBILITY)[keyof typeof VENDOR_ELIGIBILITY]

export const PRODUCT_ELIGIBILITY = {
  ALL: "ALL",
  SELECTED: "SELECTED",
  SPEIFIC: "SPEIFIC",
  CRITERIA: "CRITERIA",
} as const

export type ProductEligibility =
  (typeof PRODUCT_ELIGIBILITY)[keyof typeof PRODUCT_ELIGIBILITY]

export type Step =
  | "basic"
  | "configuration"
  | "vendor-eligibility"
  | "product-eligibility"
  | "schedule"
  | "rules"
  | "terms"
  | "preview"

export interface ICampaign {
  id: string
  name: string
  slug: string
  description: string
  status: string
  bannerImage: string
  bannerThumbnail: any
  autoApplyDiscount: boolean
  couponCode: boolean
  stackWithOffer: boolean
  featuredCamping: boolean
  discountType: typeof DISCOUNT_TYPES
  discountAmount: number
  startDate: string
  endDate: string
  type: typeof CAMPING_TYPES
  createdAt: string
  updatedAt: string
  deletedAt: any

  logo?: string | null
  metaTitle: string
  metaDescription: string
  startTime: string
  endTime: string
  timezone: string
  configuration: {
    vendorEligibilityType:
      (typeof VENDOR_ELIGIBILITY)[keyof typeof VENDOR_ELIGIBILITY] | undefined
    maxParticipatingVendor?: number
    productEligibilityType:
      (typeof PRODUCT_ELIGIBILITY)[keyof typeof PRODUCT_ELIGIBILITY] | undefined
    maxProductPerVendor?: number
  }
  participationMode?: (
    "INVITED_ONLY" | "AUTOMATIC" | "REQUEST_APPROVAL" | undefined
  )[]
  minimumOrderValue?: number
  maximumDiscount?: number
  customerUsageLimit?: number
  totalRedemptions?: number
  perVendorRedemptionLimit?: number
  termsAndConditions?: string
  termsAndConditionsFiles?: string[]
  vendorEligibilityType: "ALL" | "SELECTED" | "INVITED_ONLY"
  offerType:
    | "FIXED_AMOUNT"
    | "PERCENTAGE_DISCOUNT"
    | "BUY_X_GET_Y"
    | "FREE_SHIPPING"
    | "BUNDLE_OFFER"
    | "CASHBACK"
    | "COUPON_CAMPAIGN"
    | undefined
}
