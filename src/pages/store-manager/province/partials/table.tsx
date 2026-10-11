import { Download, Filter, Plus, Printer } from "lucide-react"
import { useMemo } from "react"
import type { Dispatch, SetStateAction } from "react"

import ListToolbar from "@/components/shared/list-toolbar"
import TableWithPagination from "@/components/shared/table-with-pagination"
import { Button } from "@/components/ui/button"
import useSearch from "@/hooks/use-search"
import type { IPaginationDataType } from "@/lib/type"
import { useProvinceColumns } from "./columns"  
import type { IProvince } from "../types"

interface ProvinceTableProps {
  data: IProvince[]
  rowSelection: Record<string, boolean>
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>
  onAddNew?: () => void
  onEdit?: (province: IProvince) => void
}

const paginationData: IPaginationDataType = {
  limit: 5,
  currentPage: 1,
  next: null,
  prev: null,
  totalPages: 5,
  totalRecords: 5,
  pagingCounter: 1,
  hasPrevious: false,
  hasNext: true,
  recordShown: 5,
}

const ProvinceTable = ({
  data: tableData,
  rowSelection,
  setRowSelection,
  onAddNew,
  onEdit,
}: ProvinceTableProps) => {
  const { search, handleSearch } = useSearch()
  const columns = useProvinceColumns(onEdit)

  const data = useMemo(
    () => ({
      records: tableData.filter((item) => {
        if (!search.trim()) return true

        const searchValue = search.toLowerCase()

        return [
          item.storeCode,
          item.storeName,
          item.contactPerson,
          item.mobile,
          item.address,
        ].some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(searchValue)
        )
      }),
    }),
    [tableData, search]
  )

  const isLoading = false

  return (
    <div className="space-y-4 rounded-lg bg-white p-5">
      <ListToolbar
        title="Provinces"
        searchValue={search}
        onSearch={handleSearch}
        searchPlaceholder="Search"
        showFilter={false}
        actions={
          <>
            <button
              type="button"
              aria-label="Filter"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Download"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Print"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Printer className="h-4 w-4" />
            </button>

            <Button
              type="button"
              onClick={onAddNew}
              className="gap-2 bg-green-500 hover:bg-green-600 text-white cursor-pointer h-9 px-4"
            >
              <Plus className="h-4 w-4" />
              Add New
            </Button>
          </>
        }
      />

      <TableWithPagination
        message="No provinces found"
        data={data.records}
        isLoading={isLoading}
        columns={columns}
        paginationData={paginationData}
        getRowId={(row) => String(row.id)}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
    </div>
  )
}

export default ProvinceTable