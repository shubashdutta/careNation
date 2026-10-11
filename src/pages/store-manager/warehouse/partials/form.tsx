"use client"

import { StoreFormModal, type StoreFormData } from "@/components/shared/store-form"

interface WarehouseFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: StoreFormData) => void
  initialData?: Partial<StoreFormData> | null
  title?: string
}

const WarehouseFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title = "Add New Warehouse",
}: WarehouseFormProps) => {
  return (
    <StoreFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={initialData}
      title={title}
      storeType="Warehouse"
    />
  )
}

export default WarehouseFormModal
export type { StoreFormData }
