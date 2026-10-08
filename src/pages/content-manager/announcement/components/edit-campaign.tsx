//@ts-nocheck
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import useEditCampaign from "../hooks/use-edit-campaign"
import { CampaignFormSchema, type CampaignFormSchemaType } from "../schema"
import { CampaignForm } from "./campaign-form"
import type { ICampaign } from "../type"
import ExtendedForm from "@/components/extended-components/extended-form"
import { useCampaignStep } from "../hooks/use-campaign-step"
import useGetCampaignDetail from "../hooks/use-get-campaign-detail"

const EditCampaign = () => {
  const { data: campaign, isLoading, error } = useGetCampaignDetail()

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-500">Loading campaign…</div>
  }

  if (error || !campaign) {
    return (
      <div className="p-6 text-sm text-red-500">
        Couldn't load this campaign.
      </div>
    )
  }

  //@ts-ignore
  return <EditCampaignForm campaign={campaign} />
}

function EditCampaignForm({ campaign }: { campaign: ICampaign }) {
  const navigate = useNavigate()

  const form = useForm<CampaignFormSchemaType>({
    //@ts-ignore
    resolver: zodResolver(CampaignFormSchema),
    defaultValues: {
      name: campaign.name,
      slug: campaign.slug,
      description: campaign.description ?? "",
      type: campaign.type ?? "FESTIVAL",
      bannerImage: campaign.bannerImage ?? "",
      bannerThumbnail: campaign.bannerThumbnail ?? "",

      // Not currently returned/sent by the API (see the TODO in
      // useAddCampaign's CampaignPayload) — falling back to sane defaults
      // until the backend contract for these is confirmed.
      offerType: campaign.offerType ?? "PERCENTAGE_DISCOUNT",
      autoApplyDiscount: campaign.autoApplyDiscount ?? false,
      stackWithOtherOffer: campaign.stackWithOffer ?? false,
      couponCode: campaign.couponCode ?? false,
      featuredCamping: campaign.featuredCamping ?? false,

      vendorEligibilityType:
        campaign.configuration?.vendorEligibilityType ?? "ALL",
      participationMode: campaign.participationMode ?? undefined,
      maxProductPerVendor: campaign.configuration?.maxProductPerVendor ?? 0,
      maxParticipatingVendor:
        campaign.configuration?.maxParticipatingVendor ?? 0,

      discountType: campaign.discountType ?? "PERCENTAGE",
      discountAmount: campaign.discountAmount ?? 5,
      productEligibilityType:
        campaign.configuration?.productEligibilityType ?? "ALL",

      startDate: campaign.startDate ?? new Date().toISOString().split("T")[0],
      endDate: campaign.endDate ?? new Date().toISOString().split("T")[0],
      startTime:
        campaign.startTime ??
        new Date().toISOString().split("T")[1].substring(0, 5),
      endTime:
        campaign.endTime ??
        new Date().toISOString().split("T")[1].substring(0, 5),
      timezone: campaign.timezone ?? "UTC",

      minimumOrderValue: campaign.minimumOrderValue ?? 0,
      maximumDiscount: campaign.maximumDiscount ?? 100,
      customerUsageLimit: campaign.customerUsageLimit ?? undefined,
      totalRedemptions: campaign.totalRedemptions ?? undefined,
      perVendorRedemptionLimit: campaign.perVendorRedemptionLimit ?? undefined,

      termsAndConditions: campaign.termsAndConditions ?? "",
      termsAndConditionsFiles: undefined,
    },
  })

  const { step, isFirstStep, isLastStep, nextStep, previousStep } =
    //@ts-ignore
    useCampaignStep(form)

  const { editCampaign, isPending } = useEditCampaign(campaign, () => {
    form.reset()
    navigate(-1)
  })

  const handleSubmit = (data: CampaignFormSchemaType) => {
    editCampaign(data)
  }

  return (
    <div className="grid grid-cols-1">
      <ExtendedForm
        //@ts-ignore
        form={form}
        onSubmit={handleSubmit}
        onClick={nextStep}
        onClose={isFirstStep ? () => navigate(-1) : previousStep}
        submitText={isLastStep ? "Update" : "Next"}
        cancelText={isFirstStep ? "Cancel" : "Back"}
        submitBtnType={isLastStep ? "submit" : "button"}
        isSubmitting={isLastStep && isPending}
      >
        <CampaignForm step={step} />
      </ExtendedForm>

      {/* <div className="hidden lg:block">
        <CampaignPreview />
      </div> */}
    </div>
  )
}

export default EditCampaign
