import React, { useMemo, useState } from "react"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  List,
  Printer,
} from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"
import { Checkbox } from "@/components/ui/checkbox"

interface SaleRow {
  id: string
  orderNo: string
  orderDate: string
  userId: string
  name: string
  productName: string
  type: string
  ba: string
  quantity: string
  totalAmount: string
}

const breadcrumbTrail = ["Dashboard", "Reports", "Sales Reports"]

const TYPE_OPTIONS = ["All", "Repurchase", "Activation"]

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

const TOTAL_RECORDS = 20

const saleRows: SaleRow[] = [
  {
    id: "1",
    orderNo: "2076",
    orderDate: "345.00/305.31",
    userId: "987654321",
    name: "Khagendra Bhattrai",
    productName: "DYBO CARE 500ml",
    type: "Repurchase",
    ba: "1283.48",
    quantity: "12",
    totalAmount: "305.31",
  },
  {
    id: "2",
    orderNo: "2078",
    orderDate: "345.00/305.31",
    userId: "987654112",
    name: "Khagendra Bhattrai",
    productName: "Super Blue Sine Toilet Cleaner 50...",
    type: "Activation",
    ba: "345.48",
    quantity: "40",
    totalAmount: "305.31",
  },
  {
    id: "3",
    orderNo: "2079",
    orderDate: "345.00/305.31",
    userId: "98265442",
    name: "Khagendra Bhattrai",
    productName: "Super Blue Sine Toilet Cleaner 50...",
    type: "Activation",
    ba: "45.90",
    quantity: "12",
    totalAmount: "305.31",
  },
]

const TYPE_TONE: Record<string, string> = {
  Repurchase: "bg-emerald-50 text-emerald-700",
  Activation: "bg-blue-50 text-blue-700",
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600"

const DateField = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) => {
  const [isPickerActive, setIsPickerActive] = useState(false)

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPickerActive ? "date" : "text"}
          value={value}
          onFocus={() => setIsPickerActive(true)}
          onChange={(e) => onChange(e.target.value)}
          placeholder="dd/mm/yyyy"
          className={inputClass}
        />
        {!isPickerActive && (
          <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
      </div>
    </div>
  )
}

const SalesReportsPage = () => {
  // Filter form state
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [type, setType] = useState(TYPE_OPTIONS[0])

  // Table state
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const shownCount = Math.min(saleRows.length, rowsPerPage)

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase()
    const base = term
      ? saleRows.filter(
          (row) =>
            row.orderNo.toLowerCase().includes(term) ||
            row.userId.toLowerCase().includes(term) ||
            row.name.toLowerCase().includes(term) ||
            row.productName.toLowerCase().includes(term)
        )
      : saleRows
    return base.slice(0, rowsPerPage)
  }, [search, rowsPerPage])

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
      "Order No.",
      "Order Date",
      "User ID",
      "Name",
      "Product Name",
      "Type",
      "BA",
      "Quantity",
      "Total Amount",
    ]
    const rows = saleRows.map((row) => [
      row.orderNo,
      row.orderDate,
      row.userId,
      row.name,
      row.productName,
      row.type,
      row.ba,
      row.quantity,
      row.totalAmount,
    ])
    const csvContent = [header, ...rows]
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "sales-report.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="Sales Reports" />

      {/* 2. TOP FILTER CARD */}
      <section className="space-y-5 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
        <div>
          <h2 className="text-base font-bold text-slate-800">Sales Report</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Summary of all product orders and sales.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Row 1 */}
          <DateField
            id="date-from"
            label="Date From"
            value={dateFrom}
            onChange={setDateFrom}
          />
          <DateField
            id="date-to"
            label="Date To"
            value={dateTo}
            onChange={setDateTo}
          />

          {/* Row 2 */}
          <div>
            <label htmlFor="type" className={labelClass}>
              Type
            </label>
            <div className="relative">
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={inputClass}
              >
                {TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="justify-self-end rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* 3. DATA TABLE CARD ("Sell List") */}
      <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">Sell List</h2>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-48 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left text-xs">
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
                  {<List className="h-4 w-4 text-slate-400" />}{" "}
                </th>
                <th className="p-3 font-medium">Order No.</th>
                <th className="p-3 font-medium">Order Date</th>
                <th className="p-3 font-medium">User ID</th>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Product Name</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">BA</th>
                <th className="p-3 font-medium">Quantity</th>
                <th className="p-3 font-medium">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-50 transition-colors last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="p-3">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onCheckedChange={() => toggleRow(row.id)}
                      aria-label="Select row"
                    />
                  </td>
                  <td className="p-3">{index + 1} </td>
                  <td className="p-3">
                    <span className="inline-block rounded bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">
                      {row.orderNo}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{row.orderDate}</td>
                  <td className="p-3 text-slate-600">{row.userId}</td>
                  <td className="p-3 font-medium text-slate-700">{row.name}</td>
                  <td
                    className="max-w-[180px] truncate p-3 text-slate-600"
                    title={row.productName}
                  >
                    {row.productName}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        TYPE_TONE[row.type] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{row.ba}</td>
                  <td className="p-3 text-slate-600">{row.quantity}</td>
                  <td className="p-3 font-medium text-slate-700">
                    {row.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION FOOTER */}
        <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
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

export default SalesReportsPage
