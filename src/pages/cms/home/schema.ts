import { z } from "zod"

const TextListItemSchema = z.object({
  value: z.string().min(1, "Required"),
})

const ServiceSchema = z.object({
  sectionName: z.string().min(1, "Required"),
  sectionSubtitle: z.string().min(1, "Required"),
  mainLevel: z.string().min(1, "Required"),
  supportingLevel: z.string().min(1, "Required"),
  sectionImage: z.union([z.instanceof(File), z.string()]).optional(),
  sortOrder: z.number().min(0),
})

export const HomeSectionFormSchema = z.object({
  sectionName: z.string().min(1, "Section name is required"),
  heroText: z.string().min(1, "Hero text is required"),
  marketPlaceText: z.array(TextListItemSchema),
  supportingText: z.array(TextListItemSchema),
  marketPlace: z.array(TextListItemSchema),
  sectionSubtitle: z.string().min(1, "Subtitle is required"),
  sectionImage: z.union([z.instanceof(File), z.string()]).optional(),
  services: z.array(ServiceSchema),
})

export type HomeSectionFormSchemaType = z.infer<typeof HomeSectionFormSchema>
export type HomeSectionService = z.infer<typeof ServiceSchema>
