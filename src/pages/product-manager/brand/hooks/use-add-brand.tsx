import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { BrandFormSchemaType } from "../schema"
import type { IBrand } from "../type"

const useAddBrand = (onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const addBrand = async (data: BrandFormSchemaType) => {
    const response = await axiosInstance.post(END_POINT.BRAND.CREATE, data)
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<IBrand>,
    IApiErrorResponse,
    BrandFormSchemaType
  >({
    mutationFn: addBrand,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.brands] })
      toast.success(res?.message ?? "Brand created successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create brand. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    addBrand: mutate,
  }
}

export default useAddBrand
