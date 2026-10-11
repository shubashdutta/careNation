"use client"

import { StoreFormModal, type StoreFormData } from "@/components/shared/store-form"

interface ProvinceFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: StoreFormData) => void
  initialData?: Partial<StoreFormData> | null
  title?: string
}

const ProvinceFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title = "Add New Province",
}: ProvinceFormProps) => {
  return (
    <StoreFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={initialData}
      title={title}
      storeType="Province"
    />
  )
}

export default ProvinceFormModal
export type { StoreFormData }
