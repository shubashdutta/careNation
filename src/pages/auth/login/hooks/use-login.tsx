import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { LoginFormSchema, type LoginFormSchemaType } from "../schema"
import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import { toast } from "react-toastify"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant"
import { PATH } from "@/constant/path"
import type { IApiErrorResponse } from "@/lib/type"
import { setCookie } from "@/utils"
import { handleApiError } from "@/lib/handle-api-error"

interface ILoginResponse {
  refreshToken: string
  accessToken: string
}

const login = async (data: LoginFormSchemaType) => {
  const payload = {
    email: data.email,
    password: data.password,
  }

  const response = await axiosInstance.post(END_POINT.AUTH.LOGIN, payload)
  return response.data
}

const useLogin = () => {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate, isPending, error } = useMutation<
    {
      data: ILoginResponse
      message: string
    },
    IApiErrorResponse,
    LoginFormSchemaType
  >({
    mutationFn: login,
    onSuccess: (res) => {
      console.log("login response", res)
      setCookie({
        cookieName: ACCESS_TOKEN,
        value: res.data.accessToken,
      })
      setCookie({
        cookieName: REFRESH_TOKEN,
        value: res.data.refreshToken,
      })
      toast.success(res.message ?? "Login successful")
      setTimeout(() => {
        window.location.href = PATH.dashboard.dashboard
      }, 500)
    },
    onError: (err) => {
      handleApiError(err, form.setError)
    },
  })

  const onSubmit = (data: LoginFormSchemaType) => mutate(data)

  return { form, onSubmit, isPending, error }
}

export default useLogin
