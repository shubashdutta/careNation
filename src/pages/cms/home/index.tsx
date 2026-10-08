//@ts-nocheck
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import { HomeSectionFormSchema, type HomeSectionFormSchemaType } from "./schema"

import type { IHomeSection } from "./type"
import useGetHomeSection from "./hooks/useGetHomeSection"
import useAddHomeSection from "./hooks/useAddHomeSection"
import useEditHomeSection from "./hooks/useEditHomeSection"
import { HomeSectionForm } from "./components/home-section"

const HomeSectionPage = () => {
  const { data: homeSection, isLoading, error } = useGetHomeSection()

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-gray-500">Loading home section…</div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-sm text-red-500">
        Couldn't load the home section.
      </div>
    )
  }

  // homeSection is undefined the very first time this page runs — that's
  // valid, it just means the singleton instance hasn't been created yet.
  return <HomeSectionPageForm homeSection={homeSection} />
}

function HomeSectionPageForm({ homeSection }: { homeSection?: IHomeSection }) {
  const isEditing = Boolean(homeSection?.id)

  const form = useForm<HomeSectionFormSchemaType>({
    resolver: zodResolver(HomeSectionFormSchema),
    defaultValues: {
      sectionName: homeSection?.sectionName ?? "",
      heroText: homeSection?.heroText ?? "",
      marketPlaceText: (homeSection?.marketPlaceText ?? []).map((value) => ({
        value,
      })),
      supportingText: (homeSection?.supportingText ?? []).map((value) => ({
        value,
      })),
      marketPlace: (homeSection?.marketPlace ?? []).map((value) => ({
        value,
      })),
      sectionSubtitle: homeSection?.sectionSubtitle ?? "",
      sectionImage: homeSection?.sectionImage ?? "",
      services: homeSection?.services ?? [],
    },
  })

  const { addHomeSection, isPending: isAdding } = useAddHomeSection(() => {
    form.reset(form.getValues())
  })

  const { editHomeSection, isPending: isSaving } = useEditHomeSection(
    homeSection?.id ?? "",
    () => {
      form.reset(form.getValues())
    }
  )

  const handleSubmit = (data: HomeSectionFormSchemaType) => {
    if (isEditing) {
      editHomeSection(data)
    } else {
      addHomeSection(data)
    }
  }

  return (
    <ExtendedForm
      form={form}
      onSubmit={handleSubmit}
      submitBtnType="submit"
      submitText={isEditing ? "Save Changes" : "Create"}
      isSubmitting={isEditing ? isSaving : isAdding}
    >
      <HomeSectionForm />
    </ExtendedForm>
  )
}

export default HomeSectionPage
