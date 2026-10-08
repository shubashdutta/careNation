import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"

interface ChangeStatusPayload {
  id: string
  status: "ACTIVE" | "INACTIVE"
}

const useChangeCategoryStatus = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient()

  const changeStatus = async ({ id, status }: ChangeStatusPayload) => {
    const response = await axiosInstance.put(`${id}`, { status })
    return response.data
  }

  const { mutate, isPending } = useMutation<
    IApiResponseType<null>,
    IApiErrorResponse,
    ChangeStatusPayload
  >({
    mutationFn: changeStatus,
    onSuccess: (res) => {
      onSuccess?.()
      queryClient.invalidateQueries({ queryKey: [KEYS.categories] })
      toast.success(res?.message ?? "Category status updated successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update status. Please try again."
      )
    },
  })

  return {
    isPending,
    handleStatusChange: mutate,
  }
}

export default useChangeCategoryStatus
