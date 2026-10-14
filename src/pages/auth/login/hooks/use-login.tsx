import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormSchema, type LoginFormSchemaType } from "../schema"
import { toast } from "react-toastify"
import { PATH } from "@/constant/path"

// --- API call disabled for now ---
// import { useMutation } from "@tanstack/react-query"
// import axiosInstance from "@/lib/axios-instance"
// import { END_POINT } from "@/constant/end-point"
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant"
// import type { IApiErrorResponse } from "@/lib/type"
// import { setCookie } from "@/utils"
// import { handleApiError } from "@/lib/handle-api-error"

// interface ILoginResponse {
//   refreshToken: string
//   accessToken: string
// }

// const login = async (data: LoginFormSchemaType) => {
//   const payload = {
//     email: data.email,
//     password: data.password,
//   }
//
//   const response = await axiosInstance.post(END_POINT.AUTH.LOGIN, payload)
//   return response.data
// }

const useLogin = () => {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // API disabled: on submit, just show success and send the user to the dashboard
  const onSubmit = (_data: LoginFormSchemaType) => {
    toast.success("Login successful")
    setTimeout(() => {
      window.location.href = PATH.dashboard.dashboard
    }, 500)
  }

  return { form, onSubmit, isPending: false }
}

export default useLogin

