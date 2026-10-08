import { z } from "zod"

export const ViewProfileSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
})

export type ViewProfileSchemaType = z.infer<typeof ViewProfileSchema>
