//@ts-nocheck
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { RowSelectionState } from "@tanstack/react-table"
import { Download, Plus } from "lucide-react"
import ExtendedButton from "@/components/extended-components/extended-button"
import TableWithPagination from "@/components/shared/table-with-pagination"
import ListToolbar from "@/components/shared/list-toolbar"
import Breadcrumb from "@/components/shared/breadcrumb"
import useSearch from "@/hooks/use-search"
import { useOrderColumns } from "./columns"
import BulkActionMenu from "./components/bulk-action-menu"
import { exportOrdersToCsv } from "./utils"
import useGetOrders from "./hooks/use-get-orders"

const breadcrumbTrail = ["Home", "Order Management", "Order List"]

const OrderList = () => {
  const { search, handleSearch } = useSearch()
  // const { status } = useFilter()
  const [searchParams, setSearchParams] = useSearchParams()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = useOrderColumns()

  const { orders, paginationData, isLoading } = useGetOrders()

  const order = searchParams.get("order") ?? ""
  const selectedIds = Object.keys(rowSelection)

  const handleSort = (value: "asc" | "desc") => {
    const updated = new URLSearchParams(searchParams)
    updated.set("order", value)
    setSearchParams(updated)
  }

  return (
    <div className="space-y-4">
      {/* <Breadcrumb
        trail={breadcrumbTrail}
        title="Order List"
        action={
          <ExtendedButton
            text="Add Order"
            radius="medium"
            icon={<Plus className="h-3.5 w-3.5" />}
          />
        }
      /> */}

      <ListToolbar
        searchValue={search}
        onSearch={handleSearch}
        searchPlaceholder="Search Product..."
        sortOrder={order}
        onSortChange={handleSort}
        actions={
          <ExtendedButton
            variant="outline"
            text="Export"
            radius="medium"
            icon={<Download className="h-3.5 w-3.5" />}
            onClick={() =>
              exportOrdersToCsv(
                selectedIds.length
                  ? orders.filter((o) => selectedIds.includes(o.id))
                  : orders
              )
            }
          />
        }
      >
        <BulkActionMenu
          selectedIds={selectedIds}
          onDeleted={() => setRowSelection({})}
        />
      </ListToolbar>

      {/* <OrderTabs orders={orders?.records} /> */}

      <TableWithPagination
        message="No orders found"
        data={orders?.records ?? []}
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
  )
}

export default OrderList
