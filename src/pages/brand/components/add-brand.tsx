import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import useAddBrand from "../hooks/use-add-brand"
import { BrandForm } from "./brand-form"
import { BrandFormSchema, type BrandFormSchemaType } from "../schema"
import { useBrandStep } from "../hooks/use-brand-step"

interface AddBrandProps {
  onClose: () => void
}

const AddBrand = ({ onClose }: AddBrandProps) => {
  const form = useForm<BrandFormSchemaType>({
    resolver: zodResolver(BrandFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      isFeatured: false,
      logo: "",
    },
  })

  const { step, isBasicStep, nextStep, previousStep } = useBrandStep(form)


  const { addBrand, isPending } = useAddBrand(() => {
    form.reset()
    onClose()
  })

  const handleSubmit = (data: BrandFormSchemaType) => {
    addBrand(data)
  }
  return (
    <ExtendedForm
      form={form}
      onSubmit={handleSubmit}
      onClick={nextStep}
      onClose={isBasicStep ? onClose : previousStep}
      submitText={isBasicStep ? "Next" : "Create"}
      cancelText={isBasicStep ? "Cancel" : "Back"}
      submitBtnType={isBasicStep ? "button" : "submit"}
      isSubmitting={!isBasicStep && isPending}
    >
      <BrandForm step={step} />
    </ExtendedForm>
  )
}

export default AddBrand
