import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"

const useGetBrandDetail = (id: string) => {
  const { data, isLoading, error } = useQuery<
    IApiResponseType<any>,
    IApiErrorResponse
  >({
    queryKey: [KEYS.brands, id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        END_POINT.BRAND.DETAIL.replace(":id", id)
      )
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

export default useGetBrandDetail
