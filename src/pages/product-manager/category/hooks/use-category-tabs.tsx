import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { CategoryFormSchemaType } from "../schema"
import type { Step } from "../type"

const STEP_ORDER: Step[] = ["basic", "image", "seo"]

export const useCategoryStep = (
  form: UseFormReturn<CategoryFormSchemaType>
) => {
  const [step, setStep] = useState<Step>("basic")

  const stepIndex = STEP_ORDER.indexOf(step)
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === STEP_ORDER.length - 1

  const nextStep = async () => {
    if (step === "basic") {
      const valid = await form.trigger(["name", "slug", "description"])
      if (!valid) return false
      setStep("image")
      return true
    }

    if (step === "image") {
      const valid = await form.trigger(["logo"])
      if (!valid) return false
      setStep("seo")
      return true
    }

    return true
  }

  const previousStep = () => {
    const prevIndex = stepIndex - 1
    if (prevIndex >= 0) {
      setStep(STEP_ORDER[prevIndex])
    }
  }

  return {
    step,
    setStep,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
  }
}
