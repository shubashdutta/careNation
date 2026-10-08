export type WarehouseSize = "Small" | "Medium" | "Large"
export type WarehouseType = "Shop" | "Warehouse" | "Store" | "Factory"

export interface IWarehouse {
  id: string
  account: {
    id: string
    name: string
  }
  type: WarehouseType
  name: string
  code: string
  description?: string
  status: "ACTIVE" | "INACTIVE"
  isDefault: boolean
  createdAt: string
  updatedAt: string
  contact?: {
    id: string
    isPrimary: boolean
    contactName?: string
    contactEmail?: string
    contactPhone?: string
  }
  address?: {
    id: string
    addressLine1?: string
    addressLine2?: string
    city?: string
    state?: string
    country?: string
    postalCode?: string
    mapUrl?: string
  }
}
