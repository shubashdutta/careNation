import { z } from "zod"
import { validators } from "@/utils/schema"

export const BrandFormSchema = z.object({
  name: validators.requiredString("Name"),
  slug: validators.required("Slug"),
  description: validators.requiredString("Description"),
  logo: validators.requiredString("Logo"),
  isFeatured: z.boolean().optional(),
})

export type BrandFormSchemaType = z.infer<typeof BrandFormSchema>
