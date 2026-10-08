//@ts-nocheck
import { useForm } from "react-hook-form"
import Breadcrumb from "@/components/shared/breadcrumb"
import ExtendedForm from "@/components/extended-components/extended-form"
import { InputField } from "@/components/extended-components/extended-input"
import { zodResolver } from "@hookform/resolvers/zod"
import useGetAboutUs from "./useGetAboutUs"
import useAddAboutUs from "./useAboutUs"
import { AboutUsSchema } from "./schema"
import { InputUploadImage } from "@/components/extended-components/input-upload-image"
import uploadImage from "@/hooks/use-upload-image"
import { InputTextarea } from "@/components/extended-components/input-textarea"

const breadcrumbTrail = ["Home", "CMS", "About-Us"]

// 1. Updated Form Type to directly match the flat backend schema
type AboutUsForm = {
  title: string
  description: string
  image: File | string | null
}

const AboutUs = () => {
  const { data: AboutUs, isLoading, error } = useGetAboutUs()

  const form = useForm<AboutUsForm>({
    resolver: zodResolver(AboutUsSchema),
    values: AboutUs
      ? {
          title: AboutUs.title ?? "",
          description: AboutUs.description ?? "",
          image: AboutUs.image ?? null,
        }
      : undefined,
    resetOptions: {
      keepDefaultValues: false,
    },
  })

  const { addAboutUs, isPending: isAdding } = useAddAboutUs(() => {
    form.reset(form.getValues())
  })

  // 3. Simple submit handler: No arrays to reduce or map!
  const handleSubmit = (formData: AboutUsForm) => {
    addAboutUs(formData)
  }

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-500">Loading AboutUss…</div>
  }

  if (error) {
    return (
      <div className="p-6 text-sm text-red-500">
        Couldn't load the general AboutUss.
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
            <InputField<AboutUsForm>
              name="title"
              label="Title"
              placeholder="Title"
            />
          </div>

          <InputTextarea
            name="description"
            label="Description"
            placeholder="Description"
          />
          <InputUploadImage name="image" onUpload={uploadImage} />
        </div>
      </ExtendedForm>
    </div>
  )
}

export default AboutUs
