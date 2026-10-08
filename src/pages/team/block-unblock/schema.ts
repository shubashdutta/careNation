import { z } from "zod"

export const BlockUnblockSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
})

export type BlockUnblockSchemaType = z.infer<typeof BlockUnblockSchema>
