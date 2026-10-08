import { z } from "zod"

export const OfferTypeEnum = z.enum([
  "PERCENTAGE_DISCOUNT",
  "FIXED_AMOUNT",
  "BUY_X_GET_Y",
  "FREE_SHIPPING",
  "BUNDLE_OFFER",
  "CASHBACK",
  "COUPON_CAMPAIGN",
])

export const VendorEligibilityEnum = z.enum([
  "ALL",
  "VERIFIED_ONLY",
  "PREMIUM_VENDORS",
  "SELECTED_VENDORS",
])

export const ParticipationModeEnum = z.enum([
  "AUTOMATIC",
  "REQUEST_APPROVAL",
  "INVITED_ONLY",
])

export const ProductEligibilityEnum = z.enum([
  "ALL",
  "ONLY_ELECTRONICS",
  "SELECTED_CATEGORY",
  "SELECTED_BRANDS",
  "SELECTED_PRODUCT",
])

export const CampaignBadgeEnum = z.enum([
  "FESTIVAL",
  "FLASH_SALE",
  "EXCLUSIVE",
  "TRENDING",
  "LIMITED_TIME",
])

export type OfferType = z.infer<typeof OfferTypeEnum>
export type VendorEligibilityType = z.infer<typeof VendorEligibilityEnum>
export type ParticipationModeType = z.infer<typeof ParticipationModeEnum>
export type ProductEligibilityType = z.infer<typeof ProductEligibilityEnum>
export type CampaignBadgeType = z.infer<typeof CampaignBadgeEnum>

export const CampaignFormSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  slug: z.string().optional(),
  description: z.string().optional(),
  type: CampaignBadgeEnum.optional(),
  bannerImage: z.any().optional(),
  bannerThumbnail: z.any().optional(),

  themeColor: z.string().optional(),

  offerType: OfferTypeEnum.optional(),
  autoApplyDiscount: z.boolean().default(false),
  stackWithOtherOffer: z.boolean().default(false),
  couponCode: z.boolean().default(false),
  featuredCamping: z.boolean().default(false),

  vendorEligibilityType: VendorEligibilityEnum.default("ALL"),
  participationMode: z.array(ParticipationModeEnum).optional(),
  maxProductPerVendor: z.coerce.number().optional(),
  maxParticipatingVendor: z.coerce.number().optional(),

  productEligibilityType: ProductEligibilityEnum.default("ALL"),

  discountType: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]).default("PERCENTAGE"),
  discountAmount: z.coerce
    .number()
    .min(1, "Discount amount must be at least 1"),

  startDate: z.string().optional(),
  endDate: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  timezone: z.string().optional(),

  minimumOrderValue: z.coerce.number().optional(),
  maximumDiscount: z.coerce.number().optional(),
  customerUsageLimit: z.coerce.number().optional(),
  totalRedemptions: z.coerce.number().optional(),
  perVendorRedemptionLimit: z.coerce.number().optional(),
  termsAndConditions: z.string().optional(),
  termsAndConditionsFiles: z.array(z.instanceof(File)).optional(),
})

export type CampaignFormSchemaType = z.infer<typeof CampaignFormSchema>

