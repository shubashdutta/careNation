import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import OrderRowActions from "./components/order-row-actions"
import type { IOrder, OrderStatus } from "./type"

const STATUS_TONE: Record<OrderStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-emerald-50 text-emerald-700",
  "Sent Warehouse": "bg-sky-50 text-sky-700",
}

const getConfirmationData = (status: OrderStatus) => {
  switch (status) {
    case "CONFIRMED":
      return "Approved by: TDM"
    case "Sent Warehouse":
      return "Dispatched by: TDM"
    default:
      return "Awaiting confirmation"
  }
}

export const useOrderColumns = (): ColumnDef<IOrder>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
    },
    {
      id: "order",
      header: "#",
      cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
    },
    {
      header: "Order No.",
      accessorKey: "orderNumber",
      cell: ({ row }) => (
        <span className="inline-block rounded bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">
          #{row.original.orderNumber}
        </span>
      ),
    },
    {
      header: "User Name",
      accessorKey: "customerName",
      cell: ({ row }) => (
        <span className="font-normal text-tertiary-100">
          {row.original?.shippingAddress?.fullName ||
            row.original?.billingAddress?.fullName ||
            "N/A"}
        </span>
      ),
    },
    {
      header: "Confirmation Data",
      id: "confirmationData",
      cell: ({ row }) => (
        <span className="inline-block rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
          {getConfirmationData(row.original.status)}
        </span>
      ),
    },
    {
      header: "Total Amount",
      accessorKey: "totalAmount",
      cell: ({ row }) => (
        <span className="font-normal text-success2">
          NPR {row.original.totalAmount.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Order Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-light ${STATUS_TONE[row.original.status]}`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => <OrderRowActions order={row.original} />,
      enableSorting: false,
    },
  ]
}

