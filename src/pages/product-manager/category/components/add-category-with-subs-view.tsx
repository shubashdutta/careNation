import { useState } from "react"
import { ArrowLeft, ChevronDown, ImagePlus, Plus, Trash2 } from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"

const SUBTYPE_OPTIONS = ["Product", "Service", "Bundle", "Combo"]

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-[13px] font-medium text-slate-700"

interface SubCategory {
  id: number
  name: string
  ordering: string
  image: string | null
}

interface AddCategoryWithSubsViewProps {
  trail: string[]
  onBack: () => void
  onSave: (name: string, subCount: number) => void
}

const AddCategoryWithSubsView = ({
  trail,
  onBack,
  onSave,
}: AddCategoryWithSubsViewProps) => {
  const [subtype, setSubtype] = useState("")
  const [name, setName] = useState("")
  const [ordering, setOrdering] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [subs, setSubs] = useState<SubCategory[]>([
    { id: Date.now(), name: "", ordering: "", image: null },
  ])

  const addSub = () => {
    setSubs((prev) => [
      ...prev,
      { id: Date.now(), name: "", ordering: "", image: null },
    ])
  }

  const removeSub = (id: number) => {
    setSubs((prev) => prev.filter((s) => s.id !== id))
  }

  const updateSub = (id: number, key: keyof SubCategory, value: string) => {
    setSubs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: value } : s))
    )
  }

  const handleImage = (
    file: File | undefined,
    setter: (url: string) => void
  ) => {
    if (!file) return
    setter(URL.createObjectURL(file))
  }

  const handleSave = () => {
    console.log({
      parent: { subtype, name, ordering, image },
      subCategories: subs,
    })
    onSave(name || "New Category", subs.length)
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
            Add Category / Add Sub-Category
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
                onChange={(e) => handleImage(e.target.files?.[0], setImage)}
              />
            </label>
          </div>
        </div>
      </section>
      {subs.map((sub, idx) => (
        <section
          key={sub.id}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-slate-800">
              Add Sub Category {subs.length > 1 ? `#${idx + 1}` : ""}
            </h2>
            <button
              type="button"
              onClick={() => removeSub(sub.id)}
              aria-label="Delete sub-category"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Sub Category Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={sub.name}
                onChange={(e) => updateSub(sub.id, "name", e.target.value)}
                placeholder="Sub Category Name"
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
                value={sub.ordering}
                onChange={(e) => updateSub(sub.id, "ordering", e.target.value)}
                placeholder="Ordering"
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>
                Image <span className="text-rose-500">*</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-slate-200 px-4 py-3 transition-colors hover:border-emerald-300">
                {sub.image ? (
                  <img
                    src={sub.image}
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
                  onChange={(e) =>
                    handleImage(e.target.files?.[0], (url) =>
                      updateSub(sub.id, "image", url)
                    )
                  }
                />
              </label>
            </div>
          </div>
        </section>
      ))}

      <button
        type="button"
        onClick={addSub}
        className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border border-emerald-600 px-5 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
      >
        <Plus className="h-4 w-4" />
        Add Sub-Category
      </button>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="cursor-pointer rounded-lg bg-emerald-600 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default AddCategoryWithSubsView
