import { z } from "zod"
import { validators } from "@/utils/schema"

const emptyStringToUndefined = (value: unknown) =>
  value === "" ? undefined : value

export const WarehouseFormSchema = z.object({
  name: validators.required("Name"),
  type: validators.required("Warehouse type"),
  code: validators.required("Warehouse code"),
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
