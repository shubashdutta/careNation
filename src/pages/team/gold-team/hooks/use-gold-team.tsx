import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { IGoldTeam } from "../type"
import type { GoldTeamSchemaType } from "../schema"

const createMockResponse = (
  userId: string,
  teamName: string
): IApiResponseType<IGoldTeam> => ({
  success: true,
  statusCode: 200,
  message: `${teamName} Team loaded from mock data`,
  data: {
    records: {
      id: userId,
      userId,
      name: "Anita Gautam",
      designation: "No Designation",
      dateOfJoining: "08/05/2025",
      introducerUserId: "9765235898",
      introducerName: "Achut Shrestha",
      members: [
        {
          id: "gold-team-1",
          doj: "22/02/2024",
          userId: "9765523564",
          name: "Hari Bahadur Karki",
          sponsorId: "345.00",
          placementId: "345.00",
          placement: "345.00",
          business: "345.00",
          rankClub: "345.00",
          status: "Solved",
          package: "345.00",
          mobile: "9856325698",
          emailId: "user@gmail.com",
          directs: "345.00",
        },
      ],
    },
    limit: 5,
    currentPage: 1,
    next: null,
    prev: null,
    totalPages: 1,
    totalRecords: 1,
    pagingCounter: 1,
    hasPrevious: false,
    hasNext: false,
    recordShown: 1,
  },
})

const useAdGoldTeam = (teamName = "Gold") => {
  const queryClient = useQueryClient()

  const AdGoldTeam = async (data: GoldTeamSchemaType) => {
    try {
      const response = await axiosInstance.post(END_POINT.FILE, data)
      return response.data?.data?.records
        ? response.data
        : createMockResponse(data.userId, teamName)
    } catch {
      return createMockResponse(data.userId, teamName)
    }
  }

  const { mutate, isPending, error, data } = useMutation<
    IApiResponseType<IGoldTeam>,
    IApiErrorResponse,
    GoldTeamSchemaType
  >({
    mutationFn: AdGoldTeam,
    onSuccess: (res) => {
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
    AdGoldTeam: mutate,
    treeData: data?.data.records,
  }
}

export default useAdGoldTeam
