import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import useAddCategory from "../hooks/use-add-category"
import { CategoryFormSchema, type CategoryFormSchemaType } from "../schema"
import { CategoryForm } from "./category-form"
import type { CategoryLevel, ICategory } from "../type"
import { useCategoryStep } from "../hooks/use-category-tabs"

interface AddCategoryProps {
  level: CategoryLevel
  categories: ICategory[]
  defaultParentId?: string
  onClose: () => void
}

const AddCategory = ({
  categories,
  defaultParentId,
  onClose,
}: AddCategoryProps) => {
  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      status: "active",
      description: "",
      logo: undefined,
      metaTitle: "",
      metaDescription: "",
      parentId: defaultParentId,
    },
  })

  const { step, isFirstStep, isLastStep, nextStep, previousStep } =
    useCategoryStep(form)

  const { addCategory, isPending } = useAddCategory(() => {
    form.reset()
    onClose()
  })

  const onSubmit = (data: CategoryFormSchemaType) => {
    addCategory(data)
  }

  return (
    <ExtendedForm
      form={form}
      onSubmit={onSubmit}
      onClose={isFirstStep ? onClose : previousStep}
      onClick={nextStep}
      submitBtnType={isLastStep ? "submit" : "button"}
      cancelText={isFirstStep ? "Cancel" : "Back"}
      submitText={isLastStep ? "Create" : "Next"}
      isSubmitting={isPending}
    >
      <CategoryForm
        step={step}
        categories={categories}
        lockParents={Boolean(defaultParentId)}
      />
    </ExtendedForm>
  )
}

export default AddCategory
