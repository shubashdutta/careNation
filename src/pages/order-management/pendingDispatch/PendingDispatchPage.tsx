import React, { useMemo, useState } from "react"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  List,
  Printer,
  Search,
} from "lucide-react"

interface ShoppingReport {
  id: string
  userId: string
  userName: string
  orderNo: string
  nivNo: string
  totalAmount: number
  totalBusiness: number
  dispatchDate: string
  dispatchBy: string
  storePoint: string
}

const DISPATCH_STATUS_OPTIONS = ["Pending", "Processing", "Completed"]

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

const TOTAL_RECORDS = 20

const shoppingReports: ShoppingReport[] = [
  {
    id: "1",
    userId: "Bajra Toothpaste",
    userName: "Anita Gautam",
    orderNo: "20480",
    nivNo: "NIV 589654/12365",
    totalAmount: 980.45,
    totalBusiness: 1200.0,
    dispatchDate: "10/06/24",
    dispatchBy: "Santosh Adhikari",
    storePoint: "Central Office",
  },
  {
    id: "2",
    userId: "Dabur Honey",
    userName: "Nirosh Adhikari",
    orderNo: "20481",
    nivNo: "NIV 589655/12366",
    totalAmount: 1540.0,
    totalBusiness: 1800.5,
    dispatchDate: "11/06/24",
    dispatchBy: "Ram Thapa",
    storePoint: "Sunwal",
  },
  {
    id: "3",
    userId: "Patanjali Aloe Vera Gel",
    userName: "Sita Sharma",
    orderNo: "20482",
    nivNo: "NIV 589656/12367",
    totalAmount: 720.0,
    totalBusiness: 900.25,
    dispatchDate: "12/06/24",
    dispatchBy: "Santosh Adhikari",
    storePoint: "Central Office",
  },
  {
    id: "4",
    userId: "Himalaya Face Wash",
    userName: "Bikash Gurung",
    orderNo: "20483",
    nivNo: "NIV 589657/12368",
    totalAmount: 2110.75,
    totalBusiness: 2500.0,
    dispatchDate: "13/06/24",
    dispatchBy: "Gita Sharma",
    storePoint: "Sunwal",
  },
]

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600"

const PendingDispatchPage = () => {
  // Filter form state
  const [userName, setUserName] = useState("")
  const [orderDateFrom, setOrderDateFrom] = useState("")
  const [orderDateTo, setOrderDateTo] = useState("")
  const [orderNumber, setOrderNumber] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  // Table state
  const [quickSearch, setQuickSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    )
  }

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === shoppingReports.length
        ? []
        : shoppingReports.map((report) => report.id)
    )
  }

  const allSelected =
    shoppingReports.length > 0 && selectedRows.length === shoppingReports.length

  const handleSearch = () => {
    // Filtering is applied live through the memo below; this handler exists
    // to commit the filter state for a future API request.
    console.log({
      userName,
      orderDateFrom,
      orderDateTo,
      orderNumber,
      selectedStatuses,
    })
  }

  const filteredReports = useMemo(() => {
    const searchValue = quickSearch.toLowerCase().trim()

    return shoppingReports.filter((report) => {
      if (!searchValue) return true

      return [
        report.userId,
        report.userName,
        report.orderNo,
        report.nivNo,
      ].some((value) => value.toLowerCase().includes(searchValue))
    })
  }, [quickSearch])

  const shownCount = Math.min(rowsPerPage, TOTAL_RECORDS)

  return (
    <div className="space-y-6 font-sans text-sm text-slate-700">
      {/* 1. BREADCRUMBS & PAGE HEADER */}
      <div className="space-y-1">
        <nav className="flex items-center space-x-1 text-xs text-slate-400">
          <span>Dashboard</span>
          <span>/</span>
          <span>Shop</span>
          <span>/</span>
          <span className="font-medium text-slate-600">Pending Dispatch</span>
        </nav>
        <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
          Shopping Reports
        </h1>
      </div>

      {/* 2. TOP FILTER CARD */}
      <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
        <h2 className="text-base font-bold text-slate-800">Filter</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Row 1 - User Name */}
          <div>
            <label className={labelClass} htmlFor="user-name">
              User Name
            </label>
            <input
              id="user-name"
              type="text"
              placeholder="Enter user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Row 1 - Select Order Date (two date inputs) */}
          <div className="lg:col-span-2">
            <label className={labelClass}>Select Order Date</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="dd/mm/yy"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={orderDateFrom}
                  onChange={(e) => setOrderDateFrom(e.target.value)}
                  className={`${inputClass} pr-9`}
                />
                <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              <span className="text-xs text-slate-400">to</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="dd/mm/yy"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={orderDateTo}
                  onChange={(e) => setOrderDateTo(e.target.value)}
                  className={`${inputClass} pr-9`}
                />
                <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Row 2 - Order Number */}
          <div>
            <label className={labelClass} htmlFor="order-number">
              Order Number
            </label>
            <input
              id="order-number"
              type="text"
              placeholder="Enter order number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Row 2 - Dispatch Status (checkbox group) */}
          <div className="lg:col-span-2">
            <label className={labelClass}>Dispatch Status</label>
            <div className="flex h-[42px] items-center gap-6 rounded-lg border border-slate-200 bg-white px-3.5">
              {DISPATCH_STATUS_OPTIONS.map((status) => (
                <label
                  key={status}
                  className="flex cursor-pointer items-center gap-2 text-xs text-slate-600"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => toggleStatus(status)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleSearch}
            className="cursor-pointer rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Search
          </button>
        </div>
      </section>

      {/* 3. DATA TABLE CARD */}
      <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">
            Shopping Reports
          </h2>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-56 rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-xs text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="button"
              aria-label="Download"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Print"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="p-3">
                  <input
                    type="checkbox"
                    aria-label="Select all rows"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th className="p-3">
                  <List className="h-4 w-4 text-slate-400" />
                </th>
                <th className="p-3 font-medium">User Id</th>
                <th className="p-3 font-medium">User Name</th>
                <th className="p-3 font-medium">Order No.</th>
                <th className="p-3 font-medium">NIV No.</th>
                <th className="p-3 font-medium">Total Amount</th>
                <th className="p-3 font-medium">Total Business</th>
                <th className="p-3 font-medium">Dispatch Date</th>
                <th className="p-3 font-medium">Dispatch by</th>
                <th className="p-3 font-medium">Store Point</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => {
                const isSelected = selectedRows.includes(report.id)
                return (
                  <tr
                    key={report.id}
                    className={`border-b border-slate-100 transition-colors last:border-b-0 ${
                      isSelected ? "bg-emerald-50/60" : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        aria-label={`Select order ${report.orderNo}`}
                        checked={isSelected}
                        onChange={() => toggleRow(report.id)}
                        className="h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium text-slate-700">
                      {report.userId}
                    </td>
                    <td className="p-3 text-slate-600">{report.userName}</td>
                    <td className="p-3 text-slate-600">{report.orderNo}</td>
                    <td className="p-3 text-slate-600">{report.nivNo}</td>
                    <td className="p-3 font-medium text-slate-700">
                      Rs. {report.totalAmount.toFixed(2)}
                    </td>
                    <td className="p-3 text-slate-600">
                      Rs. {report.totalBusiness.toFixed(2)}
                    </td>
                    <td className="p-3 text-slate-600">
                      {report.dispatchDate}
                    </td>
                    <td className="p-3 text-slate-600">{report.dispatchBy}</td>
                    <td className="p-3 text-slate-600">{report.storePoint}</td>
                  </tr>
                )
              })}
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

export default PendingDispatchPage
