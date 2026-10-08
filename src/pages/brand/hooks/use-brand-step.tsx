import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { BrandFormSchemaType } from "../schema"
import type { Step } from "../type"

export const useBrandStep = (form: UseFormReturn<BrandFormSchemaType>) => {
  const [step, setStep] = useState<Step>("basic")

  const isBasicStep = step === "basic"

  const nextStep = async () => {
    const valid = await form.trigger(["name", "slug", "description"])

    if (!valid) return false

    setStep("image")
    return true
  }

  const previousStep = () => {
    setStep("basic")
  }

  return {
    step,
    setStep,
    isBasicStep,
    nextStep,
    previousStep,
  }
}
