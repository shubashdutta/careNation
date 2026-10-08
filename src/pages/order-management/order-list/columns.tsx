import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import CellAction from "./components/cell-action"
import type { IOrder, OrderStatus } from "./type"
import { ImageIcon } from "lucide-react"

const STATUS_TONE: Record<OrderStatus, string> = {
  PENDING: "bg-yellow2 text-yellow3",
  CONFIRMED: "bg-success3 text-success",
  "Sent Warehouse": "bg-primary-100 text-primary-400",
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
      header: "Order",
      cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
    },
    {
      header: "Customer Name",
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
      id: "image",
      header: "Image",
      cell: ({ row }) =>
        row.original?.orderItems.length > 0 ? (
          <img
            src={row.original?.orderItems?.[0]?.productSnapshot?.image}
            alt={
              row.original?.orderItems?.[0]?.productSnapshot?.productName ||
              "Product Image"
            }
            className="h-9 w-9 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            <ImageIcon className="h-4 w-4 text-tertiary-300" />
          </div>
        ),
    },
    {
      header: "Product",
      accessorKey: "productName",
      cell: ({ row }) => (
        <span className="font-normal text-tertiary-100">
          {row.original?.orderItems.length > 1
            ? `${row.original.orderItems.length} items`
            : row.original?.orderItems?.[0]?.productSnapshot?.productName ||
              "N/A"}
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
      header: "Payment Method",
      accessorKey: "paymentMethod",
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
      cell: ({ row }) => <CellAction order={row.original} />,
      enableSorting: false,
    },
  ]
}
