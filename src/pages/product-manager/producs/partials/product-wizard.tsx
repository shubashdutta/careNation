import { useState } from "react"
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ImagePlus,
  Plus,
  Trash2,
} from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"
import StockStep, { emptyStockRow, type StockRow } from "./stock-step"

const breadcrumbTrail = ["Home", "Product Manager", "Product List", "Add Product"]

const STEPS = [
  { id: 1, title: "Product", subtitle: "Basic Info" },
  { id: 2, title: "Image", subtitle: "Primary Upload" },
  { id: 3, title: "Stock", subtitle: "Inventory & Warehouse" },
  { id: 4, title: "Shipping", subtitle: "Delivery Details" },
  { id: 5, title: "How to use", subtitle: "Instructions" },
]

const TYPE_OPTIONS = ["Physical", "Digital", "Service", "Bundle"]
const CATEGORY_OPTIONS = ["Electronics", "Fashion", "Grocery", "Beauty"]
const SUB_CATEGORY_OPTIONS = ["Sub A", "Sub B", "Sub C"]
const SHIPPING_CLASS_OPTIONS = ["Standard", "Express", "Fragile", "Bulk"]

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-[13px] font-medium text-slate-700"

interface ProductWizardProps {
  onBack: () => void
  onSubmit: (data: Record<string, string>) => void
}

const ProductWizard = ({ onBack, onSubmit }: ProductWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState<Record<string, string>>({
    type: "",
    category: "",
    subCategory: "",
    productName: "",
    skuNo: "",
    shortDesc: "",
    fullDesc: "",
    deliveryWeight: "",
    length: "",
    width: "",
    height: "",
    shippingClass: "",
    deliveryCharges: "",
    howToUse: "",
  })
  const [primaryImage, setPrimaryImage] = useState<string | null>(null)
  const [gallery, setGallery] = useState<{ id: number; url: string | null }[]>([
    { id: Date.now(), url: null },
  ])
  const [stockRows, setStockRows] = useState<StockRow[]>([
    emptyStockRow(Date.now()),
  ])
  const [error, setError] = useState("")

  const set = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError("")
  }

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!form.type || !form.category || !form.productName || !form.skuNo) {
        setError("Please fill Type, Category, Product Name and SKU No.")
        return false
      }
    }
    if (step === 3) {
      const first = stockRows[0]
      if (
        !first ||
        !first.attribute ||
        !first.vendorPrice ||
        !first.quantity ||
        !first.regularPrice ||
        !first.warehouse
      ) {
        setError("Please fill Attributes, Vendor Price, Quantity, Regular Price and Warehouse.")
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) return
    setCurrentStep((s) => Math.min(s + 1, 5))
  }

  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const handleSubmit = () => {
    if (!form.howToUse.trim()) {
      setError("Please enter How to Use instructions.")
      return
    }
    onSubmit({ ...form, stockRows: JSON.stringify(stockRows) })
  }

  const handleFile = (file: File | undefined, cb: (url: string) => void) => {
    if (!file) return
    cb(URL.createObjectURL(file))
  }

  return (
    <div className="space-y-5">
      <Breadcrumb trail={breadcrumbTrail} />
      <div className="flex items-center gap-4 px-1">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to product list"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-xl leading-tight font-bold text-[#2F234F]">
            Add Product
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Create a new product in 5 steps
          </p>
        </div>
      </div>
      {/* 1. TOP STEPPER PROGRESS BAR */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex items-center">
          {STEPS.map((step, idx) => {
            const isCompleted = currentStep > step.id
            const isActive = currentStep === step.id
            return (
              <div key={step.id} className="flex flex-1 items-center last:flex-none">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      isCompleted
                        ? "bg-emerald-600 text-white"
                        : isActive
                          ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : step.id}
                  </span>
                  <span className="hidden sm:block">
                    <span
                      className={`block text-sm font-semibold ${
                        isActive || isCompleted
                          ? "text-slate-800"
                          : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="block text-xs text-slate-400">
                      {step.subtitle}
                    </span>
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <span
                    className={`mx-4 h-0.5 flex-1 rounded-full transition-colors ${
                      currentStep > step.id ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
      {/* STEP CONTENT */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        {error && (
          <p className="mb-4 rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm text-rose-600">
            {error}
          </p>
        )}

        {currentStep === 1 && (
          <div>
            <h2 className="mb-4 text-[15px] font-semibold text-slate-800">
              Product — Basic Info
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="Select Type"
                required
                value={form.type}
                onChange={(v) => set("type", v)}
                options={TYPE_OPTIONS}
                placeholder="Select Type"
              />
              <SelectField
                label="Select Category"
                required
                value={form.category}
                onChange={(v) => set("category", v)}
                options={CATEGORY_OPTIONS}
                placeholder="Select Category"
              />
              <SelectField
                label="Select Sub-Category"
                value={form.subCategory}
                onChange={(v) => set("subCategory", v)}
                options={SUB_CATEGORY_OPTIONS}
                placeholder="Select Sub-Category"
              />
              <div>
                <label className={labelClass}>
                  Product Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.productName}
                  onChange={(e) => set("productName", e.target.value)}
                  placeholder="Product Name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  SKU No. <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.skuNo}
                  onChange={(e) => set("skuNo", e.target.value)}
                  placeholder="SKU No."
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-4 grid gap-4">
              <div>
                <label className={labelClass}>Short Description</label>
                <textarea
                  value={form.shortDesc}
                  onChange={(e) => set("shortDesc", e.target.value)}
                  rows={3}
                  placeholder="Short Description"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div>
                <label className={labelClass}>Full Description</label>
                <textarea
                  value={form.fullDesc}
                  onChange={(e) => set("fullDesc", e.target.value)}
                  rows={5}
                  placeholder="Full Description"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2 className="mb-4 text-[15px] font-semibold text-slate-800">
              Image — Primary Upload
            </h2>
            <label className={labelClass}>Primary Image</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-slate-200 px-4 py-5 transition-colors hover:border-emerald-300">
              {primaryImage ? (
                <img
                  src={primaryImage}
                  alt="Primary preview"
                  className="h-16 w-16 rounded-lg object-cover"
                />
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
                  <ImagePlus className="h-6 w-6 text-slate-400" />
                </span>
              )}
              <span className="text-sm text-slate-500">
                Upload primary image (JPG, PNG)
              </span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFile(e.target.files?.[0], setPrimaryImage)}
              />
            </label>

            <div className="mt-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                Multiple Images
              </h3>
              <button
                type="button"
                onClick={() =>
                  setGallery((prev) => [...prev, { id: Date.now(), url: null }])
                }
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-emerald-600 px-3.5 py-2 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                <Plus className="h-3.5 w-3.5" />
                Add More Image
              </button>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                <div
                  key={g.id}
                  className="relative rounded-lg border-2 border-dashed border-slate-200 p-3"
                >
                  <button
                    type="button"
                    aria-label="Delete image"
                    onClick={() =>
                      setGallery((prev) => prev.filter((x) => x.id !== g.id))
                    }
                    className="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-slate-400 shadow transition-colors hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <label className="flex cursor-pointer flex-col items-center gap-2 py-3">
                    {g.url ? (
                      <img
                        src={g.url}
                        alt="Gallery preview"
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-100">
                        <ImagePlus className="h-6 w-6 text-slate-400" />
                      </span>
                    )}
                    <span className="text-xs text-slate-500">
                      Click to upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        handleFile(e.target.files?.[0], (url) =>
                          setGallery((prev) =>
                            prev.map((x) =>
                              x.id === g.id ? { ...x, url } : x
                            )
                          )
                        )
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <StockStep rows={stockRows} onChange={setStockRows} />
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="mb-4 text-[15px] font-semibold text-slate-800">
              Shipping — Delivery Details
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>Delivery Weight (kg)</label>
                <input
                  type="number"
                  min={0}
                  value={form.deliveryWeight}
                  onChange={(e) => set("deliveryWeight", e.target.value)}
                  placeholder="Delivery Weight"
                  className={inputClass}
                />
              </div>
              <SelectField
                label="Shipping Class"
                value={form.shippingClass}
                onChange={(v) => set("shippingClass", v)}
                options={SHIPPING_CLASS_OPTIONS}
                placeholder="Select Shipping Class"
              />
              <div>
                <label className={labelClass}>Length (cm)</label>
                <input
                  type="number"
                  min={0}
                  value={form.length}
                  onChange={(e) => set("length", e.target.value)}
                  placeholder="Length"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Width (cm)</label>
                <input
                  type="number"
                  min={0}
                  value={form.width}
                  onChange={(e) => set("width", e.target.value)}
                  placeholder="Width"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Height (cm)</label>
                <input
                  type="number"
                  min={0}
                  value={form.height}
                  onChange={(e) => set("height", e.target.value)}
                  placeholder="Height"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Delivery Charges</label>
                <input
                  type="number"
                  min={0}
                  value={form.deliveryCharges}
                  onChange={(e) => set("deliveryCharges", e.target.value)}
                  placeholder="Delivery Charges"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2 className="mb-4 text-[15px] font-semibold text-slate-800">
              How To Use — Instructions
            </h2>
            <label className={labelClass}>
              How to Use / Service Instructions{" "}
              <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={form.howToUse}
              onChange={(e) => set("howToUse", e.target.value)}
              rows={10}
              placeholder="Write how to use / service instructions..."
              className={`${inputClass} resize-none`}
            />
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="cursor-pointer rounded-lg border border-slate-200 px-8 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="cursor-pointer rounded-lg bg-emerald-600 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="cursor-pointer rounded-lg bg-emerald-600 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Save &amp; Submit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const SelectField = ({
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

export default ProductWizard
