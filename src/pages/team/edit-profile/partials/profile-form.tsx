import { InputField } from "@/components/extended-components/extended-input"

export const ProfileForm = () => {
  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[18px] font-medium text-[#322A53]">User Id</h2>
        <p className="text-xs text-[#A0AEC0]">
          Enter number id to view matching tree.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <InputField name="userId" label="User Name" placeholder="User Name" />
      </div>
    </div>
  )
}

export default ProfileForm
