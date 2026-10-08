import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { IHomeRoot } from "../type"

const useGetHomeSection = () => {
  const { data, isLoading, error } = useQuery<
    IApiResponseType<IHomeRoot> | null,
    IApiErrorResponse
  >({
    queryKey: [KEYS.homeSection],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(END_POINT.CMS.HOME_SECTION)
        return response.data
      } catch (err) {
        const status = (err as IApiErrorResponse)?.response?.status
        if (status === 404) return null
        throw err
      }
    },
  })

  return {
    //@ts-ignore
    data: data?.data?.[0] ?? null,
    isLoading,
    error,
  }
}

export default useGetHomeSection
