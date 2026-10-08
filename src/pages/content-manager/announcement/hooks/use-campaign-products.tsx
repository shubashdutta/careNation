// features/campaign/hooks/use-campaign-products.ts
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import { KEYS } from "@/constant/keys"
import type { IApiResponseType } from "@/lib/type"

const useCampaignProducts = (campaignId: string) => {
  return useQuery<IApiResponseType<any[]>>({
    queryKey: [KEYS.campaignProduct, campaignId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/camping-product/${campaignId}`)
      return res.data
    },
    enabled: !!campaignId,
  })
}

export default useCampaignProducts
