import { z } from "zod"

export const GoldTeamSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
})

export type GoldTeamSchemaType = z.infer<typeof GoldTeamSchema>
