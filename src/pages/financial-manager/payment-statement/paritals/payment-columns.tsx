import type { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"

import type { IPaymentStatement } from "../types"

export const usePaymentStatementColumns =
  (): ColumnDef<IPaymentStatement>[] => {
    const navigate = useNavigate()

    return [
      {
        id: "s.n",
        header: "S.N",
        cell: ({ row }) => (
          <span className="text-xs text-tertiary-200">
            {row.index + 1}.
          </span>
        ),
      },
      {
        header: "Lot No.",
        accessorKey: "lotNo",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() =>
              navigate(`/payment-details/${row.original.id}`)
            }
            className="text-xs text-tertiary-200 hover:underline cursor-pointer"
          >
            {row.original.lotNo}
          </button>
        ),
      },
      {
        header: "Member",
        accessorKey: "member",
        cell: ({ row }) => (
          <span className="text-xs text-tertiary-200">
            {row.original.member}
          </span>
        ),
      },
      {
        header: "Created On",
        accessorKey: "createdOn",
        cell: ({ row }) => (
          <span className="text-xs text-tertiary-200">
            {row.original.createdOn}
          </span>
        ),
      },
      {
        header: "Payment Method",
        accessorKey: "paymentMethod",
        cell: ({ row }) => (
          <span className="text-xs text-tertiary-200">
            {row.original.paymentMethod}
          </span>
        ),
      },
      {
        header: "Payee Bank",
        accessorKey: "payeeBank",
        cell: ({ row }) => (
          <span className="text-xs text-tertiary-200">
            {row.original.payeeBank}
          </span>
        ),
      },
      {
        header: "Payment Settlement",
        accessorKey: "paymentSettlement",
        cell: ({ row }) => (
          <span className="text-xs text-tertiary-200">
            {row.original.paymentSettlement}
          </span>
        ),
      },
      {
        header: "Trans. Date",
        accessorKey: "transDate",
        cell: ({ row }) => (
          <span className="text-xs text-tertiary-200">
            {row.original.transDate}
          </span>
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
    ]
  }