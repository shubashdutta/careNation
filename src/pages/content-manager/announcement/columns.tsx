//@ts-nocheck
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowRight, ImageIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import CellAction from "./components/cell-action"
import type { ICampaign } from "./type"
import { getStatusBadge } from "@/utils/get-stauts-badge"
import { formatDateTimeToShort } from "@/utils/format-date"
import { Progress } from "@/components/ui/progress"

export const useCampaignColumns = (): ColumnDef<ICampaign>[] => {
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
      header: "Campaign",
      accessorKey: "name",
      cell: ({ row }) => (
        <span className="font-medium text-tertiary-100">
          {row.original.name}
          <p className="text-[10px] font-light text-tertiary-300">
            /{row.original.slug}
          </p>
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span className="text-tertiary-200">
          {getStatusBadge({ status: row.original.status })}
        </span>
      ),
    },
    {
      id: "offer&discount",
      header: "Offer & Discount",
      accessorKey: "discountAmount",
      cell: ({ row }) => (
        <span className="font-medium text-tertiary-200">
          {row.original.discountType}
          <p className="text-[10px] text-tertiary-300">
            {row.original.discountAmount}
          </p>
        </span>
      ),
    },
    {
      id: "duration",
      header: "Duration",
      accessorKey: "duration",
      cell: ({ row }) => (
        <span className="font-medium text-tertiary-300">
          {formatDateTimeToShort(row.original.startDate)}{" "}
          <ArrowRight className="mx-1 inline h-3 w-3 text-tertiary-300" />{" "}
          {formatDateTimeToShort(row.original.endDate)}
        </span>
      ),
    },
    {
      header: "Vendors Spent",
      accessorKey: "vendorsSpent",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {row.original.minimumOrderValue}
        </span>
      ),
    },
    {
      id: "redemptions",
      header: "Redemptions",
      cell: () => {
        const current = 3820
        const total = 10000
        const percentage =
          total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 0

        return (
          <div className="w-36 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">
                {current.toLocaleString()} redeemed
              </span>
              <span className="font-medium text-slate-400">{percentage}%</span>
            </div>

            <Progress value={percentage} className="h-1.5" />
          </div>
        )
      },
    },
    {
      header: "Logo",
      accessorKey: "bannerImage",
      cell: ({ row }) =>
        row.original.bannerImage ? (
          <img
            src={row.original.bannerImage}
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
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <span className="max-w-[20rem] truncate text-tertiary-200">
          {formatDateTimeToShort(row.original.createdAt)}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => <CellAction campaign={row.original} />,
      enableSorting: false,
    },
  ]
}
