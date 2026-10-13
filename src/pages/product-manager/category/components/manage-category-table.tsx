import { useMemo, useState } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Pencil,
  Plus,
  Printer,
  Search,
} from "lucide-react"

export interface CategoryRowData {
  id: number
  code: string
  name: string
  market: string
  business: string
  subcat: number
  active: boolean
}

interface ManageCategoryTableProps {
  categories: CategoryRowData[]
  onAdd: () => void
}

const ManageCategoryTable = ({
  categories,
  onAdd,
}: ManageCategoryTableProps) => {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<number[]>([])
  const [rowsPerPage, setRowsPerPage] = useState("5")

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return categories
    return categories.filter((c) =>
      [c.code, c.name, c.market, c.business].join(" ").toLowerCase().includes(q)
    )
  }, [categories, search])

  const allSelected =
    filtered.length > 0 && filtered.every((c) => selected.includes(c.id))

  const toggleAll = () => {
    if (allSelected) setSelected([])
    else setSelected(filtered.map((c) => c.id))
  }

  const toggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-3 pl-9 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Filter"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
          >
            <Filter className="h-4 w-4" />
          </button>
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
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-2 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
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
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Category Name</th>
              <th className="px-4 py-3">Market</th>
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">Subcat</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Action</th>
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
                <td className="px-4 py-3 font-medium">{row.code}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.market}</td>
                <td className="px-4 py-3">{row.business}</td>
                <td className="px-4 py-3">{row.subcat}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.active
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {row.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    aria-label={`Edit ${row.name}`}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  )
}

export default ManageCategoryTable
