import { z } from "zod"

export const ProfileSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  fileName: z.string().min(1, "File name is required"),
  phone: z.string().min(1, "Phone number is required"),
  userName: z.string().min(1, "User name is required"),
  email: z.string().email("Invalid email address"),
  loginUsername: z.string().min(1, "Login username is required"),
})

export type ProfileSchemaType = z.infer<typeof ProfileSchema>
