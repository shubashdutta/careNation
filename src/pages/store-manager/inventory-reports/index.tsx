import { useMemo, useState } from "react"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  ListFilter,
  Printer,
  Search,
} from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"

const breadcrumbTrail = ["Home", "Store Manager", "Receive Inventory"]

interface InventoryRow {
  id: number
  sku: string
  productName: string
  storeName: string
  inQty: string
  outQty: string
  currentQty: string
}

const mockRows: InventoryRow[] = [
  {
    id: 1,
    sku: "1334",
    productName: "Fish food",
    storeName: "Bajra",
    inQty: "1255",
    outQty: "5525",
    currentQty: "44845",
  },
  {
    id: 2,
    sku: "1334",
    productName: "Product name",
    storeName: "Bajra",
    inQty: "5525",
    outQty: "5525",
    currentQty: "65",
  },
  {
    id: 3,
    sku: "1334",
    productName: "1",
    storeName: "jan-28-2025",
    inQty: "Bank Transfer",
    outQty: "Global Ime Bank",
    currentQty: "65",
  },
  {
    id: 4,
    sku: "1334",
    productName: "1",
    storeName: "jan-28-2025",
    inQty: "Bank Transfer",
    outQty: "Global Ime Bank",
    currentQty: "65",
  },
]

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-[13px] font-medium text-slate-700"

const InventoryReports = () => {
  const [businessCenter, setBusinessCenter] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [productName, setProductName] = useState("")
  const [tableSearch, setTableSearch] = useState("")
  const [selected, setSelected] = useState<number[]>([])
  const [rowsPerPage, setRowsPerPage] = useState("5")
  const [page] = useState(1)

  const filtered = useMemo(() => {
    const q = tableSearch.trim().toLowerCase()
    if (!q) return mockRows
    return mockRows.filter((r) =>
      [r.sku, r.productName, r.storeName, r.inQty, r.outQty, r.currentQty]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
  }, [tableSearch])

  const allSelected =
    filtered.length > 0 && filtered.every((r) => selected.includes(r.id))

  const toggleAll = () => {
    if (allSelected) setSelected([])
    else setSelected(filtered.map((r) => r.id))
  }

  const toggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleSearch = () => {
    console.log({ businessCenter, fromDate, toDate, productName })
  }

  return (
    <div className="space-y-5">
      <Breadcrumb trail={breadcrumbTrail} />
      <div className="px-1">
        <h1 className="text-xl font-bold text-[#2F234F]">
          Inventory Report
        </h1>
        <p className="mt-1 text-sm text-slate-500">Inventory Report List</p>
      </div>
      {/* 2. FILTER SECTION CARD */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h2 className="mb-4 text-[15px] font-semibold text-slate-800">
          Filter
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelClass}>Business Center</label>
            <input
              type="text"
              value={businessCenter}
              onChange={(e) => setBusinessCenter(e.target.value)}
              placeholder="Business Center"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Select Date</label>
            <div className="relative">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className={`${inputClass} pr-10`}
              />
              <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Select Date</label>
            <div className="relative">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className={`${inputClass} pr-10`}
              />
              <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name"
              className={inputClass}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleSearch}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </section>
      {/* 3. INVENTORY DETAILS TABLE CARD */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[15px] font-semibold text-slate-800">
            Inventory Details
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Search"
                className="w-56 rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <button
              type="button"
              aria-label="Download"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Print"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[850px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 cursor-pointer rounded accent-emerald-600"
                  />
                </th>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">SKU No.</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Store Name</th>
                <th className="px-4 py-3">In Quantity</th>
                <th className="px-4 py-3">Out Quantity</th>
                <th className="px-4 py-3">Current Quantity</th>
                <th className="px-4 py-3">
                  <ListFilter className="h-4 w-4 text-slate-400" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row, idx) => (
                <tr key={row.id} className="text-slate-700 hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={() => toggleOne(row.id)}
                      className="h-4 w-4 cursor-pointer rounded accent-emerald-600"
                    />
                  </td>
                  <td className="px-4 py-3">{idx + 1}.</td>
                  <td className="px-4 py-3 font-medium">{row.sku}</td>
                  <td className="px-4 py-3">{row.productName}</td>
                  <td className="px-4 py-3">{row.storeName}</td>
                  <td className="px-4 py-3">{row.inQty}</td>
                  <td className="px-4 py-3">{row.outQty}</td>
                  <td className="px-4 py-3">{row.currentQty}</td>
                  <td className="px-4 py-3" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 4. PAGINATION FOOTER */}
        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Rows per page:</span>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
                className="cursor-pointer appearance-none rounded-md border border-slate-200 bg-white py-1.5 pr-8 pl-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">1-5 of 20</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous page"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next page"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
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

export default InventoryReports

