import { useState } from "react"

import Breadcrumb from "@/components/shared/breadcrumb"
import ProvinceTable from "./partials/table"
import ProvinceFormModal from "./partials/form"
import { provinceData } from "./data"
import useDisclosure from "@/hooks/use-disclosure"
import type { StoreFormData } from "./schema"
import type { IProvince } from "./types"

const breadcrumbTrail = ["Home", "Store Manager", "Provinces"]

const Province = () => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const formModal = useDisclosure()
  const [editingProvince, setEditingProvince] = useState<IProvince | null>(null)
  const [formTitle, setFormTitle] = useState("Add New Province")

  const handleAddNew = () => {
    setEditingProvince(null)
    setFormTitle("Add New Store")
    formModal.open()
  }

  const handleEdit = (province: IProvince) => {
    setEditingProvince(province)
    setFormTitle("Edit Province")
    formModal.open()
  }

  const handleFormSubmit = (data: StoreFormData) => {
    console.log("Form submitted:", data)
    formModal.close()
  }

  const handleFormClose = () => {
    setEditingProvince(null)
    formModal.close()
  }

  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Store List" />

      <ProvinceTable
        data={provinceData}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
      />

      <ProvinceFormModal
        isOpen={formModal.isOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingProvince}
        title={formTitle}
      />
    </div>
  )
}

export default Province
