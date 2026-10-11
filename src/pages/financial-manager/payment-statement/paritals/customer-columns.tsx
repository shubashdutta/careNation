import type { ColumnDef } from "@tanstack/react-table"

interface IPaymentCustomer {
  id: string
  mobile: string
  name: string
  accountNo: string
  bankName: string
  bankBranch: string
  transNo: string
  payableAmt: number
  status: string
}

export const usePaymentCustomerColumns = (): ColumnDef<IPaymentCustomer>[] => [
  {
    id: "s.n",
    header: "S.N",
    cell: ({ row }) => (
      <span className="text-xs text-tertiary-200">{row.index + 1}.</span>
    ),
  },
  {
    header: "Mobile",
    accessorKey: "mobile",
    cell: ({ row }) => (
      <span className="text-xs text-tertiary-200">{row.original.mobile}</span>
    ),
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <span className="text-xs text-tertiary-200">{row.original.name}</span>
    ),
  },
  {
    header: "Account No.",
    accessorKey: "accountNo",
    cell: ({ row }) => (
      <span className="text-xs text-tertiary-200">
        {row.original.accountNo}
      </span>
    ),
  },
  {
    header: "Bank Name",
    accessorKey: "bankName",
    cell: ({ row }) => (
      <span className="text-xs text-tertiary-200">{row.original.bankName}</span>
    ),
  },
  {
    header: "Bank Branch",
    accessorKey: "bankBranch",
    cell: ({ row }) => (
      <span className="text-xs text-tertiary-200">
        {row.original.bankBranch}
      </span>
    ),
  },
  {
    header: "Trans. No.",
    accessorKey: "transNo",
    cell: ({ row }) => (
      <span className="text-xs text-tertiary-200">{row.original.transNo}</span>
    ),
  },
  {
    header: "Payable Amt.",
    accessorKey: "payableAmt",
    cell: ({ row }) => (
      <span className="text-xs font-medium text-tertiary-100">
        {row.original.payableAmt}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <span className="text-xs text-tertiary-200">{row.original.status}</span>
    ),
  },
]
