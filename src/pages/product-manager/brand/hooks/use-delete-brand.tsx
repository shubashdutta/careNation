import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"
import { END_POINT } from "@/constant/end-point"

const useDeleteBrand = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient()

  const deleteBrandData = async (ids: string | string[]) => {
    const response = await axiosInstance.delete(
      END_POINT.BRAND.DELETE.replace(":id", ids.toString())
    )
    return response.data
  }

  const { mutate, isPending } = useMutation<
    IApiResponseType<null>,
    IApiErrorResponse,
    string | string[]
  >({
    mutationFn: deleteBrandData,
    onSuccess: (res) => {
      onSuccess?.()
      queryClient.invalidateQueries({ queryKey: [KEYS.brands] })
      toast.success(res?.message || "Brand deleted successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete brand. Please try again."
      )
    },
  })

  const deleteBrand = (ids: string | string[]) => {
    console.log("Calling deleteBrand with ids:", ids)
    mutate(ids)
  }

  return {
    isPending,
    deleteBrand,
  }
}

export default useDeleteBrand
