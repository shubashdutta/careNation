import { useState } from "react"
import { Calendar, Search, RotateCcw } from "lucide-react"

interface OrderFiltersProps {
  onSearch: (filters: {
    dateFrom: string
    dateTo: string
    userName: string
    orderNumber: string
    orderStatus: string
  }) => void
}

const STATUS_OPTIONS = [
  "Ordering Status",
  "PENDING",
  "CONFIRMED",
  "Sent Warehouse",
]

const OrderFilters = ({ onSearch }: OrderFiltersProps) => {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [userName, setUserName] = useState("")
  const [orderNumber, setOrderNumber] = useState("")
  const [orderStatus, setOrderStatus] = useState("Ordering Status")

  const handleReset = () => {
    setDateFrom("")
    setDateTo("")
    setUserName("")
    setOrderNumber("")
    setOrderStatus("Ordering Status")
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"

  const labelClass = "mb-1.5 block text-xs font-medium text-slate-500"

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-slate-800">Orders</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Order Date From */}
        <div>
          <label className={labelClass}>Select Order Date From</label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>

        {/* Order Date To */}
        <div>
          <label className={labelClass}>Order Date To</label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>

        {/* User Name */}
        <div>
          <label className={labelClass}>User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
            className={inputClass}
          />
        </div>

        {/* Order Number */}
        <div>
          <label className={labelClass}>Order Number</label>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Order Number"
            className={inputClass}
          />
        </div>

        {/* Order Status */}
        <div>
          <label className={labelClass}>Order Status</label>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className={inputClass}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset All
        </button>
        <button
          type="button"
          onClick={() =>
            onSearch({ dateFrom, dateTo, userName, orderNumber, orderStatus })
          }
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
        >
          <Search className="h-3.5 w-3.5" />
          Search
        </button>
      </div>
    </div>
  )
}

export default OrderFilters
