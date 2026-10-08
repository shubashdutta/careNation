import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"
import { InputField } from "@/components/extended-components/extended-input"
import { InputUploadImage } from "@/components/extended-components/input-upload-image"
import uploadImage from "@/hooks/use-upload-image"
import type { HomeSectionFormSchemaType } from "../schema"

export function ServicesSection() {
  const form = useFormContext<HomeSectionFormSchemaType>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-800">Services</h3>
          <p className="text-xs text-gray-400">
            Service highlight cards shown on the homepage
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            append({
              sectionName: "",
              sectionSubtitle: "",
              mainLevel: "",
              supportingLevel: "",
              sectionImage: "",
              sortOrder: fields.length + 1,
            })
          }
          className="flex items-center gap-1 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-600 hover:bg-purple-100"
        >
          <Plus className="h-3.5 w-3.5" /> Add Service
        </button>
      </div>

      {fields.length === 0 && (
        <p className="text-xs text-gray-400">No services added yet.</p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-3 rounded-xl border border-gray-100 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">
              Service {index + 1}
            </span>
            <button
              type="button"
              aria-label="Remove service"
              onClick={() => remove(index)}
              className="text-red-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField<HomeSectionFormSchemaType>
              name={`services.${index}.sectionName`}
              label="Section Name"
              placeholder="e.g. E-commerce Solution"
            />
            <InputField<HomeSectionFormSchemaType>
              name={`services.${index}.sectionSubtitle`}
              label="Section Subtitle"
              placeholder="e.g. Complete online selling solution"
            />
            <InputField<HomeSectionFormSchemaType>
              name={`services.${index}.mainLevel`}
              label="Main Text"
              placeholder="e.g. Sell Faster"
            />
            <InputField<HomeSectionFormSchemaType>
              name={`services.${index}.supportingLevel`}
              label="Supporting Text"
              placeholder="e.g. Reach more customers"
            />
            <InputField<HomeSectionFormSchemaType>
              name={`services.${index}.sortOrder`}
              label="Sort Order"
              type="number"
            />
          </div>

          <InputUploadImage<HomeSectionFormSchemaType>
            name={`services.${index}.sectionImage`}
            title="Service Image"
            onUpload={uploadImage}
          />
        </div>
      ))}
    </div>
  )
}
