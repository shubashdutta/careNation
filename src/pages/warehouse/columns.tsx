import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import CellAction from "./components/cell-action"
import type { IWarehouse } from "./type"

export const useWarehouseColumns = (): ColumnDef<IWarehouse>[] => {
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
      cell: ({ row }) => (
        <span className="text-tertiary-200">
          {String(row.index + 1).padStart(2, "0")}
        </span>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <span className="font-medium text-tertiary-100">
          {row.original.name ?? "—"}
        </span>
      ),
    },
    {
      id: "code",
      header: "Warehouse Code",
      accessorKey: "code",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.code ?? "—"}</span>
      ),
    },
    {
      header: "Type",
      accessorKey: "type",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.type ?? "—"}</span>
      ),
    },
    {
      header: "Contact Name",
      accessorKey: "contact.contactName",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.contact?.contactName ?? "—"}</span>
      ),
    },
    {
      header: "Contact Phone",
      accessorKey: "contact.contactPhone",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.contact?.contactPhone ?? "—"}</span>
      ),
    },
      {
      header: "Contact Email",
      accessorKey: "contact.contactEmail",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.contact?.contactEmail ?? "—"}</span>
      ),
    },
    {
      header: "Address Line 1",
      accessorKey: "address.addressLine1",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.address?.addressLine1 ?? "—"}</span>
      ),
    },
      {
      header: "Address Line 2",
      accessorKey: "address.addressLine2",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.address?.addressLine2 ?? "—"}</span>
      ),
    },

    {
      header: "Postcode",
      accessorKey: "address.postcode",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.address?.postalCode ?? "—"}</span>
      ),
    },
    {
      header: "City",
      accessorKey: "address.city",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.address?.city ?? "—"}</span>
      ),
    },
    {
      header: "State",
      accessorKey: "address.state",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.address?.state ?? "—"}</span>
      ),
    },

    {
      id: "action",
      header: "Action",
      cell: ({ row }) => <CellAction warehouse={row.original} />,
      enableSorting: false,
    },
  ]
}
