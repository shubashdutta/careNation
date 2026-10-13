import React, { useMemo, useState } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  List,
  Printer,
} from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"
import { Checkbox } from "@/components/ui/checkbox"

interface CommissionRow {
  id: string
  userId: string
  userName: string
  btBaGold: string
  diamond: string
  gold: string
  currentBa: string
  totalGold: string
  totalDiamond: string
  matchedBa: string
}

const breadcrumbTrail = ["Dashboard", "Reports", "Commission Reports"]

const PAYOUT_OPTIONS = ["Select Payout", "304 - 24/02/2022", "305 - 24/03/2022"]

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

const TOTAL_RECORDS = 20

const commissionRows: CommissionRow[] = [
  {
    id: "1",
    userId: "9841421770",
    userName: "Khagendra Bhattrai",
    btBaGold: "5465161.55",
    diamond: "184.55",
    gold: "65446.33",
    currentBa: "527.22",
    totalGold: "425.25",
    totalDiamond: "41425.25",
    matchedBa: "3696.80",
  },
  {
    id: "2",
    userId: "9841421770",
    userName: "Khagendra Bhattrai",
    btBaGold: "188616.25",
    diamond: "68.55",
    gold: "556.85",
    currentBa: "72.35",
    totalGold: "508.40",
    totalDiamond: "52427.22",
    matchedBa: "4696.80",
  },
]

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600"

const CommissionReportPage = () => {
  // Step 1 -> Step 2 switch
  const [isReportGenerated, setIsReportGenerated] = useState(false)

  // Filter form state
  const [payout, setPayout] = useState(PAYOUT_OPTIONS[0])

  // Table state
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const shownCount = Math.min(commissionRows.length, rowsPerPage)

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase()
    const base = term
      ? commissionRows.filter(
          (row) =>
            row.userId.toLowerCase().includes(term) ||
            row.userName.toLowerCase().includes(term)
        )
      : commissionRows
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
      "User ID",
      "User Name",
      "B/T BA Gold",
      "Diamond",
      "Gold",
      "Current BA",
      "Total Gold",
      "Total Diamond",
      "Matched BA",
    ]
    const rows = commissionRows.map((row) => [
      row.userId,
      row.userName,
      row.btBaGold,
      row.diamond,
      row.gold,
      row.currentBa,
      row.totalGold,
      row.totalDiamond,
      row.matchedBa,
    ])
    const csvContent = [header, ...rows]
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "commission-report.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <Breadcrumb
        trail={breadcrumbTrail}
        title={isReportGenerated ? "Payout Reports" : "Commission Report"}
      />

      <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
        <div>
          <h2 className="text-base font-bold text-slate-800">Payout Report</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Commission Report Club Wise
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full max-w-xs">
            <label htmlFor="payout" className={labelClass}>
              Payout
            </label>
            <div className="relative">
              <select
                id="payout"
                value={payout}
                onChange={(e) => setPayout(e.target.value)}
                className={inputClass}
              >
                {PAYOUT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsReportGenerated(true)}
            className="rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Submit
          </button>
        </div>
      </section>

      {/* 4 & 5. GENERATED REPORT (renders after Submit) */}
      {isReportGenerated && (
        <>
          {/* 4. GENERATED SUMMARY BAR */}
          <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Commission Payout Summary
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Summary of commissions and bonuses for the selected period.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-xs text-slate-500">Payout No.</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">304</p>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-xs text-slate-500">From Date</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  24/02/2022
                </p>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-xs text-slate-500">To Date</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  24/02/2022
                </p>
              </div>
              <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-4">
                <p className="text-xs text-slate-500">Total Income</p>
                <p className="mt-1 text-sm font-bold text-emerald-700">
                  Rs. 30,950.00
                </p>
              </div>
            </div>
          </section>

          {/* 5. DETAILED DATA TABLE CARD ("Shopping Reports") */}
          <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-800">
                Shopping Reports
              </h2>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
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
              <table className="w-full min-w-[900px] border-collapse text-left text-xs">
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
                    <th className="p-3 font-medium">User ID</th>
                    <th className="p-3 font-medium">User Name</th>
                    <th className="p-3 font-medium">B/T BA Gold</th>
                    <th className="p-3 font-medium">Diamond</th>
                    <th className="p-3 font-medium">Gold</th>
                    <th className="p-3 font-medium">Current BA</th>
                    <th className="p-3 font-medium">Total Gold</th>
                    <th className="p-3 font-medium">Total Diamond</th>
                    <th className="p-3 font-medium">Matched BA</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
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
                      <td className="p-3">
                        <List className="h-4 w-4 text-emerald-500" />
                      </td>
                      <td className="p-3 text-slate-600">{row.userId}</td>
                      <td className="p-3 font-medium text-slate-700">
                        {row.userName}
                      </td>
                      <td className="p-3 text-slate-600">{row.btBaGold}</td>
                      <td className="p-3 text-slate-600">{row.diamond}</td>
                      <td className="p-3 text-slate-600">{row.gold}</td>
                      <td className="p-3 text-slate-600">{row.currentBa}</td>
                      <td className="p-3 text-slate-600">{row.totalGold}</td>
                      <td className="p-3 text-slate-600">{row.totalDiamond}</td>
                      <td className="p-3 text-slate-600">{row.matchedBa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 6. PAGINATION FOOTER */}
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
        </>
      )}
    </div>
  )
}

export default CommissionReportPage
