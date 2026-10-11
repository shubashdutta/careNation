import ListToolbar from "@/components/shared/list-toolbar"
import { Download, Filter, Printer } from "lucide-react"
import useSearch from "@/hooks/use-search"
import TableWithPagination from "@/components/shared/table-with-pagination"
import type { IPaginationDataType } from "@/lib/type"
import { usePayoutPaymentColumns } from "./columns"
import { Button } from "@/components/ui/button"
import type { IFile } from "../types"

const paginationData: IPaginationDataType = {
  limit: 5,
  currentPage: 1,
  next: null,
  prev: null,
  totalPages: 1,
  totalRecords: 5,
  pagingCounter: 1,
  hasPrevious: false,
  hasNext: false,
  recordShown: 4,
}

interface PayoutPaymentTableProps {
  filterMode: "single" | "cycle"
  data: IFile[]
  rowSelection: Record<string, boolean>
  setRowSelection: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  selectedRows: IFile[]
  onProceed: () => void
}

const PayoutPaymentTable = ({
  filterMode,
  data: tableData,
  rowSelection,
  setRowSelection,
  selectedRows,
  onProceed,
}: PayoutPaymentTableProps) => {
  const data = { records: tableData }
  const isLoading = false
  const columns = usePayoutPaymentColumns(filterMode)

  const handleProceedClick = () => {
    if (selectedRows.length === 0) return
    onProceed()
  }

  const { search, handleSearch } = useSearch()

  return (
    <div className="space-y-4 rounded-lg bg-white p-5">
      <ListToolbar
        title="User List"
        searchValue={search}
        onSearch={handleSearch}
        searchPlaceholder="Search"
        showFilter={false}
        actions={
          <>
            <button
              type="button"
              aria-label="Filter KYC members"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Download KYC members"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Print KYC members"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Printer className="h-4 w-4" />
            </button>
          </>
        }
      />
      <TableWithPagination
        message="No Users found"
        data={data?.records ?? []}
        isLoading={isLoading}
        columns={columns}
        paginationData={paginationData}
        getRowId={(row: any) => row.id}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />

      {filterMode === "cycle" && selectedRows.length > 0 && (
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleProceedClick}
            className="cursor-pointer bg-green-500 px-8 text-white hover:bg-green-600"
          >
            Proceed
          </Button>
        </div>
      )}
    </div>
  )
}

export default PayoutPaymentTable