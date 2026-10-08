import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  ForgotPasswordFormSchema,
  type ForgotPasswordFormSchemaType,
} from "../schema";
import axiosInstance from "@/lib/axios-instance";
import { END_POINT } from "@/constant/end-point";
import { toast } from "react-toastify";
import { PATH } from "@/constant/path";
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type";
import { handleApiError } from "@/lib/handle-api-error";
import { useNavigate } from "react-router-dom";

const forgotPassword = async (data: ForgotPasswordFormSchemaType) => {
  const payload = {
    email: data.email,
  };

  const response = await axiosInstance.post(
    END_POINT.AUTH.FORGOT_PASSWORD,
    payload,
  );
  return response.data;
};

const useForgotPassword = () => {
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<null>,
    IApiErrorResponse,
    ForgotPasswordFormSchemaType
  >({
    mutationFn: forgotPassword,
    onSuccess: (res) => {
      toast.success(res.message ?? "Password reset link sent to your email");
      navigate(PATH.auth.login);
    },
    onError: (err) => {
      handleApiError(err, form.setError);
    },
  });

  const onSubmit = (data: ForgotPasswordFormSchemaType) => mutate(data);

  return { form, onSubmit, isPending, error };
};

export default useForgotPassword;
