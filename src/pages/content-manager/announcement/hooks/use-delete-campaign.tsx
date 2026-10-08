import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"
import { END_POINT } from "@/constant/end-point"

const useDeleteCampaign = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient()

  const deleteCampaignData = async (ids: string | string[]) => {
    const response = await axiosInstance.delete(
      END_POINT.CAMPAIGN.DELETE.replace(":id", ids.toString())
    )
    return response.data
  }

  const { mutate, isPending } = useMutation<
    IApiResponseType<null>,
    IApiErrorResponse,
    string | string[]
  >({
    mutationFn: deleteCampaignData,
    onSuccess: (res) => {
      onSuccess?.()
      queryClient.invalidateQueries({ queryKey: [KEYS.campaigns] })
      toast.success(res?.message || "Campaign deleted successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete Campaign. Please try again."
      )
    },
  })

  const deleteCampaign = (ids: string | string[]) => {
    console.log("Calling deleteCampaign with ids:", ids)
    mutate(ids)
  }

  return {
    isPending,
    deleteCampaign,
  }
}

export default useDeleteCampaign
