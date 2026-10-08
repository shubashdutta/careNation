import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"
import z from "zod"

export interface changePinResponse {
  newPin: string
  confirmPin: string
}

export const changePinSchema = z
  .object({
    newPin: z.string().min(6, "New Password must be at least 6 characters"),
    confirmPin: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.newPin === data.confirmPin, {
    message: "Passwords do not match",
    path: ["confirmPin"],
  })

export type changePinSchemaType = z.infer<typeof changePinSchema>

const useChangePin = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  const changePinApi = async (data: changePinSchemaType) => {
    const payload = {
      newPin: data.newPin,
      confirmPin: data.confirmPin,
    }
    const response = await axiosInstance.post("", payload)
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<changePinResponse>,
    IApiErrorResponse,
    changePinSchemaType
  >({
    mutationFn: changePinApi,
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
    changePin: mutate,
  }
}

export default useChangePin
