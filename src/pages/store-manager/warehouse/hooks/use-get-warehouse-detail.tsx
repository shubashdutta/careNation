import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IWarehouse } from "../type"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"

const useGetWarehouseDetail = (id: string) => {
  const { data, isLoading, error } = useQuery<
    IApiResponseType<IWarehouse>,
    IApiErrorResponse
  >({
    queryKey: [KEYS.warehouses, id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        END_POINT.WAREHOUSE.DETAIL.replace(":id", id)
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

export default useGetWarehouseDetail
