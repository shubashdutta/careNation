import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type";
import { toast } from "react-toastify";
import { KEYS } from "@/constant/keys";
import { END_POINT } from "@/constant/end-point";

const useDeleteWarehouse = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  const deleteWarehouseData = async (ids: string | string[]) => {
    const payload = { ids: Array.isArray(ids) ? ids : [ids] };
    const response = await axiosInstance.delete(
      END_POINT.WAREHOUSE.BULK_DELETE,
      {
        data: payload,
      },
    );
    return response.data;
  };

  const { mutate, isPending } = useMutation<
    IApiResponseType<null>,
    IApiErrorResponse,
    string | string[]
  >({
    mutationFn: deleteWarehouseData,
    onSuccess: (res) => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: [KEYS.warehouses] });
      toast.success(res?.message || "Warehouse deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete warehouse. Please try again.",
      );
    },
  });

  const deleteWarehouse = (ids: string | string[]) => {
    mutate(ids);
  };

  return {
    isPending,
    deleteWarehouse,
  };
};

export default useDeleteWarehouse;
