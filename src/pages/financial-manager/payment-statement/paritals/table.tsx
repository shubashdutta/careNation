import { Download, Printer } from "lucide-react"
import { useMemo } from "react"
import type { Dispatch, SetStateAction } from "react"

import ListToolbar from "@/components/shared/list-toolbar"
import TableWithPagination from "@/components/shared/table-with-pagination"
import { Button } from "@/components/ui/button"
import useSearch from "@/hooks/use-search"
import type { IPaginationDataType } from "@/lib/type"

import { usePaymentStatementColumns } from "./payment-columns"
import type { IPaymentStatement } from "../types"

interface PaymentStatementTableProps {
  data: IPaymentStatement[]
  rowSelection: Record<string, boolean>
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>
  selectedRows: IPaymentStatement[]
  onProceed?: () => void
  totalSettledAmount?: number
}

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

const PaymentStatementTable = ({
  data: tableData,
  rowSelection,
  setRowSelection,
  selectedRows,
  onProceed,
  totalSettledAmount = 110750,
}: PaymentStatementTableProps) => {
  const { search, handleSearch } = useSearch()

  const columns = usePaymentStatementColumns()

  const data = useMemo(
    () => ({
      records: tableData.filter((item) => {
        if (!search.trim()) return true

        const searchValue = search.toLowerCase()

        return [
          item.lotNo,
          item.member,
          item.createdOn,
          item.paymentMethod,
          item.payeeBank,
          item.paymentSettlement,
          item.transDate,
          item.payableAmt,
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

  const formattedTotalAmount = totalSettledAmount.toLocaleString("en-NP", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const handleProceedClick = () => {
    if (selectedRows.length === 0 || !onProceed) return

    onProceed()
  }

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
              aria-label="Download payment statement"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Print payment statement"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Printer className="h-4 w-4" />
            </button>
          </>
        }
      />

      <div className="mr-auto hidden items-center justify-end gap-1 text-sm sm:flex">
        <span className="text-gray-500">Total Settled Amount:</span>
        <span className="font-semibold text-green-500">
          {formattedTotalAmount}
        </span>
      </div>

      <TableWithPagination
        message="No payment statements found"
        data={data.records}
        isLoading={isLoading}
        columns={columns}
        paginationData={paginationData}
        getRowId={(row) => String(row.id)}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />

      {selectedRows.length > 0 && onProceed && (
        <div className="flex justify-end pt-2">
          <Button
            type="button"
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

export default PaymentStatementTable
