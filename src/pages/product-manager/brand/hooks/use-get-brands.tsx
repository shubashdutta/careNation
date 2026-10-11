import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { IApiResponseType } from "@/lib/type"
import type { IBrand } from "../type"

const useGetBrands = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") ?? ""
  const page = searchParams.get("page") ?? "1"
  const limit = searchParams.get("limit") ?? "50"

  const getBrands = async () => {
    const response = await axiosInstance.get<IApiResponseType<IBrand[]>>(
      END_POINT.BRAND.LIST,
      {
        params: {
          search: search || undefined,
          page: Number(page),
          limit: Number(limit),
        },
      }
    )
    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryKey: [KEYS.brands, { search, page, limit }],
    queryFn: getBrands,
  })

  return {
    data: data?.data,
    isLoading,
    error,
  }
}

export default useGetBrands
