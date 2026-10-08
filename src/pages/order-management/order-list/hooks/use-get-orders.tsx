import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { IApiResponseType } from "@/lib/type"
import type { IOrder } from "../type"

const useGetOrders = () => {
  const [searchParams] = useSearchParams()

  const search = searchParams.get("search") ?? ""
  const status = searchParams.get("status") ?? ""
  const order = searchParams.get("order") ?? ""
  const page = searchParams.get("page") ?? "1"
  const perPage = searchParams.get("perPage") ?? "10"

  const getOrders = async () => {
    const response = await axiosInstance.get<IApiResponseType<IOrder[]>>(
      END_POINT.ORDER.LIST,
      {
        params: {
          search: search || undefined,
          status: status || undefined,
          order: order || undefined,
          page,
          perPage,
        },
      }
    )
    return response.data
  }

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [KEYS.orders, { search, status, order, page, perPage }],
    queryFn: getOrders,
  })

  return {
    orders: data?.data ?? [],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    paginationData: data?.pagination,
    isLoading: isLoading || isFetching,
    error,
  }
}

export default useGetOrders
