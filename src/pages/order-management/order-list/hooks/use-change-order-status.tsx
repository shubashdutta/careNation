import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type";
import { toast } from "react-toastify";
import { KEYS } from "@/constant/keys";
import { END_POINT } from "@/constant/end-point";
import type { OrderStatus } from "../type";

interface ChangeStatusPayload {
  id: string;
  status: OrderStatus;
}

const useChangeOrderStatus = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  const changeStatus = async ({ id, status }: ChangeStatusPayload) => {
    const response = await axiosInstance.put(
      END_POINT.ORDER.UPDATE_STATUS.replace(":id", id),
      { status },
    );
    return response.data;
  };

  const { mutate, isPending } = useMutation<
    IApiResponseType<null>,
    IApiErrorResponse,
    ChangeStatusPayload
  >({
    mutationFn: changeStatus,
    onSuccess: (res) => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: [KEYS.orders] });
      toast.success(res?.message ?? "Order status updated successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update order status. Please try again.",
      );
    },
  });

  return {
    isPending,
    handleStatusChange: mutate,
  };
};

export default useChangeOrderStatus;
