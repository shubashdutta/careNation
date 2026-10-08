import axiosInstance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import type { INotificationsType } from "../type";
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type";

const useGetNotifications = () => {
  return useQuery<IApiResponseType<INotificationsType>, IApiErrorResponse>({
    queryKey: [""],
    queryFn: async () => {
      const response = await axiosInstance.get("");
      return response?.data;
    },
  });
};

export default useGetNotifications;
