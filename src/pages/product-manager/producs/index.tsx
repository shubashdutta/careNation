import { useMemo, useState } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  Pencil,
  Plus,
  PlusCircle,
  Printer,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"
import ProductWizard from "./partials/product-wizard"

const breadcrumbTrail = ["Home", "Product Manager", "Product List"]

interface ProductRow {
  id: number
  refNo: string
  name: string
  brand: string
  date: string
  image: string
  quantity: string
  service: string
  sku: string
}

const mockProducts: ProductRow[] = [
  {
    id: 1,
    refNo: "01",
    name: "Himalaya Herbal",
    brand: "Himalaya",
    date: "Sun, Nov 14 2021",
    image: "https://via.placeholder.com/48",
    quantity: "12",
    service: "csd99-dj99f-kbsj990-jdkllos",
    sku: "SUK-C023023",
  },
  {
    id: 2,
    refNo: "02",
    name: "Himalaya Herbal",
    brand: "Himalaya",
    date: "Sun, Nov 14 2021",
    image: "https://via.placeholder.com/48",
    quantity: "0",
    service: "illl-393-dsjfski-9djdk",
    sku: "SKU-C798679",
  },
  {
    id: 3,
    refNo: "3",
    name: "Himalaya Herbal",
    brand: "Himalaya",
    date: "Sun, Nov 14 2021",
    image: "https://via.placeholder.com/48",
    quantity: "155",
    service: "$275",
    sku: "SKU-65876",
  },
  {
    id: 4,
    refNo: "4",
    name: "Himalaya Herbal",
    brand: "Himalaya",
    date: "Sun, Nov 14 2021",
    image: "https://via.placeholder.com/48",
    quantity: "234",
    service: "$275",
    sku: "SKU-576575",
  },
]

const ProducsPage = () => {
  const [view, setView] = useState<"list" | "add">("list")
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<number[]>([])
  const [rowsPerPage, setRowsPerPage] = useState("5")

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return mockProducts
    return mockProducts.filter((p) =>
      [p.refNo, p.name, p.brand, p.service, p.sku]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
  }, [search])

  const allSelected =
    filtered.length > 0 && filtered.every((p) => selected.includes(p.id))

  const toggleAll = () => {
    if (allSelected) setSelected([])
    else setSelected(filtered.map((p) => p.id))
  }

  const toggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-5">
      {view === "add" ? (
        <ProductWizard
          onBack={() => setView("list")}
          onSubmit={(data) => {
            console.log("product", data)
            setView("list")
          }}
        />
      ) : (
        <>
      <Breadcrumb trail={breadcrumbTrail} />
      <div className="px-1">
        <h1 className="text-xl font-bold text-[#2F234F]">Product List</h1>
        <p className="mt-1 text-sm text-slate-500">List of all the product</p>
      </div>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-[15px] font-semibold text-slate-800">
            Category List
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-56 rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
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
              onClick={() => setView("add")}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-emerald-500 px-4 py-2 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label="Table options"
          className="mb-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
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
                <th className="px-4 py-3">Ref_No.</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">SKU No.</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={() => toggleOne(row.id)}
                      className="h-4 w-4 cursor-pointer rounded accent-emerald-600"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {row.refNo}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.image}
                        alt={row.name}
                        className="h-12 w-12 shrink-0 rounded-lg bg-slate-100 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-800">
                          {row.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Brand: {row.brand}
                        </p>
                        <p className="text-xs font-medium text-orange-500">
                          {row.date}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{row.quantity}</td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-slate-700">
                    {row.service}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {row.sku}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label="Edit"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="View"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-50"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Add"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-50"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-rose-600 transition-colors hover:bg-rose-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
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
      </section>
        </>
      )}
    </div>
  )
}

export default ProducsPage

