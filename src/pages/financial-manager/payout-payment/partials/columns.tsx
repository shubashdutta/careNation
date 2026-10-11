import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import type { IFile } from "../types"

export const usePayoutPaymentColumns = (filterMode: "single" | "cycle"): ColumnDef<IFile>[] => {
  const baseColumns: ColumnDef<IFile>[] = [
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
      header: "Mobile No.",
      accessorKey: "mobile",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.mobile}</span>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <span className="font-medium text-tertiary-100">{row.original.name}</span>
      ),
    },
    {
      header: "Pan No.",
      accessorKey: "pan",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.pan}</span>
      ),
    },
    {
      header: "Bank Name",
      accessorKey: "bankName",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.bankName}</span>
      ),
    },
    {
      header: "Account No.",
      accessorKey: "accountNo",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.accountNo}</span>
      ),
    },
    {
      header: "Bank Branch",
      accessorKey: "bankBranch",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.bankBranch}</span>
      ),
    },
    {
      header: "Release Amt.",
      accessorKey: "releaseAmt",
      cell: ({ row }) => (
        <span className="text-tertiary-200">{row.original.releaseAmt}</span>
      ),
    },
  ]

  if (filterMode === "cycle") {
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
      ...baseColumns,
    ]
  }

  return [
    ...baseColumns,
  ]
}