import { useState } from "react"
import { InputField } from "@/components/extended-components/extended-input"
import InputSelect from "@/components/extended-components/input-select"

interface FilterFormProps {
  onCancel?: () => void
}

export const FilterForm = ({ onCancel }: FilterFormProps) => {
  const [status, setStatus] = useState<"active" | "inactive" | null>(null)

  return (
    <div className="w-full bg-white p-2">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-[18px] font-medium text-[#322A53]">Filter</h2>
          <p className="text-xs text-[#A0AEC0]">List All the Users</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium text-[#E53E3E] transition-colors hover:text-red-600"
        >
          Cancel
        </button>
      </div>

      {/* Form Fields Grid - 2 Columns */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <InputField name="userId" label="User ID" placeholder="User ID" />
        <InputField name="name" label="Name" placeholder="Name" />
        <InputField
          name="mobileNo"
          label="Mobile No."
          placeholder="Mobile No."
        />
        <InputField
          name="email"
          label="E-mail"
          type="email"
          placeholder="E-mail"
        />
        <InputSelect
          name="package"
          title="Package"
          options={[]}
          placeholder="Select Package"
        />

        {/* Status Checkboxes */}
        <div className="flex flex-col justify-end pb-2">
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold text-[#718096]">Status</span>
            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-[#718096]">
                <input
                  type="checkbox"
                  checked={status === "active"}
                  onChange={() =>
                    setStatus(status === "active" ? null : "active")
                  }
                  className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Active</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-xs text-[#718096]">
                <input
                  type="checkbox"
                  checked={status === "inactive"}
                  onChange={() =>
                    setStatus(status === "inactive" ? null : "inactive")
                  }
                  className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Inactive</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterForm
