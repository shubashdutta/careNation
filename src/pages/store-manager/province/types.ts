export interface IProvince {
  id: string | number
  storeCode: string
  storeName: string
  contactPerson: string
  mobile: string
  address: string
  password: string
  status: "Active" | "Inactive"
}