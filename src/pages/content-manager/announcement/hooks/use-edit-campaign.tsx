import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { CampaignFormSchemaType } from "../schema"
import type { ICampaign } from "../type"
import { transformFormToPayload } from "./use-add-campaign"

const useEditCampaign = (campaign: ICampaign, onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const editCampaign = async (data: CampaignFormSchemaType) => {
    const payload = transformFormToPayload(data)

    const response = await axiosInstance.put(
      END_POINT.CAMPAIGN.UPDATE.replace(":id", campaign.id),
      payload
    )
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<ICampaign>,
    IApiErrorResponse,
    CampaignFormSchemaType
  >({
    mutationFn: editCampaign,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.campaigns] })
      toast.success(res?.message ?? "Campaign updated successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update Campaign. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    editCampaign: mutate,
  }
}

export default useEditCampaign
