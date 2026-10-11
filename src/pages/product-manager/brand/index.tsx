import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { RowSelectionState } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import ExtendedButton from "@/components/extended-components/extended-button"
import ExtendedDialog from "@/components/extended-components/extended-dialog"
import TableWithPagination from "@/components/shared/table-with-pagination"
import ListToolbar from "@/components/shared/list-toolbar"
import Breadcrumb from "@/components/shared/breadcrumb"
import useDisclosure from "@/hooks/use-disclosure"
import useSearch from "@/hooks/use-search"
import { useBrandColumns } from "./columns"
import BulkActionMenu from "./components/bulk-action-menu"
import AddBrand from "./components/add-brand"
import useGetBrands from "./hooks/use-get-brands"

const breadcrumbTrail = ["Home", "Product Management", "Brand"]

const Brand = () => {
  const addModal = useDisclosure()
  const columns = useBrandColumns()
  const { search, handleSearch } = useSearch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const { data, isLoading } = useGetBrands()

  const order = searchParams.get("order") ?? ""
  const selectedIds = Object.keys(rowSelection)

  const handleSort = (value: "asc" | "desc") => {
    const updated = new URLSearchParams(searchParams)
    updated.set("order", value)
    setSearchParams(updated)
  }

  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Brand" />

      <ListToolbar
        searchValue={search}
        onSearch={handleSearch}
        searchPlaceholder="Search Brand..."
        sortOrder={order}
        onSortChange={handleSort}
        actions={
          <ExtendedButton
            text="Add Brand"
            radius="medium"
            icon={<Plus className="h-3.5 w-3.5" />}
            onClick={addModal.open}
          />
        }
      >
        <BulkActionMenu
          selectedIds={selectedIds}
          onDeleted={() => setRowSelection({})}
        />
      </ListToolbar>

      <TableWithPagination
        message="No brands found"
        data={data?.records ?? []}
        isLoading={isLoading}
        columns={columns}
        paginationData={data}
        getRowId={(row) => row.id}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />

      <ExtendedDialog
        open={addModal.isOpen}
        onOpenChange={addModal.set}
        title="Add Brand"
      >
        <AddBrand onClose={addModal.close} />
      </ExtendedDialog>
    </div>
  )
}

export default Brand
