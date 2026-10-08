import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { HomeSectionFormSchemaType } from "../schema"

interface DynamicTextListProps {
  name: "marketPlaceText" | "supportingText" | "marketPlace"
  label: string
  placeholder?: string
}

export function DynamicTextList({
  name,
  label,
  placeholder,
}: DynamicTextListProps) {
  const form = useFormContext<HomeSectionFormSchemaType>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  })

  return (
    <div className="space-y-2">
      <Label className="text-sm font-normal text-tertiary-100">{label}</Label>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <input
              {...form.register(`${name}.${index}.value` as const)}
              placeholder={placeholder}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary-500"
            />
            <button
              type="button"
              aria-label="Remove"
              onClick={() => remove(index)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ value: "" })}
        className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
      >
        <Plus className="h-3.5 w-3.5" /> Add {label}
      </button>
    </div>
  )
}
