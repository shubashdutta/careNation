//@ts-nocheck
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { CampaignProductSchemaType } from "../campaign-product"

const useAddCampaignProduct = (onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const addCampaignProduct = async (data: CampaignProductSchemaType) => {
    // LOOK HERE: confirm END_POINT.CAMPAIGN has an ADD_PRODUCT key
    // pointing at /api/v1/camping-product — add it to your endpoint
    // constants file if it isn't there yet.
    const response = await axiosInstance.post(
      END_POINT.CAMPAIGN.ADD_PRODUCT,
      data
    )
    return response.data
  }

  const { mutate, isPending } = useMutation<CampaignProductSchemaType>({
    mutationFn: addCampaignProduct,
    onSuccess: (res) => {
      onSuccess()
      // LOOK HERE: confirm this key matches whatever you use to list
      // products already attached to a campaign (for the table below)
      queryClient.invalidateQueries({ queryKey: [KEYS.campaignProduct] })
      toast.success(res?.message ?? "Product added to campaign")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to add product to campaign. Please try again."
      )
    },
  })

  return { addCampaignProduct: mutate, isPending }
}

export default useAddCampaignProduct
