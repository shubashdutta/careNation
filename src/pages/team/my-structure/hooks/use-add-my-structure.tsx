import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { IMyStructure } from "../type"
import type { MyStructureSchemaType } from "../schema"

const useAdMyStructure = (onSuccess?: (data: IMyStructure) => void) => {
  const queryClient = useQueryClient()

  const AdMyStructure = async (data: MyStructureSchemaType) => {
    const response = await axiosInstance.post(END_POINT.FILE, data)
    return response.data
  }

  const { mutate, isPending, error, data } = useMutation<
    IApiResponseType<IMyStructure>,
    IApiErrorResponse,
    MyStructureSchemaType
  >({
    mutationFn: AdMyStructure,
    onSuccess: (res) => {
      if (res?.data) {
        //@ts-ignore
        onSuccess?.(res.data)
      } else {
        onSuccess?.({} as IMyStructure)
      }

      queryClient.invalidateQueries({ queryKey: [KEYS.fileManager] })
      toast.success(res?.message ?? "Matching tree loaded successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch Matching Tree. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    AdMyStructure: mutate,
    treeData: data?.data,
  }
}

export default useAdMyStructure
