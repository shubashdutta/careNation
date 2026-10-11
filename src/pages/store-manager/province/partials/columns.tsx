import type { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"
import type { IProvince } from "../types"

export const useProvinceColumns = (
  onEdit?: (province: IProvince) => void
): ColumnDef<IProvince>[] => {
  return [
    {
      id: "s.n",
      header: "S.N",
      cell: ({ row }) => (
        <span className="text-xs text-tertiary-200">{row.index + 1}.</span>
      ),
    },
    {
      accessorKey: "storeCode",
      header: "Store Code",
    },
    {
      accessorKey: "storeName",
      header: "Store Name",
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "password",
      header: "Password",
      cell: () => <span>********</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <span className="flex items-center gap-1.5 font-medium text-green-500">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {status}
          </span>
        )
      },
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <button
          type="button"
          aria-label="Edit province"
          onClick={() => onEdit?.(row.original)}
          className="cursor-pointer text-gray-500 transition-colors hover:text-gray-700"
        >
          <Edit className="h-4 w-4" />
        </button>
      ),
    },
  ]
}
