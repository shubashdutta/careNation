import { z } from "zod"

export const MatchingTreeSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
})

export type MatchingTreeSchemaType = z.infer<typeof MatchingTreeSchema>
