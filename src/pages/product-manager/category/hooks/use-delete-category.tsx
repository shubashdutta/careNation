import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"

const useDeleteCategory = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient()

  const deleteCategory = async (id: string) => {
    const response = await axiosInstance.delete(`${id}`)
    return response.data
  }

  const { mutate, isPending } = useMutation<
    IApiResponseType<null>,
    IApiErrorResponse,
    string
  >({
    mutationFn: deleteCategory,
    onSuccess: (res) => {
      onSuccess?.()
      queryClient.invalidateQueries({ queryKey: [KEYS.categories] })
      toast.success(res?.message || "Category deleted successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete category. Please try again."
      )
    },
  })

  return {
    isPending,
    deleteCategory: mutate,
  }
}

export default useDeleteCategory
