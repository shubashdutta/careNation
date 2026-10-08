import type { IApiResponseType } from "@/lib/type"

export type OrderStatus = "PENDING" | "CONFIRMED" | "Sent Warehouse"

export interface IOrderResponseType {
  success: boolean
  statusCode: number
  message: string
  data: Data
}

export interface Data {
  records: IOrder[]
  limit: number
  currentPage: number
  next: number
  prev: any
  totalPages: number
  totalRecords: number
  pagingCounter: number
  hasPrevious: boolean
  hasNext: boolean
  recordShown: number
}

export interface IOrder {
  id: string
  orderNumber: string
  accountId: string
  status: OrderStatus
  paymentStatus: string
  paymentMethod: string
  subtotal: number
  discountAmount: number
  shippingAmount: number
  taxAmount: number
  totalAmount: number
  shippingAddress: ShippingAddress
  billingAddress: BillingAddress
  notes?: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  orderItems: OrderItem[]
  payments: Payment[]
  vendorOrders: VendorOrder[]
}

export interface ShippingAddress {
  city: string
  phone: string
  address: string
  country: string
  fullName: string
  province: string
  postalCode: string
}

export interface BillingAddress {
  city: string
  phone: string
  address: string
  country: string
  fullName: string
  province: string
  postalCode: string
}

export interface OrderItem {
  id: string
  orderId: string
  vendorListingId: string
  quantity: number
  unitPrice: number
  discountPrice: number
  totalPrice: number
  productSnapshot: ProductSnapshot
  createdAt: string
  updatedAt: string
  vendorListing: VendorListing
}

export interface ProductSnapshot {
  sku: string
  image: string
  price: number
  vendor: Vendor
  product: Product
  variant: Variant
  productId: string
  variantId: string
  description?: string
  productName: string
  comparePrice: number
  vendorListingId: string
}

export interface Vendor {
  id: string
  businessName: string
  businessEmail: string
  businessPhone: string
}

export interface Product {
  id: string
  name: string
  slug: string
  images: string[]
  shortDescription: string
}

export interface Variant {
  id: string
  images: any[]
  weight: string
  barcode: string
  attributes: Attributes
  manufacturerSku: string
}

export interface Attributes {
  Size: string
  Color: string
}

export interface VendorListing {
  id: string
  productVariantId: string
  accountId: string
  sku: string
  price: string
  comparePrice: string
  status: string
  createdAt: string
  updatedAt: string
  variant: Variant2
}

export interface Variant2 {
  id: string
  productId: string
  barcode: string
  varientImage: any[]
  manufacturerSku: string
  weight: string
  isDefault: boolean
  status: string
  createdAt: string
}

export interface Payment {
  id: string
  orderId: string
  paymentMethod: string
  transactionId?: string
  gatewayOrderId?: string
  amount: number
  retryCount: number
  status: string
  gatewayResponse?: GatewayResponse
  paidAt?: string
  createdAt: string
  updatedAt: string
}

export interface GatewayResponse {
  reason?: string
  ref_id: any
  status?: string
  product_code?: string
  total_amount?: number
  transaction_uuid?: string
  form?: Form
  gateway?: string
  provider?: string
  formFields?: FormFields
  redirectUrl?: string
  formActionUrl?: string
  gatewayOrderId?: string
  fee?: number
  pidx?: string
  refunded?: boolean
  transaction_id?: string
  paymentUrl?: string
}

export interface Form {
  amount: number
  tax_amount: number
  failure_url: string
  success_url: string
  product_code: string
  total_amount: number
  transaction_uuid: string
  signed_field_names: string
  product_service_charge: number
  product_delivery_charge: number
}

export interface FormFields {
  amount: number
  tax_amount: number
  failure_url: string
  success_url: string
  product_code: string
  total_amount: number
  transaction_uuid: string
  signed_field_names: string
  product_service_charge: number
  product_delivery_charge: number
}

export interface VendorOrder {
  id: string
  vendorOrderNumber: string
  vendor: Vendor2
  status: string
  totalAmount: number
}

export interface Vendor2 {
  id: string
  name: string
}

export type OrderListResponse = IApiResponseType<IOrder>
