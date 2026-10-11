import { Download, Printer, Search } from "lucide-react"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"

import Breadcrumb from "@/components/shared/breadcrumb"
import TableWithPagination from "@/components/shared/table-with-pagination"
import { Input } from "@/components/ui/input"
import useSearch from "@/hooks/use-search"
import type { IPaginationDataType } from "@/lib/type"

import type { IPaymentStatement } from "../types"
import { usePaymentCustomerColumns } from "./customer-columns"

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

const customerData: IPaymentCustomer[] = [
  {
    id: "CUS-001",
    mobile: "1334458965",
    name: "ANJU DEVI BHATTRAI",
    accountNo: "032600001588524",
    bankName: "Global IME Bank",
    bankBranch: "Chabahil Branch KTM.",
    transNo: "TRX-250519-001",
    payableAmt: 20000,
    status: "Transferred",
  },
]

const PaymentDetails = () => {
  const location = useLocation()

  const payment = location.state?.payment as IPaymentStatement | undefined

  const { search, handleSearch } = useSearch()

  const columns = usePaymentCustomerColumns()

  const filteredData = useMemo(() => {
    if (!search.trim()) {
      return customerData
    }

    const searchValue = search.toLowerCase()

    return customerData.filter((customer) =>
      [
        customer.mobile,
        customer.name,
        customer.accountNo,
        customer.bankName,
        customer.bankBranch,
        customer.transNo,
        customer.status,
      ].some((value) => String(value).toLowerCase().includes(searchValue))
    )
  }, [search])

  if (!payment) {
    return (
      <div className="space-y-3">
        <Breadcrumb
          trail={["Dashboard", "Payment Details"]}
          title="Payment Details"
        />

        <div className="rounded-lg bg-white p-5">
          <p className="text-sm text-gray-500">Payment details not found.</p>
        </div>
      </div>
    )
  }

  const paginationData: IPaginationDataType = {
    limit: 5,
    currentPage: 1,
    next: null,
    prev: null,
    totalPages: 1,
    totalRecords: filteredData.length,
    pagingCounter: 1,
    hasPrevious: false,
    hasNext: false,
    recordShown: filteredData.length,
  }

  return (
    <div className="space-y-3">
      <Breadcrumb
        trail={["Dashboard", "Payment Details"]}
        title="Payment Details"
      />

      <div>
        <h1 className="text-xl font-semibold text-gray-800">Lot Details</h1>
      </div>

      <div className="rounded-lg bg-white p-5">
        <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-20">
          <div className="space-y-4">
            <DetailRow label="Lot No." value={payment.lotNo} />

            <DetailRow label="Payment Mode" value={payment.paymentMethod} />

            <DetailRow label="Amount" value={payment.payableAmt} />

            <DetailRow label="Paid Member" value={payment.member} />

            <DetailRow label="Transaction Date" value={payment.transDate} />
          </div>

          <div className="space-y-4">
            <DetailRow label="Created On" value={payment.createdOn} />

            <DetailRow label="Payee Bank" value={payment.payeeBank} />

            <DetailRow
              label="Settlement Date"
              value={payment.paymentSettlement}
            />

            <DetailRow label="Lot Status" value="Settled" />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-5">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Customer List</h2>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-48">
              <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />

              <Input
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search"
                className="h-9 rounded-lg border-gray-200 pl-9 text-xs shadow-none"
              />
            </div>

            <button
              type="button"
              aria-label="Download customer list"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Print customer list"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>

        <TableWithPagination
          message="No customers found"
          data={filteredData}
          isLoading={false}
          columns={columns}
          paginationData={paginationData}
          getRowId={(row) => row.id}
        />
      </div>
    </div>
  )
}

interface DetailRowProps {
  label: string
  value: string | number
}

const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <div className="grid grid-cols-[140px_12px_1fr] items-center text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-400">:</span>
      <span className="text-gray-500">{value}</span>
    </div>
  )
}

export default PaymentDetails
