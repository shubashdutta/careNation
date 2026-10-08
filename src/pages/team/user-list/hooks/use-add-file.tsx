import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { FileFormSchemaType } from "../schema"
import type { IFile } from "../type"

const useAddFile = (onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const addFile = async (data: FileFormSchemaType) => {
    const response = await axiosInstance.post(END_POINT.FILE, data)
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<IFile>,
    IApiErrorResponse,
    FileFormSchemaType
  >({
    mutationFn: addFile,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.fileManager] })
      toast.success(res?.message ?? "File created successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create File. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    addFile: mutate,
  }
}

export default useAddFile
