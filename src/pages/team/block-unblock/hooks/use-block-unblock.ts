import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { BlockUnblockSchemaType } from "../schema"
import type { IBlockedMember } from "../type"

const MOCK_BLOCKED_MEMBERS: IBlockedMember[] = [
  {
    id: "blocked-1",
    joinDate: "Feb-26-2024",
    uniqueId: "Pushpa Tandan",
    mobile: "9851213897",
    password: "1234565dfCCC",
    status: "Blocked",
  },
  {
    id: "blocked-2",
    joinDate: "Feb-26-2024",
    uniqueId: "Pushpa Tandan",
    mobile: "9851213897",
    password: "123fff4565",
    status: "Blocked",
  },
  {
    id: "blocked-3",
    joinDate: "Feb-26-2024",
    uniqueId: "Pushpa Tandan",
    mobile: "9851213897",
    password: "123456sdg5",
    status: "Blocked",
  },
  {
    id: "blocked-4",
    joinDate: "Feb-26-2024",
    uniqueId: "Pushpa Tandan",
    mobile: "9851213897",
    password: "1234565",
    status: "Blocked",
  },
  {
    id: "blocked-5",
    joinDate: "Feb-26-2024",
    uniqueId: "Pushpa Tandan",
    mobile: "9851213897",
    password: "123456sdg5",
    status: "Blocked",
  },
  {
    id: "blocked-6",
    joinDate: "Feb-26-2024",
    uniqueId: "Pushpa Tandan",
    mobile: "9851213897",
    password: "1234565",
    status: "Blocked",
  },
]

const useBlockUnblock = () => {
  const mutation = useMutation<IBlockedMember[], Error, BlockUnblockSchemaType>(
    {
      mutationFn: async () => MOCK_BLOCKED_MEMBERS,
      onSuccess: () => toast.success("Blocked members loaded successfully"),
    }
  )

  return {
    ...mutation,
    members: mutation.data,
    loadMembers: mutation.mutate,
  }
}

export default useBlockUnblock
