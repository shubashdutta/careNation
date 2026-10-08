// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import axiosInstance from "@/lib/axios-instance"
// import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
// import { toast } from "react-toastify"
// import { END_POINT } from "@/constant/end-point"
// import { KEYS } from "@/constant/keys"
// import type { CampaignFormSchemaType } from "../schema"
// import type { ICampaign } from "../type"

// export interface CampaignPayload {
//   name?: string
//   slug?: string
//   description?: string
//   bannerImage?: string
//   bannerThumbnail?: string
//   autoApplyDiscount: boolean
//   couponCode: boolean
//   stackWithOffer: boolean
//   featuredCamping: boolean
//   discountType: "PERCENTAGE" | "FIXED_AMOUNT"
//   discountAmount: number
//   startDate?: string
//   endDate?: string
//   type?: string
//   configuration: {
//     vendorEligibilityType: string
//     maxParticipatingVendor?: number
//     productEligibilityType: string
//     maxProductPerVendor?: number
//   }
// }

// export const transformFormToPayload = (
//   data: CampaignFormSchemaType
// ): CampaignPayload => {
//   const {
//     vendorEligibilityType,
//     maxParticipatingVendor,
//     productEligibilityType,
//     maxProductPerVendor,
//     stackWithOtherOffer,
//     startTime,
//     endTime,
//     timezone,
//     offerType,
//     participationMode,
//     minimumOrderValue,
//     maximumDiscount,
//     customerUsageLimit,
//     totalRedemptions,
//     perVendorRedemptionLimit,
//     termsAndConditions,
//     termsAndConditionsFiles,
//     ...rest
//   } = data

//   return {
//     ...rest,
//     stackWithOffer: stackWithOtherOffer,
//     configuration: {
//       vendorEligibilityType: vendorEligibilityType || "ALL",
//       maxParticipatingVendor: maxParticipatingVendor
//         ? Number(maxParticipatingVendor)
//         : undefined,
//       productEligibilityType: productEligibilityType || "ALL",
//       maxProductPerVendor: maxProductPerVendor
//         ? Number(maxProductPerVendor)
//         : undefined,
//     },
//   }
// }

// const useAddCampaign = (onSuccess: () => void) => {
//   const queryClient = useQueryClient()

//   const addCampaign = async (formData: CampaignFormSchemaType) => {
//     const payload = transformFormToPayload(formData)

//     const response = await axiosInstance.post(
//       END_POINT.CAMPAIGN.CREATE,
//       payload
//     )
//     return response.data
//   }

//   const { mutate, isPending, error } = useMutation<
//     IApiResponseType<ICampaign>,
//     IApiErrorResponse,
//     CampaignFormSchemaType
//   >({
//     mutationFn: addCampaign,
//     onSuccess: (res) => {
//       onSuccess()
//       queryClient.invalidateQueries({ queryKey: [KEYS.campaigns] })
//       toast.success(res?.message ?? "Campaign created successfully")
//     },
//     onError: (error) => {
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to create Campaign. Please try again."
//       )
//     },
//   })

//   return {
//     isPending,
//     error,
//     addCampaign: mutate,
//   }
// }

// export default useAddCampaign

// features/campaign/hooks/use-add-campaign.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { CampaignFormSchemaType } from "../schema"
import type { ICampaign } from "../type"

export interface CampaignPayload {
  name?: string
  slug?: string
  description?: string
  bannerImage?: string
  bannerThumbnail?: any
  autoApplyDiscount: boolean
  couponCode: boolean
  stackWithOffer: boolean
  featuredCamping: boolean
  discountType: "PERCENTAGE" | "FIXED_AMOUNT"
  discountAmount: number
  startDate?: string
  endDate?: string
  type?: string
  configuration: {
    vendorEligibilityType: string
    maxParticipatingVendor?: number
    productEligibilityType: string
    maxProductPerVendor?: number
  }
}

export const transformFormToPayload = (
  data: CampaignFormSchemaType
): CampaignPayload => {
  const {
    vendorEligibilityType,
    maxParticipatingVendor,
    productEligibilityType,
    maxProductPerVendor,
    stackWithOtherOffer,
    startTime,
    endTime,
    timezone,
    offerType,
    participationMode,
    minimumOrderValue,
    maximumDiscount,
    customerUsageLimit,
    totalRedemptions,
    perVendorRedemptionLimit,
    termsAndConditions,
    termsAndConditionsFiles,
    ...rest
  } = data

  return {
    ...rest,
    stackWithOffer: stackWithOtherOffer,
    configuration: {
      vendorEligibilityType: vendorEligibilityType || "ALL",
      maxParticipatingVendor: maxParticipatingVendor
        ? Number(maxParticipatingVendor)
        : undefined,
      productEligibilityType: productEligibilityType || "ALL",
      maxProductPerVendor: maxProductPerVendor
        ? Number(maxProductPerVendor)
        : undefined,
    },
  }
}

const useAddCampaign = (onSuccess: (campaign: ICampaign) => void) => {
  const queryClient = useQueryClient()

  const addCampaign = async (formData: CampaignFormSchemaType) => {
    const payload = transformFormToPayload(formData)
    const response = await axiosInstance.post(
      END_POINT.CAMPAIGN.CREATE,
      payload
    )
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<ICampaign>,
    IApiErrorResponse,
    CampaignFormSchemaType
  >({
    mutationFn: addCampaign,
    onSuccess: (res) => {
      //@ts-ignore
      onSuccess(res.data)
      queryClient.invalidateQueries({ queryKey: [KEYS.campaigns] })
      toast.success(res?.message ?? "Campaign created successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create Campaign. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    addCampaign: mutate,
  }
}

export default useAddCampaign
