import { z } from "zod"
import { validators } from "@/utils/schema"

export const CategoryFormSchema = z.object({
  name: validators.requiredString("Name"),
  slug: validators.required("Slug"),
  status: validators.required("Status"),
  description: validators.requiredString("Description"),
  logo: z.union([z.instanceof(File), z.string()]).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  sortOrder: z.number().optional(),
  parentId: z.string().optional(),
  // Only required when adding a sub-category (level 1) or child sub-category
  // (level 2); enforced in the form component based on the active level.
  parentCategoryId: z.string().optional(),
  parentSubCategoryId: z.string().optional(),
})

export type CategoryFormSchemaType = z.infer<typeof CategoryFormSchema>
