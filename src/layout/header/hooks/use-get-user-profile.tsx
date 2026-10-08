import axiosInstance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type";

interface IUserProfileProps {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  whatsapp: string | null;
  phone_number: string;
  // role: IRoleType;
  branch: string | null;
  profile_picture: string | null;
}

const useGetUserProfile = () => {
  return useQuery<IApiResponseType<IUserProfileProps>, IApiErrorResponse>({
    queryKey: [''],
    queryFn: async () => {
      const response = await axiosInstance.get('');
      return response?.data;
    },
  });
};

export default useGetUserProfile;
