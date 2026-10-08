export interface IKycMember {
  id: string
  dateApplied: string
  userId: string
  name: string
  phoneNumber: string
  document: string
  documentNumber: string
  status: "Active" | "Not Active"
}
