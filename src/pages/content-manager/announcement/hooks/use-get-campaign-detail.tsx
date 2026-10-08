import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { ICampaign } from "../type"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import { useParams } from "react-router-dom"

const useGetCampaignDetail = () => {
  const id = useParams().id
  console.log("id", id)

  const { data, isLoading, error } = useQuery<
    IApiResponseType<ICampaign>,
    IApiErrorResponse
  >({
    queryKey: [KEYS.campaigns, id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        END_POINT.CAMPAIGN.DETAIL.replace(":id", String(id))
      )
      console.log(END_POINT.CAMPAIGN.DETAIL.replace(":id", String(id)))
      console.log("response", response)
      return response.data
    },
    enabled: Boolean(id),
  })

  return {
    data: data?.data,
    isLoading,
    error,
  }
}

export default useGetCampaignDetail
