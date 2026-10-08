import { z, ZodString, ZodBoolean, ZodDate, ZodType } from "zod"
import { EMAIL_REGEX, LETTER_REGEX } from "./regex"

type MessageFn = (fieldName?: string, extra?: unknown) => string

export class Validator {
  private defaultMessages = {
    required: (fieldName = "Field") => `${fieldName} is required.`,
    invalidEmail: (fieldName = "Email") => `${fieldName} is not valid.`,
    minLength: (fieldName = "Field", min: number) =>
      `${fieldName} must be at least ${min} characters.`,
    maxLength: (fieldName = "Field", max: number) =>
      `${fieldName} must be at most ${max} characters.`,
    invalidPhone: (fieldName = "Phone") => `${fieldName} is invalid.`,
    invalidUrl: (fieldName = "URL") => `${fieldName} is not a valid URL.`,
    regexMismatch: (fieldName = "Field") => `${fieldName} format is invalid.`,
    invalidFile: (fieldName = "File") => `${fieldName} must be a valid file.`,
    invalidImage: (fieldName = "Image") =>
      `${fieldName} must be a valid image or URL.`,
  }

  requiredString(fieldName?: string): ZodString {
    return z
      .string()
      .min(1, { message: `${fieldName} is required.` })
      .refine((val) => val === val.trim(), {
        message: `${fieldName || "Field"} cannot have leading or trailing spaces.`,
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .regex(LETTER_REGEX, {
        message: `${fieldName || "Field"} must contain only at least one letter.`,
      })
  }

  required(fieldName?: string): ZodString {
    return z.string().min(1, { message: `${fieldName} is required.` })
  }

  email(fieldName?: string): ZodString {
    return z
      .string()
      .min(1, { message: this.defaultMessages.required(fieldName) })
      .email({ message: this.defaultMessages.invalidEmail(fieldName) })
      .regex(EMAIL_REGEX, {
        message: this.defaultMessages.invalidEmail(fieldName),
      })
  }

  password(fieldName?: string, min = 2, max = 50): ZodString {
    return z
      .string()
      .min(min, { message: this.defaultMessages.minLength(fieldName, min) })
      .max(max, { message: this.defaultMessages.maxLength(fieldName, max) })
  }

  phone(fieldName?: string) {
    return z
      .string()
      .regex(/^(98|97)\d{8}$|^0\d{1,2}\d{6,7}$/, {
        message: this.defaultMessages.invalidPhone(fieldName),
      })
      .optional()
  }

  url(fieldName?: string) {
    return z
      .string()
      .url({ message: this.defaultMessages.invalidUrl(fieldName) })
      .optional()
  }

  regex(
    pattern: RegExp,
    message?: MessageFn | string,
    fieldName?: string
  ): ZodString {
    return z.string().regex(pattern, {
      message:
        typeof message === "function"
          ? message(fieldName)
          : message || this.defaultMessages.regexMismatch(fieldName),
    })
  }

  boolean(): ZodBoolean {
    return z.boolean()
  }

  number(fieldName = "Field") {
    return z.preprocess(
      (val) => {
        if (val === null || val === undefined || val === "") return undefined
        return Number(val)
      },
      z.number().refine((val) => !isNaN(val), {
        message: `${fieldName} format is invalid.`,
      })
    )
  }

  date(fieldName?: string): ZodDate {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return z.date().refine((date) => !isNaN(date.getTime()), {
      message: this.defaultMessages.regexMismatch(fieldName?.toString()),
    })
  }

  optional() {
    return z.any().optional()
  }

  image(fieldName?: string): ZodType<File | string> {
    return z.union([
      z
        .custom<File>((val) => val instanceof File, {
          message: this.defaultMessages.invalidFile(fieldName),
        })
        .refine(
          (file) =>
            file instanceof File &&
            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
          { message: `${fieldName || "Image"} must be a valid image file` }
        ),
      z.string().url({ message: this.defaultMessages.invalidUrl(fieldName) }),
    ])
  }
}

export const validators = new Validator()
