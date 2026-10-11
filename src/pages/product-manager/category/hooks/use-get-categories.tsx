import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import axiosInstance from "@/lib/axios-instance"
import { KEYS } from "@/constant/keys"
import type { ICategoryRoot } from "../type"

const useGetCategories = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") ?? ""

  const getCategories = async () => {
    const response = await axiosInstance.get<ICategoryRoot>("", {
      params: { search: search || undefined },
    })
    return response.data
  }

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [KEYS.categories, { search }],
    queryFn: getCategories,
  })

  return {
    //@ts-ignore
    categories: data?.data ?? [],
    isLoading: isLoading || isFetching,
    error,
  }
}

export default useGetCategories
