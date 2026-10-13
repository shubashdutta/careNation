import { useState } from "react"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"

const breadcrumbTrail = ["Home", "Product Manager", "Attribute"]

const SERVICE_OPTIONS = ["Service A", "Service B", "Service C"]

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

const labelClass = "mb-1.5 block text-[13px] font-medium text-slate-700"

const cardClass =
  "rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"

const sectionTitleClass = "mb-4 text-[15px] font-semibold text-slate-800"

interface ValueRow {
  id: number
  value: string
}

const AddAttributesForm = () => {
  const [service, setService] = useState("")
  const [attributesName, setAttributesName] = useState("")
  const [values, setValues] = useState<ValueRow[]>([
    { id: Date.now(), value: "" },
  ])

  const addValue = () =>
    setValues((prev) => [...prev, { id: Date.now(), value: "" }])

  const removeValue = (id: number) => {
    if (values.length <= 1) return
    setValues((prev) => prev.filter((v) => v.id !== id))
  }

  const updateValue = (id: number, value: string) =>
    setValues((prev) => prev.map((v) => (v.id === id ? { ...v, value } : v)))

  const handleSave = () => {
    console.log("attributes", {
      service,
      attributesName,
      values: values.map((v) => v.value),
    })
  }

  return (
    <div className="space-y-5">
      <Breadcrumb trail={breadcrumbTrail} />

      <div className="px-1">
        <h1 className="text-xl leading-tight font-bold text-[#2F234F]">
          Add Attributes
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          User to define product traits
        </p>
      </div>

      {/* CARD 1 — Attributes Details */}
      <div className={cardClass}>
        <h2 className={sectionTitleClass}>Attributes Details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <SelectBox
            label="Service"
            required
            value={service}
            onChange={setService}
            options={SERVICE_OPTIONS}
            placeholder="-Select Service-"
          />
          <div>
            <label className={labelClass}>
              Attributes Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={attributesName}
                onChange={(e) => setAttributesName(e.target.value)}
                placeholder="Enter Attributes Name"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                aria-label="Clear attributes name"
                onClick={() => setAttributesName("")}
                className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-rose-500 transition-colors hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2 — Attributes Value (Repeater) */}
      <div className={cardClass}>
        <h2 className={sectionTitleClass}>Attributes Value</h2>
        <div className="space-y-4">
          {values.map((row) => (
            <div key={row.id}>
              <label className={labelClass}>
                Value <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={row.value}
                  onChange={(e) => updateValue(row.id, e.target.value)}
                  placeholder="Enter Value"
                  className={`${inputClass} pr-10`}
                />
                {values.length > 1 && (
                  <button
                    type="button"
                    aria-label="Remove value"
                    onClick={() => removeValue(row.id)}
                    className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-rose-500 transition-colors hover:bg-rose-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addValue}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-emerald-500 px-4 py-2 font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
        >
          <Plus className="h-4 w-4" />
          Add-Value
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="cursor-pointer rounded-lg bg-emerald-600 px-8 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Save
        </button>
      </div>
    </div>
  )
}

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
        className={`${inputClass} cursor-pointer appearance-none pr-10 ${
          value ? "" : "text-slate-400"
        }`}
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

export default AddAttributesForm

