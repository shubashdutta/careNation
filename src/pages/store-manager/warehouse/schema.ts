import { z } from "zod"
import { validators } from "@/utils/schema"

const emptyStringToUndefined = (value: unknown) =>
  value === "" ? undefined : value

export const WarehouseFormSchema = z.object({
  name: validators.required("Warehouse name"),
  type: z.preprocess(emptyStringToUndefined, z.string().optional()),
  code: z.preprocess(emptyStringToUndefined, z.string().optional()),
  description: validators.optional(),
  contactName: validators.required("Contact name"),
  contactEmail: z.preprocess(
    emptyStringToUndefined,
    validators.email("Contact email").optional()
  ),
  contactPhone: z.preprocess(
    emptyStringToUndefined,
    validators.phone("Contact phone").optional()
  ),
  isPrimary: validators.boolean().default(false),
  warehouseId: validators.required("Warehouse"),
  productId: validators.required("Product"),
  productStock: validators.number("Product stock"),
  quantity: validators.number("Quantity"),
  province: validators.required("Province"),
  district: validators.required("District"),
  municipality: validators.required("Municipality"),
  wardNo: validators.required("Ward no"),
  streetName: validators.required("Street name"),
  landmark: z.preprocess(emptyStringToUndefined, z.string().optional()),
  addressLine1: validators.required("Address line 1"),
  addressLine2: z.preprocess(emptyStringToUndefined, z.string().optional()),
  city: validators.required("City"),
  state: validators.required("State"),
  postalCode: validators.required("Postal code"),
  country: validators.required("Country"),
  mapUrl: z.preprocess(
    emptyStringToUndefined,
    validators.url("Map URL").optional()
  ),
})

export type WarehouseFormSchemaType = z.infer<typeof WarehouseFormSchema>
