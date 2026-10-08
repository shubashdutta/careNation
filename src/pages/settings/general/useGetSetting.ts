import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { KEYS } from "@/constant/keys"

const useGetSetting = () => {
  const { data, isLoading, error } = useQuery<
    IApiResponseType<any> | null,
    IApiErrorResponse
  >({
    queryKey: [KEYS.settings],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/general-setting")
        console.log("response", response.data)
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
    data: data?.data,
    isLoading,
    error,
  }
}

export default useGetSetting
