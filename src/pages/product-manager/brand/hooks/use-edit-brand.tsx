import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { BrandFormSchemaType } from "../schema"
import type { IBrand } from "../type"

const buildPayload = (data: BrandFormSchemaType) => {
  const formData = new FormData()
  formData.append("name", data.name)
  formData.append("slug", data.slug)
  formData.append("description", data.description)
  formData.append("isFeatured", String(data.isFeatured ?? false))
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (data.logo instanceof File) formData.append("logo", data.logo)

  return formData
}

const useEditBrand = (brand: IBrand, onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const editBrand = async (data: BrandFormSchemaType) => {
    const response = await axiosInstance.put(
      END_POINT.BRAND.UPDATE.replace(":id", brand.id),
      buildPayload(data),
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<IBrand>,
    IApiErrorResponse,
    BrandFormSchemaType
  >({
    mutationFn: editBrand,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.brands] })
      toast.success(res?.message ?? "Brand updated successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update brand. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    editBrand: mutate,
  }
}

export default useEditBrand
