import React, { useMemo, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
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

interface CtoReportRow {
  id: string
  userId: string
  name: string
  ctoBonus: string
}

const breadcrumbTrail = ["Dashboard", "Reports", "CTO Reports"]

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

const TOTAL_RECORDS = 20

const TOTAL_INCOME = "30950.00"

const ctoReportRows: CtoReportRow[] = [
  {
    id: "1",
    userId: "987654321",
    name: "Khagendra Bhattrai",
    ctoBonus: "1258698999",
  },
  {
    id: "2",
    userId: "987654112",
    name: "Khagendra Bhattrai",
    ctoBonus: "40",
  },
  {
    id: "3",
    userId: "98265442",
    name: "Khagendra Bhattrai",
    ctoBonus: "12",
  },
]

const cardClass =
  "rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs"

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600"

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pr-9 pl-3.5 text-xs text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const MonthlyReportPage = () => {
  const [payoutNo, setPayoutNo] = useState("All")
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const allSelected =
    ctoReportRows.length > 0 && selectedRows.length === ctoReportRows.length

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === ctoReportRows.length
        ? []
        : ctoReportRows.map((row) => row.id)
    )
  }

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const handleExport = () => {
    const header = ["User ID", "Name", "CTO Bonus"]
    const rows = ctoReportRows.map((row) => [
      row.userId,
      row.name,
      row.ctoBonus,
    ])
    const csvContent = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "monthly-cto-report.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return ctoReportRows
    return ctoReportRows.filter(
      (row) =>
        row.userId.toLowerCase().includes(term) ||
        row.name.toLowerCase().includes(term)
    )
  }, [search])

  const visibleRows = useMemo(
    () => filteredRows.slice(0, rowsPerPage),
    [filteredRows, rowsPerPage]
  )

  const shownCount = visibleRows.length

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="CTO Report" />

      {/* 2. TOP FILTER & SUMMARY CARD */}
      <section className={cardClass}>
        <div>
          <h2 className="text-base font-bold text-slate-800">
            Monthly CTO Reort
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Summary of CTO bonuses distributed for the select
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div className="w-full max-w-[220px]">
            <label htmlFor="payout-no" className={labelClass}>
              Payout No.
            </label>
            <div className="relative">
              <select
                id="payout-no"
                value={payoutNo}
                onChange={(e) => setPayoutNo(e.target.value)}
                className={selectClass}
              >
                <option value="All">All</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <p className="text-sm font-bold text-slate-800">
            Total Income : {TOTAL_INCOME}
          </p>
        </div>
      </section>

      {/* 3. DATA TABLE CARD ("Monthly CTO Report") */}
      <section className={cardClass}>
        {/* Header Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">
            Monthly CTO Report
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-52 rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-xs text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="button"
              onClick={handleExport}
              aria-label="Export"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
            >
              <Download className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              aria-label="Print"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="p-3 font-medium">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={selectedRows.length > 0 && !allSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="p-3 font-medium">
                  <List className="h-4 w-4 text-slate-400" />
                </th>
                <th className="p-3 font-medium">User ID</th>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">CTO Bonus</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, index) => {
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
                    <td className="p-3">{index + 1} </td>
                    <td className="p-3 text-slate-600">{row.userId}</td>
                    <td className="p-3 font-medium text-slate-700">
                      {row.name}
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {row.ctoBonus}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION FOOTER */}
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

export default MonthlyReportPage
