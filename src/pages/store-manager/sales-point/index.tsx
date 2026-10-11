import { useState } from "react"

import Breadcrumb from "@/components/shared/breadcrumb"
import SalesPointTable from "./partials/table"
import SalesPointFormModal from "./partials/form"
import { salesPointData } from "./data"
import useDisclosure from "@/hooks/use-disclosure"
import type { StoreFormData } from "./schema"
import type { ISalesPoint } from "./types"

const breadcrumbTrail = ["Home", "Store Manager", "Sales Point"]

const SalesPoint = () => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const formModal = useDisclosure()
  const [editingSalesPoint, setEditingSalesPoint] = useState<ISalesPoint | null>(null)
  const [formTitle, setFormTitle] = useState("Add New Sales Point")

  const handleAddNew = () => {
    setEditingSalesPoint(null)
    setFormTitle("Add New Sales Point")
    formModal.open()
  }

  const handleEdit = (SalesPoint: ISalesPoint) => {
    setEditingSalesPoint(SalesPoint)
    setFormTitle("Edit Sales Point")
    formModal.open()
  }

  const handleFormSubmit = (data: StoreFormData) => {
    console.log("Form submitted:", data)
    formModal.close()
  }

  const handleFormClose = () => {
    setEditingSalesPoint(null)
    formModal.close()
  }

  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Store List" />

      <SalesPointTable
        data={salesPointData}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
      />

      <SalesPointFormModal
        isOpen={formModal.isOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingSalesPoint}
        title={formTitle}
      />
    </div>
  )
}

export default SalesPoint

