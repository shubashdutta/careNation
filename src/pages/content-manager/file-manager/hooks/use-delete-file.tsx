import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { KEYS } from "@/constant/keys"
import { END_POINT } from "@/constant/end-point"

const useDeleteFile = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient()

  const deleteFileData = async (ids: string | string[]) => {
    const response = await axiosInstance.delete(
      `${END_POINT.FILE}/${ids.toString()}`
    )
    return response.data
  }

  const { mutate, isPending } = useMutation<
    IApiResponseType<null>,
    IApiErrorResponse,
    string | string[]
  >({
    mutationFn: deleteFileData,
    onSuccess: (res) => {
      onSuccess?.()
      queryClient.invalidateQueries({ queryKey: [KEYS.fileManager] })
      toast.success(res?.message || "File deleted successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete File. Please try again."
      )
    },
  })

  const deleteFile = (ids: string | string[]) => {
    console.log("Calling deleteFile with ids:", ids)
    mutate(ids)
  }

  return {
    isPending,
    deleteFile,
  }
}

export default useDeleteFile
