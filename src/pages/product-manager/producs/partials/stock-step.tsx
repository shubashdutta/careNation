import { useState } from "react"
import { ChevronDown, ImagePlus, Plus, Trash2 } from "lucide-react"

const ATTRIBUTE_OPTIONS = ["Color: Red", "Size: M", "Weight: 500g", "Pack: 2pcs"]
const WAREHOUSE_OPTIONS = ["WH-001 Downtown", "WH-002 Midtown", "WH-004 Queens"]
const DISCOUNT_TYPE_OPTIONS = ["Percent (%)", "Flat (Rs.)"]
const VAT_OPTIONS = ["0%", "5%", "13%"]

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-[13px] font-medium text-slate-700"

export interface StockRow {
  id: number
  attribute: string
  vendorPrice: string
  quantity: string
  regularPrice: string
  warehouse: string
  discountIncluded: boolean
  discountType: string
  discountValue: string
  vatIncluded: boolean
  vatPercent: string
  image: string | null
}

export const emptyStockRow = (id: number): StockRow => ({
  id,
  attribute: "",
  vendorPrice: "",
  quantity: "",
  regularPrice: "",
  warehouse: "",
  discountIncluded: false,
  discountType: "",
  discountValue: "",
  vatIncluded: false,
  vatPercent: "13%",
  image: null,
})

export const calcDiscountAmount = (row: StockRow): string => {
  const base = parseFloat(row.regularPrice || row.vendorPrice || "0")
  const val = parseFloat(row.discountValue || "0")
  if (!base || !val) return ""
  if (row.discountType === "Flat (Rs.)") return val.toFixed(2)
  return ((base * val) / 100).toFixed(2)
}

export const calcAfterVat = (row: StockRow): string => {
  const base = parseFloat(row.regularPrice || row.vendorPrice || "0")
  if (!base) return ""
  const discount = parseFloat(calcDiscountAmount(row) || "0")
  const net = base - (row.discountIncluded ? discount : 0)
  const vatPct = parseFloat((row.vatPercent || "0").replace("%", ""))
  const vatAmt = row.vatIncluded ? (net * vatPct) / 100 : 0
  return (net + vatAmt).toFixed(2)
}

const StockStep = ({
  rows,
  onChange,
}: {
  rows: StockRow[]
  onChange: (rows: StockRow[]) => void
}) => {
  const [localRows, setLocalRows] = useState<StockRow[]>(rows)

  const sync = (next: StockRow[]) => {
    setLocalRows(next)
    onChange(next)
  }

  const update = (id: number, key: keyof StockRow, value: string | boolean) => {
    sync(localRows.map((r) => (r.id === id ? { ...r, [key]: value } : r)))
  }

  const addRow = () => sync([...localRows, emptyStockRow(Date.now())])

  const removeRow = (id: number) => {
    if (localRows.length <= 1) return
    sync(localRows.filter((r) => r.id !== id))
  }

  const handleImage = (id: number, file: File | undefined) => {
    if (!file) return
    update(id, "image", URL.createObjectURL(file))
  }
  return (
    <div>
      <h2 className="mb-4 text-[15px] font-semibold text-slate-800">
        Stock Details
      </h2>
      <div className="space-y-5">
        {localRows.map((row, idx) => (
          <div
            key={row.id}
            className="rounded-xl border border-slate-200 bg-slate-50/40 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500 uppercase">
                Stock #{idx + 1}
              </p>
              {localRows.length > 1 && (
                <button
                  type="button"
                  aria-label={`Remove Stock #${idx + 1}`}
                  onClick={() => removeRow(row.id)}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <SelectBox
                label="Attributes"
                required
                value={row.attribute}
                onChange={(v) => update(row.id, "attribute", v)}
                options={ATTRIBUTE_OPTIONS}
                placeholder="-Select Attributes-"
              />
              <div>
                <label className={labelClass}>
                  Vendor Price <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  value={row.vendorPrice}
                  onChange={(e) => update(row.id, "vendorPrice", e.target.value)}
                  placeholder="-Price-"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Quantity <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  value={row.quantity}
                  onChange={(e) => update(row.id, "quantity", e.target.value)}
                  placeholder="Quantity"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Regular Price <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  value={row.regularPrice}
                  onChange={(e) => update(row.id, "regularPrice", e.target.value)}
                  placeholder="-Regular Price-"
                  className={inputClass}
                />
              </div>
              <SelectBox
                label="Warehouse"
                required
                value={row.warehouse}
                onChange={(v) => update(row.id, "warehouse", v)}
                options={WAREHOUSE_OPTIONS}
                placeholder="-Warehouse-"
              />
            </div>
            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Discount Inclusion
                </span>
                <ToggleSwitch
                  checked={row.discountIncluded}
                  onChange={(v) => update(row.id, "discountIncluded", v)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <SelectBox
                  label="Discount Type"
                  required
                  value={row.discountType}
                  onChange={(v) => update(row.id, "discountType", v)}
                  options={DISCOUNT_TYPE_OPTIONS}
                  placeholder="-Select Discount Type-"
                />
                <div>
                  <label className={labelClass}>
                    Discount Value <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={row.discountValue}
                    onChange={(e) => update(row.id, "discountValue", e.target.value)}
                    placeholder="Add Discount Value"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Discount Amount <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={calcDiscountAmount(row)}
                    placeholder="Auto Calculation"
                    className={`${inputClass} bg-slate-50`}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Vat Inclusion
                </span>
                <ToggleSwitch
                  checked={row.vatIncluded}
                  onChange={(v) => update(row.id, "vatIncluded", v)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <SelectBox
                  label="Vat %"
                  required
                  value={row.vatPercent}
                  onChange={(v) => update(row.id, "vatPercent", v)}
                  options={VAT_OPTIONS}
                  placeholder="13%"
                />
                <div>
                  <label className={labelClass}>
                    After Vat Price <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={calcAfterVat(row)}
                    placeholder="Auto Calculation"
                    className={`${inputClass} bg-slate-50`}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className={labelClass}>
                Image <span className="text-rose-500">*</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-500 transition-colors hover:border-emerald-300">
                <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                  Choose File
                </span>
                <span className="truncate">
                  {row.image ? "File chosen" : "No File Chosen"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImage(row.id, e.target.files?.[0])}
                />
              </label>
              <div className="mt-2 flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                {row.image ? (
                  <img
                    src={row.image}
                    alt="Stock preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImagePlus className="h-6 w-6 text-slate-300" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-emerald-500 px-4 py-2 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
      >
        <Plus className="h-4 w-4" />
        Add-Stock Value
      </button>
    </div>
  )
}

const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
      checked ? "bg-emerald-600" : "bg-slate-300"
    }`}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
        checked ? "left-[22px]" : "left-0.5"
      }`}
    />
  </button>
)

const SelectBox = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
  required?: boolean
}) => (
  <div>
    <label className={labelClass}>
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} cursor-pointer appearance-none pr-10 ${value ? "" : "text-slate-400"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  </div>
)

export default StockStep