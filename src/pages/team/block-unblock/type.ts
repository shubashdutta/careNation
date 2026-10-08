export interface IBlockedMember {
  id: string
  joinDate: string
  uniqueId: string
  mobile: string
  password: string
  status: "Blocked" | "Active"
}
