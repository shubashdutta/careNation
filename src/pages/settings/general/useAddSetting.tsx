import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"

// Accept the flattened payload sent from handleSubmit
export const buildSettingPayload = (data: Record<string, any>) => ({
  companyName: data.companyName ?? null,
  companyEmail: data.companyEmail ?? null,
  companyPhone: data.companyPhone ?? null,
  companyAddress: data.companyAddress ?? null,
  website: data.website ?? null,
  facebook: data.facebook ?? null,
  instagram: data.instagram ?? null,
  x: data.x ?? null,
  linkedin: data.linkedin ?? null,
  youtube: data.youtube ?? null,
  tiktok: data.tiktok ?? null,
})

const useAddSetting = (onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const addSetting = async (data: Record<string, any>) => {
    const response = await axiosInstance.post(
      "/general-setting",
      buildSettingPayload(data)
    )
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<any>,
    IApiErrorResponse,
    Record<string, any>
  >({
    mutationFn: addSetting,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.settings] })
      toast.success(res?.message ?? "Setting saved successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to save setting. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    addSetting: mutate,
  }
}

export default useAddSetting
