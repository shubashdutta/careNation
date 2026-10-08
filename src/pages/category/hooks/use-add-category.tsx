import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"
import type { CategoryFormSchemaType } from "../schema"
import type { ICategory } from "../type"

const buildPayload = (data: CategoryFormSchemaType) => {
  return {
    name: data.name,
    slug: data.slug,
    logo: data.logo,
    description: data.description,
    parentId: data?.parentId,
    sortOrder: data.sortOrder ?? 0,
  }
}

const useAddCategory = (onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const addCategory = async (data: CategoryFormSchemaType) => {
    const response = await axiosInstance.post("", buildPayload(data))
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<ICategory>,
    IApiErrorResponse,
    CategoryFormSchemaType
  >({
    mutationFn: addCategory,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.categories] })
      toast.success(res?.message ?? "Category created successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create category. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    addCategory: mutate,
  }
}

export default useAddCategory
