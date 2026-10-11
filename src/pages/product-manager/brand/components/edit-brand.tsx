import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useEditBrand from "../hooks/use-edit-brand"
import { BrandFormSchema, type BrandFormSchemaType } from "../schema"
import { BrandForm } from "./brand-form"
import type { IBrand } from "../type"
import ExtendedForm from "@/components/extended-components/extended-form"
import { useBrandStep } from "../hooks/use-brand-step"

interface EditBrandProps {
  brand: IBrand
  onClose: () => void
}

const EditBrand = ({ brand, onClose }: EditBrandProps) => {
  const form = useForm<BrandFormSchemaType>({
    resolver: zodResolver(BrandFormSchema),
    defaultValues: {
      name: brand.name,
      slug: brand.slug,
      description: brand.description ?? "",
      logo: brand.logo ?? "",
      isFeatured: brand.isFeatured ?? false,
    },
  })

  const { step, isBasicStep, nextStep, previousStep } = useBrandStep(form)
  
  const { editBrand, isPending } = useEditBrand(brand, () => {
    form.reset()
    onClose()
  })
  const handleSubmit = (data: BrandFormSchemaType) => {
    editBrand(data)
  }

  return (
    <ExtendedForm
      form={form}
      onSubmit={handleSubmit}
      onClick={nextStep}
      onClose={isBasicStep ? onClose : previousStep}
      submitText={isBasicStep ? "Next" : "Update"}
      cancelText={isBasicStep ? "Cancel" : "Back"}
      submitBtnType={isBasicStep ? "button" : "submit"}
      isSubmitting={!isBasicStep && isPending}
    >
      <BrandForm step={step} />
    </ExtendedForm>
  )
}
export default EditBrand
