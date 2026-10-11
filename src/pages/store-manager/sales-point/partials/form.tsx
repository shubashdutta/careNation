"use client"

import { StoreFormModal, type StoreFormData } from "@/components/shared/store-form"

interface SalesPointFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: StoreFormData) => void
  initialData?: Partial<StoreFormData> | null
  title?: string
}

const SalesPointFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title = "Add New Sales Point",
}: SalesPointFormProps) => {
  return (
    <StoreFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={initialData}
      title={title}
      storeType="Sales Point"
    />
  )
}

export default SalesPointFormModal
export type { StoreFormData }
