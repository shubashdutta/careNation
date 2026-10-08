import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { HomeSectionFormSchemaType } from "../schema"
import type { IHomeSection } from "../type"

export const buildHomeSectionPayload = (data: HomeSectionFormSchemaType) => ({
  sectionName: data.sectionName,
  heroText: data.heroText,
  marketPlaceText: data.marketPlaceText.map((item) => item.value),
  supportingText: data.supportingText.map((item) => item.value),
  marketPlace: data.marketPlace.map((item) => item.value),
  sectionSubtitle: data.sectionSubtitle,
  sectionImage: typeof data.sectionImage === "string" ? data.sectionImage : "",
  services: data.services.map((service) => ({
    ...service,
    sortOrder: Number(service.sortOrder),
    sectionImage:
      typeof service.sectionImage === "string" ? service.sectionImage : "",
  })),
})

const useEditHomeSection = (onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const editHomeSection = async (data: HomeSectionFormSchemaType) => {
    const response = await axiosInstance.put(
      `${END_POINT.CMS.HOME_SECTION}`,
      buildHomeSectionPayload(data)
    )
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<IHomeSection>,
    IApiErrorResponse,
    HomeSectionFormSchemaType
  >({
    mutationFn: editHomeSection,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.homeSection] })
      toast.success(res?.message ?? "Home section updated successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update home section. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    editHomeSection: mutate,
  }
}

export default useEditHomeSection
