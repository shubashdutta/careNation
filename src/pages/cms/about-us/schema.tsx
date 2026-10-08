import { z } from "zod"

export const AboutUsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.any().optional(),
})

export type AboutUsSchemaType = z.infer<typeof AboutUsSchema>
