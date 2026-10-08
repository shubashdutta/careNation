import { z } from "zod"
import { validators } from "@/utils/schema"

export const FileFormSchema = z.object({
  name: validators.requiredString("Name"),
  url: validators.required("URL"),
  description: validators.requiredString("Description"),
  file: validators.requiredString("File"),
})

export type FileFormSchemaType = z.infer<typeof FileFormSchema>
