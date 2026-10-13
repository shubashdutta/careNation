import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { WarehouseForm } from "./warehouse-form"
import ExtendedForm from "@/components/extended-components/extended-form"
import { WarehouseFormSchema, type WarehouseFormSchemaType } from "../schema"
import useAddWarehouse from "../hooks/use-add-warehouse"

interface AddWarehouseProps {
  onClose: () => void
}

const AddWarehouse = ({ onClose }: AddWarehouseProps) => {
  const form = useForm<WarehouseFormSchemaType>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    resolver: zodResolver(WarehouseFormSchema),
    defaultValues: {
      name: "",
      type: "",
      code: "",
      description: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      isPrimary: false,
      warehouseId: "",
      productId: "",
      productStock: undefined,
      quantity: undefined,
      province: "",
      district: "",
      municipality: "",
      wardNo: "",
      streetName: "",
      landmark: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      mapUrl: "",
    },
  })

  const { addWarehouse, isPending } = useAddWarehouse(() => {
    form.reset()
    onClose()
  })

  const onSubmit = (data: WarehouseFormSchemaType) => {
    addWarehouse(data)
  }

  return (
    <ExtendedForm
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      form={form}
      onSubmit={onSubmit}
      onClose={onClose}
      submitText="Create"
      cancelText="Cancel"
      isSubmitting={isPending}
    >
      <WarehouseForm />
    </ExtendedForm>
  )
}

export default AddWarehouse
