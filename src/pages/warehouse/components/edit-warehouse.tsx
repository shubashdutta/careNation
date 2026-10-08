import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useEditWarehouse from "../hooks/use-edit-warehouse"
import { WarehouseFormSchema, type WarehouseFormSchemaType } from "../schema"
import { WarehouseForm } from "./warehouse-form"
import type { IWarehouse } from "../type"
import ExtendedForm from "@/components/extended-components/extended-form"

interface EditWarehouseProps {
  warehouse: IWarehouse
  onClose: () => void
}

const EditWarehouse = ({ warehouse, onClose }: EditWarehouseProps) => {
  const form = useForm<WarehouseFormSchemaType>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    resolver: zodResolver(WarehouseFormSchema),
    defaultValues: {
      name: warehouse.name,
      type: warehouse.type,
      code: warehouse.code,
      description: warehouse.description ?? "",
      contactName: warehouse?.contact?.contactName ?? "",
      contactEmail: warehouse?.contact?.contactEmail ?? "",
      contactPhone: warehouse?.contact?.contactPhone ?? "",
      isPrimary: warehouse?.contact?.isPrimary ?? false,
      addressLine1: warehouse?.address?.addressLine1 ?? "",
      addressLine2: warehouse?.address?.addressLine2 ?? "",
      city: warehouse?.address?.city ?? "",
      state: warehouse?.address?.state ?? "",
      postalCode: warehouse?.address?.postalCode ?? "",
      country: warehouse?.address?.country ?? "",
      mapUrl: warehouse?.address?.mapUrl ?? "",
    },
  })

  const { editWarehouse, isPending } = useEditWarehouse(warehouse, () => {
    form.reset()
    onClose()
  })

  const onSubmit = (data: WarehouseFormSchemaType) => {
    editWarehouse(data)
  }

  return (
    <ExtendedForm
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      form={form}
      onSubmit={onSubmit}
      onClose={onClose}
      submitText="Save"
      cancelText="Cancel"
      isSubmitting={isPending}
    >
      <WarehouseForm />
    </ExtendedForm>
  )
}

export default EditWarehouse
