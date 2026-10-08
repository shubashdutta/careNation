import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { CampaignFormSchemaType } from "../schema"
import type { Step } from "../type"

const STEP_ORDER: Step[] = [
  "basic",
  "configuration",
  "vendor-eligibility",
  "product-eligibility",
  "schedule",
  "rules",
  "terms",
  "preview",
]

const STEP_FIELDS: Record<Step, (keyof CampaignFormSchemaType)[]> = {
  basic: ["name", "slug", "description"],
  configuration: [
    "offerType",
    "autoApplyDiscount",
    "stackWithOtherOffer",
    "couponCode",
    "featuredCamping",
  ],
  "vendor-eligibility": [
    "vendorEligibilityType",
    "participationMode",
    "maxProductPerVendor",
    "maxParticipatingVendor",
  ],
  "product-eligibility": ["productEligibilityType"],
  schedule: ["startDate", "endDate", "startTime", "endTime", "timezone"],
  rules: [
    "minimumOrderValue",
    "maximumDiscount",
    "customerUsageLimit",
    "totalRedemptions",
    "perVendorRedemptionLimit",
  ],
  terms: ["termsAndConditions", "termsAndConditionsFiles"],
  preview: [],
}
export const useCampaignStep = (
  form: UseFormReturn<CampaignFormSchemaType>
) => {
  const [step, setStep] = useState<Step>("basic")

  const currentIndex = STEP_ORDER.indexOf(step)
  const isFirstStep = currentIndex === 0
  const isLastStep = currentIndex === STEP_ORDER.length - 1

  // Kept for backwards compatibility with existing usage
  const isBasicStep = step === "basic"

  const nextStep = async () => {
    const fields = STEP_FIELDS[step]

    if (fields.length > 0) {
      const valid = await form.trigger(fields)
      if (!valid) return false
    }

    if (isLastStep) return true

    setStep(STEP_ORDER[currentIndex + 1])
    return true
  }

  const previousStep = () => {
    if (isFirstStep) return
    setStep(STEP_ORDER[currentIndex - 1])
  }

  const goToStep = (target: Step) => {
    setStep(target)
  }

  return {
    step,
    setStep,
    goToStep,
    isBasicStep,
    isFirstStep,
    isLastStep,
    currentIndex,
    totalSteps: STEP_ORDER.length,
    nextStep,
    previousStep,
  }
}
