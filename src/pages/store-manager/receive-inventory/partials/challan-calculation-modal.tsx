import { useState } from "react"
import { X } from "lucide-react"

export interface ChallanFormData {
  skuNo: string
  productName: string
  ba: string
  business: string
  batchNo: string
  mftDate: string
  expDate: string
  quantity: string
}

interface ChallanCalculationModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: ChallanFormData) => void
  initialData?: Partial<ChallanFormData>
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-[13px] font-medium text-slate-700"

const emptyForm: ChallanFormData = {
  skuNo: "",
  productName: "",
  ba: "",
  business: "",
  batchNo: "",
  mftDate: "",
  expDate: "",
  quantity: "",
}

const ChallanCalculationModal = ({
  open,
  onClose,
  onSave,
  initialData,
}: ChallanCalculationModalProps) => {
  const [form, setForm] = useState<ChallanFormData>({
    ...emptyForm,
    ...initialData,
  })

  if (!open) return null

  const handleChange = (key: keyof ChallanFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onSave(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-bold text-[#2F234F]">
          Challan Calculation
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              SKU No. <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.skuNo}
              onChange={(e) => handleChange("skuNo", e.target.value)}
              placeholder="SKU No."
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Product Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.productName}
              onChange={(e) => handleChange("productName", e.target.value)}
              placeholder="Product NAme"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>BA</label>
            <input
              type="text"
              value={form.ba}
              onChange={(e) => handleChange("ba", e.target.value)}
              placeholder="BA"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Business</label>
            <input
              type="text"
              value={form.business}
              onChange={(e) => handleChange("business", e.target.value)}
              placeholder="Business"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Batch No. <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.batchNo}
              onChange={(e) => handleChange("batchNo", e.target.value)}
              placeholder="Batch No."
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Mft. Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={form.mftDate}
              onChange={(e) => handleChange("mftDate", e.target.value)}
              placeholder="dd/mm/yyyy"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Exp. Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={form.expDate}
              onChange={(e) => handleChange("expDate", e.target.value)}
              placeholder="dd/mm/yyyy"
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
              value={form.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              placeholder="Quantity"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="cursor-pointer rounded-lg bg-emerald-600 px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChallanCalculationModal
