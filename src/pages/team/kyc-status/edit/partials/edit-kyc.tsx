import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, MapPin, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ExtendedForm from "@/components/extended-components/extended-form"
import { InputDocument } from "@/components/extended-components/input-document"
import { InputField } from "@/components/extended-components/extended-input"
import InputSelect from "@/components/extended-components/input-select"
import { PATH } from "@/constant/path"
import { EditKycSchema, type EditKycSchemaType } from "../schema"

const LOCATION_OPTIONS = [
  { label: "Bagmati", value: "bagmati" },
  { label: "Kathmandu", value: "kathmandu" },
]

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="border-b border-[#E5E7EB] pb-2 text-sm font-medium text-[#322A53]">
    {children}
  </h2>
)

const EditKycContent = () => {
  const navigate = useNavigate()
  const form = useForm<EditKycSchemaType>({
    resolver: zodResolver(EditKycSchema),
    defaultValues: {
      temporaryAddress: "Same as temporary address",
      temporaryProvince: "bagmati",
      temporaryDistrict: "kathmandu",
      temporaryMunicipality: "kathmandu",
      temporaryLandmark: "Kathmandu",
      permanentAddress: "Same as temporary address",
      permanentProvince: "bagmati",
      permanentDistrict: "kathmandu",
      permanentMunicipality: "kathmandu",
      permanentLandmark: "Kathmandu",
      fatherName: "Bagmati",
      motherName: "Kathmandu",
      grandfatherName: "Kathmandu",
      panNumber: "Bagmati",
      nomineeName: "",
      relationship: "",
      nomineeNidNumber: "Kathmandu",
    },
  })

  const handleSubmit = (_data: EditKycSchemaType) => {
    toast.success("KYC updated successfully")
    navigate(PATH.team.kycStatus)
  }

  return (
    <ExtendedForm
      form={form}
      onSubmit={handleSubmit}
      submitText="Update"
      cancelText="Cancel"
      showCancelBtn
      onClose={() => navigate(PATH.team.kycStatus)}
      className="gap-4"
    >
      <section className="rounded-lg bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
                alt="Bibha Thapa"
                className="h-16 w-16 rounded-lg object-cover"
              />
              <span className="text-[10px] text-[#6B7280]">
                Username : 981234567
              </span>
            </div>
            <div className="space-y-1 text-xs text-[#6B7280]">
              <h2 className="font-medium text-[#322A53]">Bibha Thapa</h2>
              <p className="flex items-center gap-1">
                <Mail className="h-3 w-3 text-primary-500" />
                thapabibha7@gmail.com
              </p>
              <p className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-primary-500" />
                Female
              </p>
              <p className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-primary-500" />
                981234567
              </p>
            </div>
          </div>
          <button
            type="button"
            className="text-xs font-medium text-primary-500"
            onClick={() =>
              toast.info("Profile image editing is not connected yet")
            }
          >
            Edit
          </button>
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-sm">
        <SectionTitle>KYC Info</SectionTitle>
        <div className="space-y-5 pt-4">
          <div>
            <h3 className="mb-3 text-xs font-medium text-[#4B5563]">
              Temporary Address
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <InputField name="temporaryAddress" label="Address" />
              <InputSelect
                name="temporaryProvince"
                title="Province"
                options={LOCATION_OPTIONS}
              />
              <InputSelect
                name="temporaryDistrict"
                title="District"
                options={LOCATION_OPTIONS}
              />
              <InputSelect
                name="temporaryMunicipality"
                title="Municipality"
                options={LOCATION_OPTIONS}
              />
              <InputField name="temporaryLandmark" label="Landmark" />
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-medium text-[#4B5563]">
              Permanent Address
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <InputField name="permanentAddress" label="Address" />
              <InputSelect
                name="permanentProvince"
                title="Province"
                options={LOCATION_OPTIONS}
              />
              <InputSelect
                name="permanentDistrict"
                title="District"
                options={LOCATION_OPTIONS}
              />
              <InputSelect
                name="permanentMunicipality"
                title="Municipality"
                options={LOCATION_OPTIONS}
              />
              <InputField name="permanentLandmark" label="Landmark" />
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-medium text-[#4B5563]">
              Family Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <InputField name="fatherName" label="Father's Name" />
              <InputField name="motherName" label="Mother's Name" />
              <InputField name="grandfatherName" label="Grandfather's Name" />
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-medium text-[#4B5563]">
              Documents
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <InputField name="panNumber" label="PAN Number" />
              <InputDocument
                name="panCard"
                title="Attach Documents/Pan Card"
                className="[&>div:nth-child(2)]:min-h-24 [&>div:nth-child(2)]:py-3"
              />
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-medium text-[#4B5563]">
              Nominee Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                name="nomineeName"
                label="Nominee Name"
                isRequired={false}
                placeholder="Enter nominee full name"
              />
              <InputSelect
                name="relationship"
                title="Relationship"
                isRequired={false}
                placeholder="Select relationship"
                options={[
                  { label: "Parent", value: "parent" },
                  { label: "Spouse", value: "spouse" },
                  { label: "Sibling", value: "sibling" },
                ]}
              />
              <InputField
                name="nomineeNidNumber"
                label="Nominee NID Number"
                isRequired={false}
              />
            </div>
          </div>
        </div>
      </section>
    </ExtendedForm>
  )
}

export default EditKycContent
