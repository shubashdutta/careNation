import { AxiosError } from "axios";
import {
  type FieldValues,
  type Path,
  type UseFormSetError,
} from "react-hook-form";
import { toast } from "react-toastify";
import type { IApiErrorResponse } from "./type";

type FieldError = {
  path: string;
  msg: string;
};

type ErrorData = {
  statusCode?: number;
  message?: string;
  errors?: Array<{ path: string; msg: string }> | string;
};

const handleErrors = <T extends FieldValues>(
  error: AxiosError<{ message: string; errors?: FieldError[] | string }>,
  setError: UseFormSetError<T>,
  path?: keyof T,
): void => {
  const errorData = error.response?.data;

  if (path) {
    const errorValue = Array.isArray(errorData?.errors)
      ? JSON.stringify(errorData.errors)
      : errorData?.errors || "Unknown error";
    setError(path as Path<T>, {
      type: "server",
      message: errorValue as string,
    });
  } else if (errorData?.errors && Array.isArray(errorData.errors)) {
    errorData.errors.forEach(({ path, msg }) => {
      setError(path as Path<T>, { type: "server", message: msg });
    });
  } else if (errorData?.message) {
    setError("root" as Path<T>, { type: "server", message: errorData.message });
  }
};

export const handleApiError = <T extends FieldValues>(
  error: IApiErrorResponse,
  setError?: UseFormSetError<T>,
) => {
  const errorData: ErrorData = error?.response?.data || {};

  if (errorData?.statusCode === 422) {
    if (Array.isArray(errorData.errors) && setError) {
      handleErrors(error, setError);
    } else {
      toast.error(
        typeof errorData.errors === "string"
          ? errorData.errors
          : "Validation error",
      );
    }
  } else {
    toast.error(errorData?.message || "An unexpected error occurred");
  }
};
