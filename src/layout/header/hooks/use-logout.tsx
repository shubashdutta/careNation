import { useMutation } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { REFRESH_TOKEN } from "@/constant"
import { PATH } from "@/constant/path"
import { clearAllCookies, getCookie } from "@/utils"
import { handleApiError } from "@/lib/handle-api-error"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"

const useLogout = () => {
  const navigate = useNavigate()

  const logoutUser = async () => {
    const refreshToken = getCookie(REFRESH_TOKEN)
    if (!refreshToken) throw new Error("No refresh token found")

    const response = await axiosInstance.post(END_POINT.AUTH.LOGOUT, {
      refresh: refreshToken,
    })

    return response.data
  }

  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation<IApiResponseType<null>, IApiErrorResponse, void>({
    mutationFn: logoutUser,
    onSuccess: (res) => {
      clearAllCookies()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      toast.success(res.status || "Logged out successfully")
      navigate(PATH.auth.login)
    },
    onError: (err) => {
      handleApiError(err)
    },
  })

  return { logout, isPending, error }
}

export default useLogout
