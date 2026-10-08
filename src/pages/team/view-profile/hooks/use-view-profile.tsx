import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { IViewProfile } from "../type"
import type { ViewProfileSchemaType } from "../schema"

const useAdViewProfile = (onSuccess?: (data: IViewProfile) => void) => {
  const queryClient = useQueryClient()

  const AdViewProfile = async (data: ViewProfileSchemaType) => {
    const response = await axiosInstance.post(END_POINT.FILE, data)
    return response.data
  }

  const { mutate, isPending, error, data } = useMutation<
    IApiResponseType<IViewProfile>,
    IApiErrorResponse,
    ViewProfileSchemaType
  >({
    mutationFn: AdViewProfile,
    onSuccess: (res) => {
      if (res?.data) {
        //@ts-ignore
        onSuccess?.(res.data)
      } else {
        onSuccess?.({} as IViewProfile)
      }

      queryClient.invalidateQueries({ queryKey: [KEYS.fileManager] })
      toast.success(res?.message ?? "Matching tree loaded successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch Matching Tree. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    AdViewProfile: mutate,
    treeData: data?.data,
  }
}

export default useAdViewProfile
