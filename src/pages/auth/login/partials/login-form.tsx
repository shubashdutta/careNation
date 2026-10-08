import useLogin from "../hooks/use-login"
import { Form } from "@/components/ui/form"
import AuthLayout from "../../layout/auth-layout"
import { InputField } from "@/components/extended-components/extended-input"
import ExtendedButton from "@/components/extended-components/extended-button"
import { PATH } from "@/constant/path"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const navigate = useNavigate()
  const { onSubmit, form, isPending } = useLogin()

  return (
    <AuthLayout>
      <h1 className="text-center text-4xl font-semibold tracking-tight text-[#2f234f] sm:text-[42px]">
        Care Nation
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[342px]"
        >
          <div className="flex w-full flex-col gap-4 rounded-lg border border-white/60 bg-[#d8e0f2]/70 p-6 shadow-[0_10px_28px_rgba(47,35,79,0.12)] backdrop-blur-[2px]">
            <InputField
              name="email"
              placeholder="Enter mobile number or email "
              type="email"
              label="Mobile Number or Email"
              className="h-10 rounded-md border-white bg-white px-3 text-xs text-[#2f234f] placeholder:text-[#c4c6d0] focus:border-white focus:ring-2 focus:ring-white/50"
            />
            <InputField
              name="password"
              placeholder="Enter your password"
              type="password"
              label="Password"
              isPassword
              className="h-10 rounded-md border-white bg-white px-3 text-xs text-[#2f234f] placeholder:text-[#c4c6d0] focus:border-white focus:ring-2 focus:ring-white/50"
            />

            <p
              onClick={() => navigate(PATH.auth.forgotPassword)}
              className="cursor-pointer text-right text-sm font-light text-[#493b6e] transition-colors hover:text-[#2f234f]"
            >
              Forgot Password?
            </p>

            <ExtendedButton
              type="submit"
              className="mt-5 w-full"
              isLoading={isPending}
              text={isPending ? "Logging in..." : "Login"}
              disabled={isPending}
            />
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}

export default LoginForm
