import { validators } from "@/utils/schema";
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: validators.email("Email"),
  password: validators.password("Password"),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
