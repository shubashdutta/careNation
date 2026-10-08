import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"

// Accept the flattened payload sent from handleSubmit
export const buildAboutUsPayload = (data: Record<string, any>) => ({
  title: data.title ?? null,
  description: data.description ?? null,
  image: data.image ?? null,
})

const useAddAboutUs = (onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const addAboutUs = async (data: Record<string, any>) => {
    const response = await axiosInstance.post(
      "/about-us",
      buildAboutUsPayload(data)
    )
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<any>,
    IApiErrorResponse,
    Record<string, any>
  >({
    mutationFn: addAboutUs,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.about] })
      toast.success(res?.message ?? "AboutUs saved successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to save AboutUs. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    addAboutUs: mutate,
  }
}

export default useAddAboutUs
