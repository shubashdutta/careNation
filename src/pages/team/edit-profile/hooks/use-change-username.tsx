import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"
import z from "zod"

export interface ChangeUsernameResponse {
  newUsername: string
  confirmPin: string
}

export const ChangeUsernameSchema = z.object({
  newUsername: z.string().min(6, "New Username must be at least 6 characters"),
})

export type ChangeUsernameSchemaType = z.infer<typeof ChangeUsernameSchema>

const useChangeUsername = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  const ChangeUsernameApi = async (data: ChangeUsernameSchemaType) => {
    const payload = {
      newUsername: data.newUsername,
    }
    const response = await axiosInstance.post("", payload)
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<ChangeUsernameResponse>,
    IApiErrorResponse,
    ChangeUsernameSchemaType
  >({
    mutationFn: ChangeUsernameApi,
    onSuccess: (res) => {
      onSuccess?.()
      queryClient.invalidateQueries({ queryKey: [KEYS.profile] })
      toast.success(res?.message ?? "Password changed successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to change password. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    ChangeUsername: mutate,
  }
}

export default useChangeUsername
