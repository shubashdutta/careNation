import { z } from "zod"

export const settingSchema = z.object({
  companyName: z.string().optional(),
  companyEmail: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  companyPhone: z.string().optional(),
  companyAddress: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  facebook: z.string().url("Invalid Facebook URL").optional().or(z.literal("")),
  instagram: z
    .string()
    .url("Invalid Instagram URL")
    .optional()
    .or(z.literal("")),
  x: z.string().url("Invalid X (Twitter) URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  youtube: z.string().url("Invalid YouTube URL").optional().or(z.literal("")),
  tiktok: z.string().url("Invalid TikTok URL").optional().or(z.literal("")),
})

export type SettingSchemaType = z.infer<typeof settingSchema>
