import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type";
import { toast } from "react-toastify";
import { KEYS } from "@/constant/keys";
import { END_POINT } from "@/constant/end-point";

const useDeleteOrder = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  const deleteOrderData = async (ids: string | string[]) => {
    const payload = { ids: Array.isArray(ids) ? ids : [ids] };
    const response = await axiosInstance.delete(END_POINT.ORDER.BULK_DELETE, {
      data: payload,
    });
    return response.data;
  };

  const { mutate, isPending } = useMutation<
    IApiResponseType<null>,
    IApiErrorResponse,
    string | string[]
  >({
    mutationFn: deleteOrderData,
    onSuccess: (res) => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: [KEYS.orders] });
      toast.success(res?.message || "Order deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete order. Please try again.",
      );
    },
  });

  return {
    isPending,
    deleteOrder: mutate,
  };
};

export default useDeleteOrder;
