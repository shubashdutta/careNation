import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"
import z from "zod"

export interface ChangePasswordResponse {
  newPassword: string
  confirmPassword: string
}

// Fixed: Wrap schema in z.object and add password match validation
export const ChangePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "New Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>

const useChangePassword = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  const changePasswordApi = async (data: ChangePasswordSchemaType) => {
    const payload = {
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    }
    // Update endpoint as necessary
    const response = await axiosInstance.post("", payload)
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<ChangePasswordResponse>,
    IApiErrorResponse,
    ChangePasswordSchemaType
  >({
    mutationFn: changePasswordApi,
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
    ChangePassword: mutate,
  }
}

export default useChangePassword
