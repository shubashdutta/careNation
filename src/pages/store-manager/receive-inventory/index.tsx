import { useState } from "react"
import { Calculator, ChevronDown, ListFilter, Search } from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"
import ChallanCalculationModal, {
  type ChallanFormData,
} from "./partials/challan-calculation-modal"

const breadcrumbTrail = ["Home", "Store Manager", "Receive Inventory"]

const WAREHOUSE_OPTIONS = [
  "Kathmandu Central Warehouse",
  "Pokhara Regional Warehouse",
  "Biratnagar Hub",
  "Butwal Depot",
]

const PROVINCE_OPTIONS = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
]

const FRANCHISE_OPTIONS = [
  "Franchise - Kathmandu",
  "Franchise - Lalitpur",
  "Franchise - Pokhara",
  "Franchise - Chitwan",
]

interface ProductRow {
  id: number
  sku: string
  name: string
  supplierCost: number
  warehouseCost: number
  ba: number
  business: number
  batchNo: string
  mftDate: string
  expDate: string
}

const initialProducts: ProductRow[] = [
  {
    id: 1,
    sku: "B93H7654JHH",
    name: "Herbal Herb cream",
    supplierCost: 25555.5,
    warehouseCost: 855882.55,
    ba: 258,
    business: 30,
    batchNo: "TU56",
    mftDate: "jun/10/2024",
    expDate: "jun/10/2024",
  },
]

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-[13px] font-medium text-slate-700"

const ReceiveInventory = () => {
  const [receiveIn, setReceiveIn] = useState("")
  const [transferVia, setTransferVia] = useState("")
  const [transferTo, setTransferTo] = useState("")
  const [products] = useState<ProductRow[]>(initialProducts)
  const [handlingCharge, setHandlingCharge] = useState("")
  const [remark, setRemark] = useState("")
  const [terms, setTerms] = useState("")

  const [totalSupplierCost] = useState(0.0)
  const [totalDp] = useState(0.0)
  const [totalWarehouseCost] = useState(0.0)
  const [grandTotal] = useState(0.0)
  const [isChallanOpen, setIsChallanOpen] = useState(false)

  const handleSearch = () => {
    console.log({ receiveIn, transferVia, transferTo })
  }

  const handleCalculate = () => {
    setIsChallanOpen(true)
  }

  const handleChallanSave = (data: ChallanFormData) => {
    console.log("challan", { products, handlingCharge, ...data })
  }

  const handleSave = () => {
    console.log({
      receiveIn,
      transferVia,
      transferTo,
      products,
      handlingCharge,
      remark,
      terms,
    })
  }

  const handleCancel = () => {
    setReceiveIn("")
    setTransferVia("")
    setTransferTo("")
    setHandlingCharge("")
    setRemark("")
    setTerms("")
  }

  return (
    <div className="space-y-5">
      <Breadcrumb trail={breadcrumbTrail} />
      <div className="px-1">
        <h1 className="text-xl font-bold text-[#2F234F]">Receive Inventory</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your product Inventory
        </p>
      </div>
      {/* 2. MANAGE INVENTORY SECTION CARD */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h2 className="mb-4 text-[15px] font-semibold text-slate-800">
          Manage Inventory
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm">
            <span className="font-medium text-slate-700">Receive Type :</span>
            <span className="ml-2 text-slate-600">New Supplier Order (SO)</span>
          </div>

          <div>
            <label className={labelClass}>
              Receive in (Warehouse) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={receiveIn}
                onChange={(e) => setReceiveIn(e.target.value)}
                className={`${selectClass} ${receiveIn ? "" : "text-slate-400"}`}
              >
                <option value="" disabled>
                  Select Warehouse
                </option>
                {WAREHOUSE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Transfer Via (Province) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={transferVia}
                onChange={(e) => setTransferVia(e.target.value)}
                className={`${selectClass} ${transferVia ? "" : "text-slate-400"}`}
              >
                <option value="" disabled>
                  Province
                </option>
                {PROVINCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Transfer To (SP) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                className={`${selectClass} ${transferTo ? "" : "text-slate-400"}`}
              >
                <option value="" disabled>
                  Select Franchises
                </option>
                {FRANCHISE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500 italic">
            Enter existing product name and generate the New Receive Challan,
            Receive Note, TO &amp; TO Receive Note.
          </p>
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
      {/* 3. PRODUCTS TABLE & CALCULATION SECTION CARD */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-slate-800">Products</h2>
          <button
            type="button"
            aria-label="Filter products"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
          >
            <ListFilter className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[950px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">SKU No.</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Supplier Cost</th>
                <th className="px-4 py-3">Warehouse Cost</th>
                <th className="px-4 py-3">BA</th>
                <th className="px-4 py-3">Business</th>
                <th className="px-4 py-3">Batch No.</th>
                <th className="px-4 py-3">Mft. Date</th>
                <th className="px-4 py-3">Exp. Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p, idx) => (
                <tr key={p.id} className="text-slate-700 hover:bg-slate-50/60">
                  <td className="px-4 py-3">{idx + 1}.</td>
                  <td className="px-4 py-3 font-medium">{p.sku}</td>
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">{p.supplierCost}</td>
                  <td className="px-4 py-3">{p.warehouseCost}</td>
                  <td className="px-4 py-3">{p.ba}</td>
                  <td className="px-4 py-3">{p.business}</td>
                  <td className="px-4 py-3">{p.batchNo}</td>
                  <td className="px-4 py-3">{p.mftDate}</td>
                  <td className="px-4 py-3">{p.expDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-rose-600">
            Enter existing product name and generate the New Receive Challan,
            Receive Note, TO &amp; TO Receive Note.
          </p>
          <button
            type="button"
            onClick={handleCalculate}
            className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg bg-emerald-600 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 sm:self-auto"
          >
            <Calculator className="h-4 w-4" />
            Calculate
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-sm space-y-2.5 rounded-lg bg-slate-50/70 p-4 text-sm">
            <h3 className="mb-1 text-sm font-semibold text-slate-800">
              Receive Challan Details:
            </h3>
            <div className="flex items-center justify-between text-slate-600">
              <span>Total Supplier Cost (Rs.):</span>
              <span className="font-medium text-slate-800">
                {totalSupplierCost.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Total DP (Rs.):</span>
              <span className="font-medium text-slate-800">
                {totalDp.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Total Warehouse Cost (Rs.):</span>
              <span className="font-medium text-slate-800">
                {totalWarehouseCost.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 text-slate-600">
              <span>Handling Charge (Rs.):</span>
              <input
                type="number"
                value={handlingCharge}
                onChange={(e) => setHandlingCharge(e.target.value)}
                placeholder="0.00"
                className="w-28 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-right text-sm text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-2.5 text-slate-800">
              <span className="font-bold">Grand Total(RS.):</span>
              <span className="font-bold">{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* 5. TEXTAREAS & FOOTER ACTIONS */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Remark <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              rows={4}
              placeholder="Write remark..."
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <div>
            <label className={labelClass}>
              Terms &amp; Condition <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              rows={4}
              placeholder="Write terms & conditions..."
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="cursor-pointer rounded-lg bg-emerald-600 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer rounded-lg border border-slate-200 px-8 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            Cancel
          </button>
        </div>
      </section>

      <ChallanCalculationModal
        open={isChallanOpen}
        onClose={() => setIsChallanOpen(false)}
        onSave={handleChallanSave}
      />
    </div>
  )
}

export default ReceiveInventory
