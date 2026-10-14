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

interface WeeklyPayoutRow {
  id: string
  userId: string
  name: string
  day1: string
  day2: string
  day3: string
  day4: string
  day5: string
  day6: string
  day7: string
  totalBonus: string
  tds: string
  payout: string
}

const breadcrumbTrail = ["Dashboard", "Reports", "Weekly Commission Reports"]

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

const TOTAL_RECORDS = 20

const TOTAL_INCOME = "30950.00"

const DAY_HEADERS: { key: keyof WeeklyPayoutRow; label: string }[] = [
  { key: "day1", label: "Day 1" },
  { key: "day2", label: "Day 2" },
  { key: "day3", label: "Day 3" },
  { key: "day4", label: "Day 4" },
  { key: "day5", label: "Day 5" },
  { key: "day6", label: "Day 6" },
  { key: "day7", label: "Day 7" },
]

const weeklyPayoutRows: WeeklyPayoutRow[] = [
  {
    id: "1",
    userId: "987654321",
    name: "Khagendra Bhattrai",
    day1: "1283.48",
    day2: "1283.48",
    day3: "1283.48",
    day4: "1283.48",
    day5: "1283.48",
    day6: "1283.48",
    day7: "1283.48",
    totalBonus: "1258698999",
    tds: "15%",
    payout: "305.31",
  },
  {
    id: "2",
    userId: "987654112",
    name: "Khagendra Bhattrai",
    day1: "345.48",
    day2: "345.48",
    day3: "345.48",
    day4: "345.48",
    day5: "345.48",
    day6: "345.48",
    day7: "345.48",
    totalBonus: "40",
    tds: "15%",
    payout: "305.31",
  },
  {
    id: "3",
    userId: "98265442",
    name: "Khagendra Bhattrai",
    day1: "45.90",
    day2: "45.90",
    day3: "45.90",
    day4: "45.90",
    day5: "45.90",
    day6: "45.90",
    day7: "45.90",
    totalBonus: "12",
    tds: "15%",
    payout: "305.31",
  },
]

const cardClass =
  "rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs"

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600"

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pr-9 pl-3.5 text-xs text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const WeeklyReportPage = () => {
  const [payoutNo, setPayoutNo] = useState("All")
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const allSelected =
    weeklyPayoutRows.length > 0 &&
    selectedRows.length === weeklyPayoutRows.length

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === weeklyPayoutRows.length
        ? []
        : weeklyPayoutRows.map((row) => row.id)
    )
  }

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const handleExport = () => {
    const header = [
      "User ID",
      "Name",
      ...DAY_HEADERS.map((day) => day.label),
      "Total Bonus",
      "TDS",
      "Payout",
    ]
    const rows = weeklyPayoutRows.map((row) => [
      row.userId,
      row.name,
      ...DAY_HEADERS.map((day) => row[day.key]),
      row.totalBonus,
      row.tds,
      row.payout,
    ])
    const csvContent = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "weekly-commission-report.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return weeklyPayoutRows
    return weeklyPayoutRows.filter(
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
      <Breadcrumb trail={breadcrumbTrail} title="Weekly Commission Reports" />

      {/* 2. TOP FILTER & SUMMARY CARD */}
      <section className={cardClass}>
        <div>
          <h2 className="text-base font-bold text-slate-800">Payout Report</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Weekly breakdown of income and payout.
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

      {/* 3. DATA TABLE CARD ("Payout Reports") */}
      <section className={cardClass}>
        {/* Header Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">Payout Reports</h2>

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

        {/* Table (horizontally scrollable for the wide column set) */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left text-xs whitespace-nowrap">
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
                {DAY_HEADERS.map((day) => (
                  <th key={day.key} className="p-3 font-medium">
                    {day.label}
                  </th>
                ))}
                <th className="p-3 font-medium">Total Bonus</th>
                <th className="p-3 font-medium">TDS</th>
                <th className="p-3 font-medium">Payout</th>
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
                    {DAY_HEADERS.map((day) => (
                      <td key={day.key} className="p-3 text-slate-600">
                        {row[day.key]}
                      </td>
                    ))}
                    <td className="p-3 font-medium text-slate-700">
                      {row.totalBonus}
                    </td>
                    <td className="p-3 text-slate-600">{row.tds}</td>
                    <td className="p-3 font-medium text-slate-700">
                      {row.payout}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

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

export default WeeklyReportPage
