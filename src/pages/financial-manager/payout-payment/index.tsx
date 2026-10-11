import { useState } from "react"
import Breadcrumb from "@/components/shared/breadcrumb"
import FilterSearch, {
  type FilterSearchFormData,
} from "./partials/filter-search"
import { Button } from "@/components/ui/button"
import { payoutPaymentSingleData, payoutPaymentCycleData } from "./data"
import useDisclosure from "@/hooks/use-disclosure"
import Modal from "@/components/shared/modal"
import PayoutPaymentTable from "./partials/table"
import type { IFile } from "./types"

const breadcrumbTrail = ["Home", "Financial", "Payout Payment"]

const PayoutPayment = () => {
  const [filterMode, setFilterMode] = useState<"single" | "cycle">("single")
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [hasSearched, setHasSearched] = useState(false)
  const [searchData, setSearchData] = useState<FilterSearchFormData | null>(
    null
  )

  const { isOpen, open, close } = useDisclosure()

  const currentTableData: IFile[] = (() => {
    if (!searchData) return []
    if (searchData.filterMode === "single") {
      return payoutPaymentSingleData
    } else {
      return payoutPaymentCycleData[searchData.cycleOn] || []
    }
  })()

  const selectedRows = currentTableData.filter(
    (row, index) => rowSelection[row.id] || rowSelection[index]
  )

  const handleConfirm = () => {
    close()
  }

  const handleSearch = (data: FilterSearchFormData) => {
    setSearchData(data)
    setHasSearched(true)
    setRowSelection({})
  }

  return (
    <div className="space-y-6">
      <Breadcrumb trail={breadcrumbTrail} title="Filter" />

      <section className="space-y-4">
        <FilterSearch
          filterMode={filterMode}
          onFilterModeChange={(mode) => {
            setFilterMode(mode)
            setHasSearched(false)
            setSearchData(null)
            setRowSelection({})
          }}
          onSubmit={handleSearch}
        />

        {hasSearched && (
          <PayoutPaymentTable
            filterMode={filterMode}
            data={currentTableData}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            selectedRows={selectedRows}
            onProceed={open}
          />
        )}
      </section>

      <Modal isOpen={isOpen} onClose={close} size="lg">
        <div className="max-h-[80vh] space-y-6 overflow-y-auto rounded-2xl bg-white p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">Are you sure !</h3>
            <p className="text-sm text-slate-500">
              Do you want to release amount for the following selected items?
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={close}
              className="cursor-pointer border-slate-300 px-6 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="cursor-pointer bg-green-500 px-6 text-white hover:bg-green-600"
            >
              Conform
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PayoutPayment
