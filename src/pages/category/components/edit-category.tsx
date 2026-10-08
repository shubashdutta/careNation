import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import useEditCategory from "../hooks/use-edit-category"
import { CategoryFormSchema, type CategoryFormSchemaType } from "../schema"
import { CategoryForm } from "./category-form"
import type { ICategory, Step } from "../type"

interface EditCategoryProps {
  category: ICategory
  categories: ICategory[]
  onClose: () => void
}

const EditCategory = ({ category, categories, onClose }: EditCategoryProps) => {
  const [step, setStep] = useState<Step>("basic")

  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: category.name,
      slug: category.slug,
      status: category.status.toLowerCase() as "active" | "inactive",
      description: category.description ?? "",
      logo: category.logo ?? undefined,
      metaTitle: category.metaTitle ?? "",
      metaDescription: category.metaDescription ?? "",
      parentId: category.parentId ?? undefined,
    },
  })

  const { editCategory, isPending } = useEditCategory(category, onClose)

  const onSubmit = (data: CategoryFormSchemaType) => {
    editCategory(data)
  }

  return (
    <ExtendedForm
      form={form}
      onSubmit={onSubmit}
      onClose={onClose}
      submitBtnType="submit"
      submitText="Save changes"
      cancelText="Cancel"
      isSubmitting={isPending}
    >
      <CategoryForm
        step={step}
        onStepChange={setStep}
        categories={categories}
        lockParents
      />
    </ExtendedForm>
  )
}

export default EditCategory
