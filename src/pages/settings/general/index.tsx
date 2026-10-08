//@ts-nocheck

import { useForm } from "react-hook-form"
import { Building2 } from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"
import ExtendedForm from "@/components/extended-components/extended-form"
import { InputField } from "@/components/extended-components/extended-input"
import { InputImage } from "@/components/extended-components/input-image"
import InputSelect from "@/components/extended-components/input-select"
import { settingSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import useGetSetting from "./useGetSetting"
import useAddSetting from "./useAddSetting"

const breadcrumbTrail = ["Home", "Settings", "General"]

const THEME_OPTIONS = [
  { label: "Light", value: "Light" },
  { label: "Warm", value: "Warm" },
  { label: "Neutral", value: "Neutral" },
]

// 1. Updated Form Type to directly match the flat backend schema
type GeneralSettingsForm = {
  companyName: string
  companyEmail: string
  companyPhone: string
  companyAddress: string
  website: string
  updatedDate: string
  businessLogo: File | string | null
  theme: string
  primaryColor: string
  secondaryColor: string
  facebook: string
  instagram: string
  youtube: string
  linkedin: string
  x: string
  tiktok: string
}

const GeneralSettings = () => {
  const { data: setting, isLoading, error } = useGetSetting()

  const form = useForm<GeneralSettingsForm>({
    resolver: zodResolver(settingSchema),
    values: setting
      ? {
          companyName: setting.companyName ?? "",
          companyEmail: setting.companyEmail ?? "",
          companyPhone: setting.companyPhone ?? "",
          companyAddress: setting.companyAddress ?? "",
          website: setting.website ?? "",
          updatedDate: setting.updatedAt ? setting.updatedAt.split("T")[0] : "",
          businessLogo: "/vite.svg",
          theme: "Light",
          primaryColor: "#163CBC",
          secondaryColor: "#F16F20",
          facebook: setting.facebook ?? "",
          instagram: setting.instagram ?? "",
          youtube: setting.youtube ?? "",
          linkedin: setting.linkedin ?? "",
          x: setting.x ?? "",
          tiktok: setting.tiktok ?? "",
        }
      : undefined,
    resetOptions: {
      keepDefaultValues: false,
    },
  })

  const { addSetting, isPending: isAdding } = useAddSetting(() => {
    form.reset(form.getValues())
  })

  // 3. Simple submit handler: No arrays to reduce or map!
  const handleSubmit = (formData: GeneralSettingsForm) => {
    addSetting(formData)
  }

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-500">Loading settings…</div>
  }

  if (error) {
    return (
      <div className="p-6 text-sm text-red-500">
        Couldn't load the general settings.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="General" />

      <ExtendedForm
        form={form}
        onSubmit={handleSubmit}
        onClose={() => form.reset()}
        submitText={isAdding ? "Saving..." : "Save Changes"}
      >
        <div className="space-y-4 rounded-[24px] border border-[#ECECF2] bg-[#F8F9FC] p-5">
          <div>
            <h2 className="text-base font-semibold text-tertiary-100">
              Basic Info
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InputField<GeneralSettingsForm>
              name="companyName"
              label="Company Name"
              placeholder="Company Name"
            />
            <InputField<GeneralSettingsForm>
              name="companyEmail"
              label="Company Email"
              placeholder="Company Email"
            />
            <InputField<GeneralSettingsForm>
              name="companyPhone"
              label="Company Phone"
              placeholder="Company Phone"
            />
            <InputField<GeneralSettingsForm>
              name="companyAddress"
              label="Company Address"
              placeholder="Company Address"
            />
            <InputField<GeneralSettingsForm>
              name="website"
              label="Website"
              placeholder="Website"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-normal text-tertiary-100">
              Company Logo
            </p>
            <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
              <InputImage<GeneralSettingsForm>
                name="businessLogo"
                title="Business Logo"
                accept=".jpg,.jpeg,.png,.svg"
                maxSizeMb={10}
              />
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-[#D8DADF] bg-white p-6">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
                    <Building2 className="h-9 w-9" />
                  </div>
                  <p className="text-sm font-medium text-tertiary-100">
                    GP Supplies
                  </p>
                  <p className="text-xs text-tertiary-300">
                    Medical equipment & supplies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-[24px] border border-[#ECECF2] bg-white p-5">
          <div>
            <h2 className="text-base font-semibold text-tertiary-100">
              Theme Management
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InputSelect<GeneralSettingsForm>
              name="theme"
              title="Theme"
              placeholder="Select Theme"
              options={THEME_OPTIONS}
            />
            <InputField<GeneralSettingsForm>
              name="updatedDate"
              label="Updated Date"
              type="date"
              placeholder="Updated Date"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-normal text-tertiary-100">
              Primary Color
              <div className="flex items-center gap-3 rounded-xl border border-[#ECECF2] bg-[#F8F9FC] p-3">
                <span className="text-xs text-tertiary-300">
                  {form.watch("primaryColor")}
                </span>
                <input
                  type="color"
                  value={form.watch("primaryColor") ?? "#163CBC"}
                  onChange={(event) =>
                    form.setValue("primaryColor", event.target.value)
                  }
                  className="h-10 w-12 cursor-pointer rounded-md border border-[#ECECF2] bg-transparent p-1"
                />
              </div>
            </label>
            <label className="space-y-2 text-sm font-normal text-tertiary-100">
              Secondary Color
              <div className="flex items-center gap-3 rounded-xl border border-[#ECECF2] bg-[#F8F9FC] p-3">
                <span className="text-xs text-tertiary-300">
                  {form.watch("secondaryColor")}
                </span>
                <input
                  type="color"
                  value={form.watch("secondaryColor") ?? "#F16F20"}
                  onChange={(event) =>
                    form.setValue("secondaryColor", event.target.value)
                  }
                  className="h-10 w-12 cursor-pointer rounded-md border border-[#ECECF2] bg-transparent p-1"
                />
              </div>
            </label>
          </div>
        </div>

        {/* 4. Normal Social Input Fields */}
        <div className="space-y-4 rounded-[24px] border border-[#ECECF2] bg-[#F8F9FC] p-5">
          <div>
            <h2 className="text-base font-semibold text-tertiary-100">
              Social Media
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InputField<GeneralSettingsForm>
              name="facebook"
              label="Facebook"
              placeholder="Enter Facebook URL"
              type="url"
            />
            <InputField<GeneralSettingsForm>
              name="instagram"
              label="Instagram"
              placeholder="Enter Instagram URL"
              type="url"
            />
            <InputField<GeneralSettingsForm>
              name="youtube"
              label="YouTube"
              placeholder="Enter YouTube URL"
              type="url"
            />
            <InputField<GeneralSettingsForm>
              name="linkedin"
              label="LinkedIn"
              placeholder="Enter LinkedIn URL"
              type="url"
            />
            <InputField<GeneralSettingsForm>
              name="x"
              label="X (Twitter)"
              placeholder="Enter X URL"
              type="url"
            />
            <InputField<GeneralSettingsForm>
              name="tiktok"
              label="TikTok"
              placeholder="Enter TikTok URL"
              type="url"
            />
          </div>
        </div>
      </ExtendedForm>
    </div>
  )
}

export default GeneralSettings
