import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import CellAction from "./components/cell-action"
import type { IFile } from "./type"

export const useUserColumns = (): ColumnDef<IFile>[] => {
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
      header: "I.D.",
      accessorKey: "name",
      cell: ({ row }) => (
        <span className="font-medium text-tertiary-100">
          {row.original.name}
        </span>
      ),
    },

    {
      header: "Username",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {row.original.description}
        </span>
      ),
    },
    {
      header: "Name",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {row.original.description}
        </span>
      ),
    },
    {
      header: "Mobile",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {row.original.description}
        </span>
      ),
    },
    {
      header: "Email",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {row.original.description}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {row.original.description}
        </span>
      ),
    },
    {
      header: "Branch",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {row.original.description}
        </span>
      ),
    },
    {
      header: "AC Number",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {row.original.description}
        </span>
      ),
    },
    {
      header: "PAN",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {row.original.description}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => <CellAction File={row.original} />,
      enableSorting: false,
    },
  ]
}
