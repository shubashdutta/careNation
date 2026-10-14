import React, { useMemo, useState } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  List,
  Printer,
  Search,
} from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"
import { Checkbox } from "@/components/ui/checkbox"

interface PayoutRow {
  id: string
  requestId: string
  requestDate: string
  userId: string
  mobile: string
  amount: string
  remarks: string
  approvedDate: string
  status: string
}

const breadcrumbTrail = ["Dashboard", "Reports", "Payouts"]

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

const TOTAL_RECORDS = 20

const payoutRows: PayoutRow[] = [
  {
    id: "1",
    requestId: "-",
    requestDate: "20/02/2024",
    userId: "98586984004",
    mobile: "9858698999",
    amount: "2500.00",
    remarks: "Incentive Release(Lot No-1213)",
    approvedDate: "01/02/2024 08:02:56 AM",
    status: "Approved",
  },
  {
    id: "2",
    requestId: "-",
    requestDate: "20/02/2024",
    userId: "9858698459",
    mobile: "9858698999",
    amount: "1200.00",
    remarks: "9825500340",
    approvedDate: "01/02/2024 08:02:56 AM",
    status: "Approved",
  },
  {
    id: "3",
    requestId: "-",
    requestDate: "20/02/2024",
    userId: "9858698925",
    mobile: "9858698999",
    amount: "2400.00",
    remarks: "9756531132",
    approvedDate: "01/02/2024 08:02:56 AM",
    status: "Approved",
  },
]

const cardClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm"

const PayoutPage = () => {
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase()
    const base = term
      ? payoutRows.filter(
          (row) =>
            row.userId.toLowerCase().includes(term) ||
            row.mobile.toLowerCase().includes(term) ||
            row.remarks.toLowerCase().includes(term) ||
            row.status.toLowerCase().includes(term)
        )
      : payoutRows
    return base.slice(0, rowsPerPage)
  }, [search, rowsPerPage])

  const shownCount = filteredRows.length

  const allSelected =
    filteredRows.length > 0 &&
    filteredRows.every((row) => selectedRows.includes(row.id))

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedRows(allSelected ? [] : filteredRows.map((row) => row.id))
  }

  const handleExport = () => {
    const header = [
      "#",
      "Request ID",
      "Request Date",
      "User ID",
      "Mobile",
      "Amount (Rs.)",
      "Remarks",
      "Approved Date",
      "Status",
    ]
    const rows = payoutRows.map((row) => [
      row.requestId,
      row.requestDate,
      row.userId,
      row.mobile,
      row.amount,
      row.remarks,
      row.approvedDate,
      row.status,
    ])
    const csvContent = [header, ...rows]
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "payouts-report.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Payouts" />

      {/* 2. DATA TABLE CARD ("Payouts List") */}
      <section className={cardClass}>
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">Payouts List</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              List of members Complete Payouts
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-48 rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-9 text-xs text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <button
              type="button"
              onClick={handleExport}
              aria-label="Export"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              aria-label="Print"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1300px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="p-3">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={!allSelected && selectedRows.length > 0}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="p-3 font-medium">
                  <List className="h-4 w-4 text-slate-400" />
                </th>
                <th className="p-3 font-medium">Request ID</th>
                <th className="p-3 font-medium">Request Date</th>
                <th className="p-3 font-medium">User ID</th>
                <th className="p-3 font-medium">Mobile</th>
                <th className="p-3 font-medium">Amount (Rs.)</th>
                <th className="p-3 font-medium">Remarks</th>
                <th className="p-3 font-medium">Approved Date</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => {
                const isSelected = selectedRows.includes(row.id)
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-slate-50 transition-colors last:border-b-0 hover:bg-slate-50/60 ${
                      isSelected ? "bg-emerald-50/40" : ""
                    }`}
                  >
                    <td className="p-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(row.id)}
                        aria-label="Select row"
                      />
                    </td>
                    <td className="p-3 text-slate-500">{index + 1}.</td>
                    <td className="p-3 text-slate-600">{row.requestId}</td>
                    <td className="p-3 whitespace-nowrap text-slate-600">
                      {row.requestDate}
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {row.userId}
                    </td>
                    <td className="p-3 whitespace-nowrap text-slate-600">
                      {row.mobile}
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {row.amount}
                    </td>
                    <td
                      className="max-w-[200px] truncate p-3 text-slate-600"
                      title={row.remarks}
                    >
                      {row.remarks}
                    </td>
                    <td className="p-3 whitespace-nowrap text-slate-600">
                      {row.approvedDate}
                    </td>
                    <td className="p-3">
                      <span className="text-xs font-medium text-emerald-600">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="mt-4 flex items-center justify-end gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <div className="relative">
              <select
                aria-label="Rows per page"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pr-7 pl-2.5 text-xs text-slate-600 transition-colors outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                {ROWS_PER_PAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <span>
            1-{shownCount} of {TOTAL_RECORDS}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous page"
              disabled
              className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 text-slate-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next page"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PayoutPage
