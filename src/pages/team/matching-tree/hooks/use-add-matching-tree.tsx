import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { IMatchingTree } from "../type"
import type { MatchingTreeSchemaType } from "../schema"

const useAddMatchingTree = (onSuccess?: (data: IMatchingTree) => void) => {
  const queryClient = useQueryClient()

  const AddMatchingTree = async (data: MatchingTreeSchemaType) => {
    const response = await axiosInstance.post(END_POINT.FILE, data)
    return response.data
  }

  const { mutate, isPending, error, data } = useMutation<
    IApiResponseType<IMatchingTree>,
    IApiErrorResponse,
    MatchingTreeSchemaType
  >({
    mutationFn: AddMatchingTree,
    onSuccess: (res) => {
      if (res?.data) {
        //@ts-ignore
        onSuccess?.(res.data)
      } else {
        onSuccess?.({} as IMatchingTree)
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
    AddMatchingTree: mutate,
    treeData: data?.data,
  }
}

export default useAddMatchingTree
