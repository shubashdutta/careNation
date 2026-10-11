"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import InputSelect from "@/components/extended-components/input-select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Modal from "@/components/shared/modal"
import { useEffect } from "react"
import { InputField } from "@/components/extended-components/extended-input"

// Local schema definition to avoid cross-module coupling
export const formSchema = z.object({
  storeType: z.enum(['Warehouse', 'Province', 'Sales Point']),
  provinceCode: z.string().min(1, 'Province Code is required'),
  storeName: z.string().min(1, 'Store Name is required'),
  email: z.string().email('Invalid email address'),
  mobileNo: z.string().min(1, 'Mobile No. is required'),
  password: z.string().optional(),
  contactPerson: z.string().optional(),
  vatNo: z.string().min(1, 'VAT No. is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
  province: z.string().min(1, 'Province is required'),
  country: z.string().min(1, 'Country is required'),
  status: z.enum(['Active', 'Inactive']),
})

export type StoreFormData = z.infer<typeof formSchema>

interface StoreFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: StoreFormData) => void
  initialData?: Partial<StoreFormData> | null
  title?: string
  storeType?: "Warehouse" | "Province" | "Sales Point"
}

const cityOptions = [
  { label: "Kathmandu", value: "kathmandu" },
  { label: "Pokhara", value: "pokhara" },
  { label: "Lalitpur", value: "lalitpur" },
]

const districtOptions = [
  { label: "Kathmandu", value: "kathmandu" },
  { label: "Kaski", value: "kaski" },
]

const provinceOptions = [
  { label: "Bagmati Province", value: "bagmati" },
  { label: "Gandaki Province", value: "gandaki" },
]

const countryOptions = [{ label: "Nepal", value: "Nepal" }]

export const StoreFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title = "Add New Store",
  storeType = "Province",
}: StoreFormModalProps) => {
  const form = useForm<StoreFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeType: storeType,
      provinceCode: "",
      storeName: "",
      email: "",
      mobileNo: "",
      password: "",
      contactPerson: "",
      vatNo: "",
      address: "",
      city: "",
      district: "",
      province: "",
      country: "Nepal",
      status: "Active",
      ...initialData,
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        storeType: storeType,
        provinceCode: "",
        storeName: "",
        email: "",
        mobileNo: "",
        password: "",
        contactPerson: "",
        vatNo: "",
        address: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
        status: "Active",
        ...initialData,
      })
    }
  }, [initialData, form, storeType])

  const handleFormSubmit = (data: StoreFormData) => {
    onSubmit(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <div className="max-h-[85vh] space-y-6 overflow-y-auto no-scrollbar rounded-2xl bg-white p-6">
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <div className="flex items-center gap-8">
              <Label className="text-sm font-semibold text-slate-700">
                Store Type <span className="text-red-500">*</span> :
              </Label>
              <div className="flex items-center gap-6">
                {(["Warehouse", "Province", "Sales Point"] as const).map(
                  (type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox
                        id={type}
                        checked={form.watch("storeType") === type}
                        onCheckedChange={() =>
                          form.setValue("storeType", type, {
                            shouldValidate: true,
                          })
                        }
                      />
                      <Label
                        htmlFor={type}
                        className="cursor-pointer font-normal text-slate-600"
                      >
                        {type}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                name="provinceCode"
                label="Province Code"
                placeholder="Province Code"
                isRequired={true}
              />
              <InputField
                name="storeName"
                label="Store Name"
                placeholder="Store Name"
                isRequired={true}
              />

              <InputField
                name="email"
                label="E-mail"
                placeholder="E-mail"
                isRequired={true}
              />
              <InputField
                name="mobileNo"
                label="Mobile No."
                placeholder="Mobile No."
                isRequired={true}
              />

              <InputField
                type="password"
                name="password"
                label="Password"
                placeholder="********"
              />
              <InputField
                name="contactPerson"
                label="Contact Person"
                placeholder="Contact Person"
              />

              <InputField
                name="vatNo"
                label="VAT No"
                placeholder="Vat No."
                isRequired={true}
              />
              <InputField
                name="address"
                label="Address"
                placeholder="Address"
                isRequired={true}
              />

              <InputSelect
                name="city"
                title="City"
                placeholder="City"
                options={cityOptions}
                isRequired={true}
              />
              <InputSelect
                name="district"
                title="District"
                placeholder="District"
                options={districtOptions}
                isRequired={true}
              />

              <InputSelect
                name="province"
                title="Province"
                placeholder="Province"
                options={provinceOptions}
                isRequired={true}
              />
              <InputSelect
                name="country"
                title="Country"
                placeholder="Country"
                options={countryOptions}
                isRequired={true}
              />
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-6">
                <Label className="text-sm font-semibold text-slate-700">
                  Status <span className="text-red-500">*</span> :
                </Label>
                <div className="flex items-center gap-6">
                  {(["Active", "Inactive"] as const).map((st) => (
                    <div key={st} className="flex items-center gap-2">
                      <Checkbox
                        id={st}
                        checked={form.watch("status") === st}
                        onCheckedChange={() =>
                          form.setValue("status", st, { shouldValidate: true })
                        }
                      />
                      <Label
                        htmlFor={st}
                        className="cursor-pointer font-normal text-slate-600"
                      >
                        {st}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="cursor-pointer border-slate-300 px-6 text-slate-600 hover:bg-slate-50"
                >
                  Reset All
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer bg-green-500 px-8 text-white hover:bg-green-600"
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}

export default StoreFormModal
