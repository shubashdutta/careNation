import type { ColumnDef } from "@tanstack/react-table"
import { ImageIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import CellAction from "./components/cell-action"
import StatusSwitch from "./components/status-switch"
import type { IBrand } from "./type"

export const useBrandColumns = (): ColumnDef<IBrand>[] => {
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
      id: "s.n",
      header: "S.N",
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
          {row.original.name}
        </span>
      ),
    },
    {
      id: "slug",
      header: "Slug",
      accessorKey: "slug",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.slug}</span>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {row.original.description}
        </span>
      ),
    },
    {
      header: "Logo",
      accessorKey: "logo",
      cell: ({ row }) =>
        row.original.logo ? (
          <img
            src={row.original.logo}
            alt={row.original.name}
            className="h-10 w-10 shrink-0 rounded-lg border border-tertiary-75 object-contain"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <ImageIcon className="h-4 w-4 text-tertiary-300" />
          </div>
        ),
      enableSorting: false,
    },

    {
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusSwitch id={row.original.id} status={row.original.status} />
      ),
      enableSorting: false,
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => <CellAction brand={row.original} />,
      enableSorting: false,
    },
  ]
}
