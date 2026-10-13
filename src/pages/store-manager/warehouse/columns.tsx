import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import type { IWarehouse } from "./type"
import CellAction from "./partials/cell-action"

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
    // {
    //   header: "Name",
    //   accessorKey: "name",
    //   cell: ({ row }) => (
    //     <span className="font-medium text-tertiary-100">
    //       {row.original.name ?? "—"}
    //     </span>
    //   ),
    // },
    {
      id: "warehouse",
      header: "Warehouse ",
      accessorKey: "warehouse",
      cell: ({ row }) => {
        return (
          <span className="text-tertiary-200">{row.original.code ?? "—"}</span>
        )
      },
    },
    {
      header: "Province",
      accessorKey: "province",
      cell: ({ row }) => (
        <span className="text-tertiary-200">
          {row.original.province ?? row.getValue("province") ?? "—"}
        </span>
      ),
    },
    {
      header: "District",
      accessorKey: "district",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.district ?? "—"}</span>
      ),
    },
    {
      header: "Municipality",
      accessorKey: "municipality",
      cell: ({ row }) => (
        <span className="text-tertiary-200">
          {row.original.municipality ?? "—"}
        </span>
      ),
    },
    {
      header: "Phone",
      accessorKey: "contact.contactPhone",
      cell: ({ row }) => (
        <span className="text-tertiary-200">
          {row.original.contact?.contactPhone ?? "—"}
        </span>
      ),
    },
    {
      header: "Email",
      accessorKey: "contact.contactEmail",
      cell: ({ row }) => (
        <span className="text-tertiary-200">
          {row.original.contact?.contactEmail ?? "—"}
        </span>
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
