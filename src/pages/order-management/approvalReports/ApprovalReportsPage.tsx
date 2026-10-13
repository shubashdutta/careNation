import React, { useMemo, useState } from "react"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  List,
} from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"

interface UserWiseOrder {
  id: string
  userName: string
  orderCount: string
  amount: number
  isLink?: boolean
}

const breadcrumbTrail = ["Dashboard", "Reports", "User Wise Orders"]

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

const TOTAL_RECORDS = 20

const userWiseOrders: UserWiseOrder[] = [
  { id: "1", userName: "Auto Online", orderCount: "02", amount: 82, isLink: true },
  { id: "2", userName: "Santosh Adhikari", orderCount: "05", amount: 1250 },
  { id: "3", userName: "Laxmi Prasad Bhatt", orderCount: "03", amount: 890 },
]

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600"

const ApprovalReportsPage = () => {
  // Filter form state
  const [reportDate, setReportDate] = useState("")
  const [isDatePickerActive, setIsDatePickerActive] = useState(false)

  // Table state
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const shownCount = Math.min(userWiseOrders.length, rowsPerPage)

  const visibleOrders = useMemo(
    () => userWiseOrders.slice(0, rowsPerPage),
    [rowsPerPage]
  )

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="Users Wise Orders" />

      {/* 2. TOP DATE FILTER CARD */}
      <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
        <div>
          <h2 className="text-base font-bold text-slate-800">Select Date</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Select date to get order wise report
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full max-w-xs">
            <label htmlFor="report-date" className={labelClass}>
              Date
            </label>
            <div className="relative">
              <input
                id="report-date"
                type={isDatePickerActive ? "date" : "text"}
                value={reportDate}
                onFocus={() => setIsDatePickerActive(true)}
                onChange={(e) => setReportDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className={inputClass}
              />
              {!isDatePickerActive && (
                <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              )}
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-xs text-white transition-colors hover:bg-emerald-700"
          >
            Submit
          </button>
        </div>
      </section>

      {/* 3. DATA TABLE CARD ("Users Wise Orders") */}
      <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">
            Users Wise Orders
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="p-3 font-medium">
                  <List className="h-4 w-4 text-slate-400" />
                </th>
                <th className="p-3 font-medium">#</th>
                <th className="p-3 font-medium">User Name</th>
                <th className="p-3 font-medium">No. Of Order</th>
                <th className="p-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-50 transition-colors last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="p-3">
                    <List className="h-4 w-4 text-emerald-500" />
                  </td>
                  <td className="p-3 text-slate-500">{index + 1}</td>
                  <td className="p-3">
                    {order.isLink ? (
                      <a
                        href="#"
                        className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                      >
                        {order.userName}
                      </a>
                    ) : (
                      <span className="font-medium text-slate-700">
                        {order.userName}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-600">{order.orderCount}</td>
                  <td className="p-3 font-medium text-slate-700">
                    {order.amount}
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

export default ApprovalReportsPage
