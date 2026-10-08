import useForgotPassword from "../hooks/use-forgot-password";
import { Form } from "@/components/ui/form";
import AuthLayout from "../../layout/auth-layout";
import { InputField } from "@/components/extended-components/extended-input";
import ExtendedButton from "@/components/extended-components/extended-button";
import { PATH } from "@/constant/path";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { onSubmit, form, isPending } = useForgotPassword();

  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[350px] flex flex-col space-y-4 "
        >
          <h1 className="text-[36px] font-semibold">Forgot Password?</h1>
          <h1 className="text-base font-light text-left -mt-4 ">
            Enter your email to receive a reset link
          </h1>

          <div className="mt-4 w-full">
            <InputField
              name="email"
              placeholder="Enter your email"
              type="email"
              label="Email Address"
            />

            <ExtendedButton
              type="submit"
              className="w-full mt-5"
              isLoading={isPending}
              text={isPending ? "Sending..." : "Send Reset Link"}
              disabled={isPending}
            />

            <p
              onClick={() => navigate(PATH.auth.login)}
              className="text-sm text-center font-light text-tertiary-400 cursor-pointer mt-4"
            >
              Back to Login
            </p>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
