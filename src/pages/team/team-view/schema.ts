import { z } from "zod"

export const TeamViewStatusSchema = z.object({
  orderStatus: z.string().min(1, "Order status is required"),
  remark: z.string().optional(),
})

export type TeamViewStatusSchemaType = z.infer<typeof TeamViewStatusSchema>
