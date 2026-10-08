import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { IApiResponseType } from "@/lib/type"
import type { IFile } from "../type"

const useGetFile = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") ?? ""
  const page = searchParams.get("page") ?? "1"
  const limit = searchParams.get("limit") ?? "50"

  const getFile = async () => {
    const response = await axiosInstance.get<IApiResponseType<IFile[]>>(
      END_POINT.FILE,
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
    queryKey: [KEYS.fileManager, { search, page, limit }],
    queryFn: getFile,
  })

  return {
    data: data?.data,
    isLoading,
    error,
  }
}

export default useGetFile
