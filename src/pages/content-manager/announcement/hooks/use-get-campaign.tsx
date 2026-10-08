import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { IApiResponseType } from "@/lib/type"
import type { ICampaign } from "../type"

const useGetCampaigns = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") ?? ""

  const getCampaigns = async () => {
    const response = await axiosInstance.get<IApiResponseType<ICampaign[]>>(
      END_POINT.CAMPAIGN.LIST,
      {
        params: { search: search || undefined },
      }
    )
    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryKey: [KEYS.campaigns, { search }],
    queryFn: getCampaigns,
  })

  return {
    data: data?.data,
    isLoading,
    error,
  }
}

export default useGetCampaigns
