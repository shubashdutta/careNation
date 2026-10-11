export interface ISalesPoint {
  id: string | number
  storeCode: string
  storeName: string
  contactPerson: string
  mobile: string
  address: string
  password: string
  status: "Active" | "Inactive"
}