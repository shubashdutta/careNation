import { validators } from "@/utils/schema";
import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: validators.email("Email"),
});

export type ForgotPasswordFormSchemaType = z.infer<
  typeof ForgotPasswordFormSchema
>;
