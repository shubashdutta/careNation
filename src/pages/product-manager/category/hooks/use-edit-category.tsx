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
    status: data.status,
    description: data.description,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    parentId: data.parentId,
    logo: data.logo,
  }
}

const useEditCategory = (category: ICategory, onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const editCategory = async (data: CategoryFormSchemaType) => {
    const response = await axiosInstance.put(
      `${category.id}`,
      buildPayload(data)
    )
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<ICategory>,
    IApiErrorResponse,
    CategoryFormSchemaType
  >({
    mutationFn: editCategory,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.categories] })
      toast.success(res?.message ?? "Category updated successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update category. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    editCategory: mutate,
  }
}

export default useEditCategory
