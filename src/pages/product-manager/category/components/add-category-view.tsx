import { useState } from "react"
import { ArrowLeft, ChevronDown, ImagePlus, Plus } from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"

const SUBTYPE_OPTIONS = ["Product", "Service", "Bundle", "Combo"]

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-[13px] font-medium text-slate-700"

interface AddCategoryViewProps {
  trail: string[]
  onBack: () => void
  onAddSub: () => void
  onSave: (name: string) => void
}

const AddCategoryView = ({
  trail,
  onBack,
  onAddSub,
  onSave,
}: AddCategoryViewProps) => {
  const [subtype, setSubtype] = useState("")
  const [name, setName] = useState("")
  const [ordering, setOrdering] = useState("")
  const [image, setImage] = useState<string | null>(null)

  const handleImage = (file: File | undefined) => {
    if (!file) return
    setImage(URL.createObjectURL(file))
  }

  return (
    <div className="space-y-5">
      <Breadcrumb trail={trail} />
      <div className="flex items-center gap-4 px-1">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to categories"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <h1 className="text-xl leading-tight font-bold text-[#2F234F]">
            Add Category
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Create a new category
          </p>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h2 className="mb-4 text-[15px] font-semibold text-slate-800">
          Add New Category
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Subtype <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={subtype}
                onChange={(e) => setSubtype(e.target.value)}
                className={`${inputClass} cursor-pointer appearance-none pr-10 ${subtype ? "" : "text-slate-400"}`}
              >
                <option value="" disabled>
                  Select subtype
                </option>
                {SUBTYPE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div>
            <label className={labelClass}>
              Category Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Ordering <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              min={0}
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              placeholder="Ordering"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Image <span className="text-rose-500">*</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-slate-200 px-4 py-3 transition-colors hover:border-emerald-300">
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="h-12 w-12 rounded-lg object-cover"
                />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                  <ImagePlus className="h-5 w-5 text-slate-400" />
                </span>
              )}
              <span className="text-sm text-slate-500">
                Drag file or browse
              </span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImage(e.target.files?.[0])}
              />
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onAddSub}
            className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border border-emerald-600 px-5 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            <Plus className="h-4 w-4" />
            Add Sub-Category
          </button>
          <button
            type="button"
            onClick={() => onSave(name || "New Category")}
            className="cursor-pointer rounded-lg bg-emerald-600 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Save
          </button>
        </div>
      </section>
    </div>
  )
}

export default AddCategoryView
