import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { FileFormSchemaType } from "../schema"
import type { IFile } from "../type"

const buildPayload = (data: FileFormSchemaType) => {
  const formData = new FormData()
  formData.append("name", data.name)
  formData.append("slug", data.url)
  formData.append("description", data.description)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (data.file instanceof File) formData.append("file", data.file)

  return formData
}

const useEditFile = (File: IFile, onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const editFile = async (data: FileFormSchemaType) => {
    const response = await axiosInstance.put(
      `${END_POINT.FILE}/${File.id}`,
      buildPayload(data),
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<IFile>,
    IApiErrorResponse,
    FileFormSchemaType
  >({
    mutationFn: editFile,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.fileManager] })
      toast.success(res?.message ?? "File updated successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update File. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    editFile: mutate,
  }
}

export default useEditFile
