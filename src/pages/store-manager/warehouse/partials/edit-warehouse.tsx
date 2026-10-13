import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { WarehouseForm } from "./warehouse-form"
import ExtendedForm from "@/components/extended-components/extended-form"
import { WarehouseFormSchema, type WarehouseFormSchemaType } from "../schema"
import type { IWarehouse } from "../type"
import useEditWarehouse from "../hooks/use-edit-warehouse"

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
      warehouseId: warehouse.warehouseId ?? "",
      productId: warehouse.productId ?? "",
      productStock: warehouse.productStock ?? undefined,
      quantity: warehouse.quantity ?? undefined,
      province: warehouse.province ?? "",
      district: warehouse.district ?? "",
      municipality: warehouse.municipality ?? "",
      wardNo: warehouse.wardNo ?? "",
      streetName: warehouse.streetName ?? "",
      landmark: warehouse.landmark ?? "",
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
