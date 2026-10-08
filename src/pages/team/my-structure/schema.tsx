import { z } from "zod"

export const MyStructureSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
})

export type MyStructureSchemaType = z.infer<typeof MyStructureSchema>
