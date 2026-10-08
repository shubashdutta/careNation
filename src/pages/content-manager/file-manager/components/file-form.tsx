import { useState } from "react"
import { InputField } from "@/components/extended-components/extended-input"

export const FileForm = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[18px] font-medium text-[#322A53]">Fill-up Form</h2>
        <p className="text-xs text-[#A0AEC0]">
          Please fill all the details correctly.
        </p>
      </div>

      {/* Form Fields - 3 Column Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <InputField
          name="navigatorId"
          label="Navigator ID"
          placeholder="Navigator ID"
        />
        <InputField
          name="navigatorName"
          label="Navigator Name"
          placeholder="Navigator Name"
        />
        <InputField
          name="mobileNo"
          label="Mobile No."
          placeholder="Mobile No."
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="********"
        />
        <InputField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="********"
        />
        <InputField
          name="email"
          label="E-mail"
          type="email"
          placeholder="E-mail"
        />
        <InputField name="fullName" label="Full Name" placeholder="Full Name" />
      </div>

      {/* Footer Controls */}
      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-[#4A5568]">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
          />
          <span>
            I accept{" "}
            <a href="#" className="font-medium text-[#10B981] hover:underline">
              Terms & Conditions
            </a>
          </span>
        </label>
      </div>
    </div>
  )
}

export default FileForm
