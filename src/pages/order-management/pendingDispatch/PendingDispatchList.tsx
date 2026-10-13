import React, { useMemo, useState } from "react"
import {
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Package,
  Printer,
  Search,
  Truck,
} from "lucide-react"

/**
 * A single pending-dispatch order row.
 */
interface DispatchOrder {
  id: string
  orderNo: string
  userId: string
  userName: string
  orderDate: string
  dispatchStore: string
  totalItems: number
  totalAmount: number
  status: string
}

/**
 * Shape of the top-level metric summary cards.
 */
interface StatCardData {
  label: string
  value: number
  icon: React.ReactNode
  accent: string
}

const STORE_OPTIONS = ["All Stores", "Central Office", "Sunwal"]

const TOTAL_PENDING_RECORDS = 12

const dispatchOrders: DispatchOrder[] = [
  {
    id: "1",
    orderNo: "#20421",
    userId: "09841261285",
    userName: "Anita Gautam",
    orderDate: "2024-06-10",
    dispatchStore: "Central Office",
    totalItems: 8,
    totalAmount: 12450.0,
    status: "Pending Dispatch",
  },
  {
    id: "2",
    orderNo: "#20422",
    userId: "9840993846",
    userName: "Nirosh Adhikari",
    orderDate: "2024-06-09",
    dispatchStore: "Sunwal",
    totalItems: 12,
    totalAmount: 23890.5,
    status: "Pending Dispatch",
  },
  {
    id: "3",
    orderNo: "#20423",
    userId: "9812345678",
    userName: "Sita Sharma",
    orderDate: "2024-06-09",
    dispatchStore: "Central Office",
    totalItems: 5,
    totalAmount: 6120.0,
    status: "Pending Dispatch",
  },
  {
    id: "4",
    orderNo: "#20424",
    userId: "9807654321",
    userName: "Ram Thapa",
    orderDate: "2024-06-08",
    dispatchStore: "Sunwal",
    totalItems: 20,
    totalAmount: 45100.75,
    status: "Pending Dispatch",
  },
]

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600"

/**
 * Reusable stat summary card.
 */
const StatCard = ({ label, value, icon, accent }: StatCardData) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${accent}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  )
}

const PendingDispatchList = () => {
  // Filter form state
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [store, setStore] = useState("")
  const [filterSearch, setFilterSearch] = useState("")

  // Table quick search state
  const [quickSearch, setQuickSearch] = useState("")

  // Row selection state (keyed by order id)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const stats: StatCardData[] = [
    {
      label: "Total Pending Dispatch",
      value: 12,
      icon: <Package className="h-6 w-6 text-emerald-600" />,
      accent: "bg-emerald-50",
    },
    {
      label: "Ready to Ship Today",
      value: 8,
      icon: <Truck className="h-6 w-6 text-blue-600" />,
      accent: "bg-blue-50",
    },
    {
      label: "Urgent Priority",
      value: 4,
      icon: <Clock className="h-6 w-6 text-amber-500" />,
      accent: "bg-amber-50",
    },
  ]

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === dispatchOrders.length
        ? []
        : dispatchOrders.map((order) => order.id)
    )
  }

  const allSelected =
    dispatchOrders.length > 0 && selectedRows.length === dispatchOrders.length

  const handleReset = () => {
    setDateFrom("")
    setDateTo("")
    setStore("")
    setFilterSearch("")
  }

  const handleSearch = () => {
    // Filtering is applied live through the memo below; this handler exists
    // to commit the filter state for a future API request.
    console.log({ dateFrom, dateTo, store, filterSearch })
  }

  const filteredOrders = useMemo(() => {
    const searchValue = `${quickSearch} ${filterSearch}`.toLowerCase().trim()

    return dispatchOrders.filter((order) => {
      const matchesStore =
        !store || store === "All Stores" || order.dispatchStore === store

      const matchesSearch =
        !searchValue ||
        [order.orderNo, order.userId, order.userName].some((value) =>
          value.toLowerCase().includes(searchValue)
        )

      return matchesStore && matchesSearch
    })
  }, [store, quickSearch, filterSearch])

  const shownCount = Math.min(5, TOTAL_PENDING_RECORDS)

  return (
    <div className="space-y-6 font-sans text-sm text-slate-700">
      {/* 1. BREADCRUMBS & PAGE HEADER */}
      <div className="space-y-1">
        <nav className="flex items-center space-x-1 text-xs text-slate-400">
          <span>Home</span>
          <span>/</span>
          <span>Purchase Manager</span>
          <span>/</span>
          <span className="font-medium text-slate-600">Pending Dispatch</span>
        </nav>
        <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
          Pending Dispatch
        </h1>
        <p className="text-sm text-slate-500">
          Manage orders approved and awaiting shipment dispatch
        </p>
      </div>

      {/* 2. TOP METRIC CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            accent={stat.accent}
          />
        ))}
      </div>

      {/* 3. TOP FILTER CARD */}
      <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
        <h2 className="text-base font-bold text-slate-800">
          Dispatch Queue Filters
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelClass} htmlFor="date-from">
              Date From
            </label>
            <input
              id="date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="date-to">
              Date To
            </label>
            <input
              id="date-to"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="store">
              Select Store
            </label>
            <div className="relative">
              <select
                id="store"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                className={`${inputClass} appearance-none pr-8`}
              >
                {STORE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="filter-search">
              Search
            </label>
            <input
              id="filter-search"
              type="text"
              placeholder="Order No, User ID, or User Name"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleSearch}
            className="cursor-pointer rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer rounded-lg border border-slate-200 px-6 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </section>

      {/* 4. PENDING DISPATCH DATA TABLE */}
      <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs">
        {/* Table Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">
            Pending Shipments
          </h2>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-56 rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="button"
              aria-label="Export"
              className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <button
              type="button"
              aria-label="Print"
              className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" />
              Print
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
                <th className="p-3 font-medium">#</th>
                <th className="p-3 font-medium">Order No.</th>
                <th className="p-3 font-medium">User ID</th>
                <th className="p-3 font-medium">User Name</th>
                <th className="p-3 font-medium">Order Date</th>
                <th className="p-3 font-medium">Dispatch Store</th>
                <th className="p-3 font-medium">Total Items</th>
                <th className="p-3 font-medium">Total Amount</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => {
                const isSelected = selectedRows.includes(order.id)
                return (
                  <tr
                    key={order.id}
                    className={`border-b border-slate-100 transition-colors last:border-b-0 ${
                      isSelected ? "bg-emerald-50/60" : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        aria-label={`Select order ${order.orderNo}`}
                        checked={isSelected}
                        onChange={() => toggleRow(order.id)}
                        className="h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="p-3 text-slate-500">{index + 1}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 font-semibold text-yellow-800">
                        {order.orderNo}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{order.userId}</td>
                    <td className="p-3 font-medium text-slate-700">
                      {order.userName}
                    </td>
                    <td className="p-3 text-slate-600">{order.orderDate}</td>
                    <td className="p-3 text-slate-600">
                      {order.dispatchStore}
                    </td>
                    <td className="p-3 text-slate-600">{order.totalItems}</td>
                    <td className="p-3 font-medium text-slate-700">
                      NPR {order.totalAmount.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="cursor-pointer rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-emerald-700"
                        >
                          Dispatch
                        </button>
                        <button
                          type="button"
                          aria-label={`View details for ${order.orderNo}`}
                          className="cursor-pointer rounded-lg border border-slate-200 p-1.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* 5. BATCH ACTIONS & PAGINATION FOOTER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            disabled={selectedRows.length === 0}
            className={`rounded-lg px-4 py-2.5 text-xs font-medium text-white transition-colors ${
              selectedRows.length === 0
                ? "cursor-not-allowed bg-emerald-600/40"
                : "cursor-pointer bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            Mark Selected as Dispatched
          </button>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Rows per page: 5</span>
            <span>
              1-{shownCount} of {TOTAL_PENDING_RECORDS}
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
        </div>
      </section>
    </div>
  )
}

export default PendingDispatchList
