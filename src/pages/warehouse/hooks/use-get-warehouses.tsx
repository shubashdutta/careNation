import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"

import type { IApiResponseType, IApiErrorResponse } from "@/lib/type"
import type { IWarehouse } from "../type"

const useGetWarehouses = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") ?? ""
  console.log("search", search)

  const getWarehouses = async () => {
    const response = await axiosInstance.get(END_POINT.WAREHOUSE.LIST, {
      params: {
        search: search || undefined,
      },
    })

    return response.data
  }

  const { data, isLoading } = useQuery<
    IApiResponseType<IWarehouse[]>,
    IApiErrorResponse
  >({
    queryKey: [KEYS.warehouses, search],
    queryFn: getWarehouses,
  })

  return {
    data: data?.data,
    isLoading,
  }
}

export default useGetWarehouses
