import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { RowSelectionState } from "@tanstack/react-table"
import { Download, Printer } from "lucide-react"
import ExtendedButton from "@/components/extended-components/extended-button"
import TableWithPagination from "@/components/shared/table-with-pagination"
import ListToolbar from "@/components/shared/list-toolbar"
import Breadcrumb from "@/components/shared/breadcrumb"
import useSearch from "@/hooks/use-search"
import { useOrderColumns } from "./columns"
import BulkActionMenu from "./components/bulk-action-menu"
import OrderFilters from "./components/order-filters"
import { exportOrdersToCsv } from "./utils"
import useGetOrders from "./hooks/use-get-orders"
import type { IOrder } from "./type"

const breadcrumbTrail = ["Home", "Purchase Manager", "Orders"]

const OrderList = () => {
  const { search, handleSearch } = useSearch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = useOrderColumns()

  const { records, paginationData, isLoading } = useGetOrders()

  const order = searchParams.get("order") ?? ""
  const selectedIds = Object.keys(rowSelection)

  const handleSort = (value: "asc" | "desc") => {
    const updated = new URLSearchParams(searchParams)
    updated.set("order", value)
    setSearchParams(updated)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    exportOrdersToCsv(
      selectedIds.length
        ? records.filter((o: IOrder) => selectedIds.includes(o.id))
        : records
    )
  }

  return (
    <div className="space-y-4">
      <Breadcrumb
        trail={breadcrumbTrail}
        title="Request Orders"
        subtitle="Manage your order's placed by users"
      />

      {/* Filter Card */}
      <OrderFilters onSearch={() => {}} />

      {/* Data Table Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Card Header Bar */}
        <div className="border-b border-slate-100 px-5">
          <ListToolbar
            title="Shopping Order"
            searchValue={search}
            onSearch={handleSearch}
            searchPlaceholder="Search..."
            showFilter={false}
            sortOrder={order}
            onSortChange={handleSort}
            actions={
              <div className="flex items-center gap-2">
                <ExtendedButton
                  variant="outline"
                  text="Export"
                  radius="medium"
                  icon={<Download className="h-3.5 w-3.5" />}
                  onClick={handleExport}
                />
                <button
                  type="button"
                  onClick={handlePrint}
                  title="Print"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
                >
                  <Printer className="h-4 w-4" />
                </button>
              </div>
            }
          >
            <BulkActionMenu
              selectedIds={selectedIds}
              onDeleted={() => setRowSelection({})}
            />
          </ListToolbar>
        </div>

        {/* Table + Pagination */}
        <div className="p-2">
          <TableWithPagination
            message="No orders found"
            data={records}
            isLoading={isLoading}
            columns={columns}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            paginationData={paginationData}
            getRowId={(row) => row.id}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderList

