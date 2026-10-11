import * as z from "zod"

export type FilterMode = "single" | "cycle"

export const singleSchema = z.object({
  filterMode: z.literal("single"),
  userName: z.string().min(1, "User name is required"),
})

export const cycleSchema = z.object({
  filterMode: z.literal("cycle"),
  cycleOn: z.string().min(1, "Cycle date is required"),
})

export const filterFormSchema = z.discriminatedUnion("filterMode", [
  singleSchema,
  cycleSchema,
])

type SingleFormData = z.infer<typeof singleSchema>
type CycleFormData = z.infer<typeof cycleSchema>
export type FilterFormData = SingleFormData | CycleFormData
