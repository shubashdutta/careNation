import { useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { InputField } from "@/components/extended-components/extended-input"
import { InputTextarea } from "@/components/extended-components/input-textarea"
import InputSelect from "@/components/extended-components/input-select"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { WarehouseFormSchemaType } from "../schema"

const TYPE_OPTIONS = [
  { label: "Shop", value: "SHOP" },
  { label: "Warehouse", value: "WAREHOUSE" },
  { label: "Store", value: "STORE" },
  { label: "Distribution Center", value: "DISTRIBUTION_CENTER" },
  { label: "Manufacturing", value: "MANUFACTURING" },
  { label: "Factory", value: "FACTORY" },
]

const STATE_OPTIONS = [
  { label: "Koshi", value: "Koshi" },
  { label: "Madhesh", value: "Madhesh" },
  { label: "Bagmati", value: "Bagmati" },
  { label: "Gandaki", value: "Gandaki" },
  { label: "Lumbini", value: "Lumbini" },
  { label: "Karnali", value: "Karnali" },
  { label: "Sudurpashchim", value: "Sudurpashchim" },
]

export const WarehouseForm = () => {
  const form = useFormContext<WarehouseFormSchemaType>()

  return (
    <div className="my-2 space-y-6">
      <section className="space-y-4 rounded-2xl border border-[#ECECF2] bg-[#FCFCFD] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h3 className="text-sm font-semibold">Basic Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <InputField<WarehouseFormSchemaType>
            name="name"
            label="Name"
            placeholder="Name"
          />
          <InputSelect<WarehouseFormSchemaType>
            name="type"
            title="Warehouse Type"
            placeholder="Select type"
            options={TYPE_OPTIONS}
          />
          <InputField<WarehouseFormSchemaType>
            name="code"
            label="Warehouse Code"
            placeholder="e.g. BH220"
          />
          <InputTextarea<WarehouseFormSchemaType>
            name="description"
            label="Description"
            placeholder="Add a short description"
            rows={4}
            className="md:col-span-2"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-[#ECECF2] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h3 className="text-sm font-semibold text-tertiary-100">
          Contact Information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <InputField<WarehouseFormSchemaType>
            name="contactName"
            label="Contact Name"
            placeholder="Contact name"
          />
          <InputField<WarehouseFormSchemaType>
            name="contactEmail"
            label="Contact Email"
            placeholder="e.g. name@example.com"
            type="email"
            isRequired={false}
          />
          <InputField<WarehouseFormSchemaType>
            name="contactPhone"
            label="Contact Phone"
            placeholder="e.g. 9800000000"
            isRequired={false}
          />

          <FormField
            control={form.control}
            name="isPrimary"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 rounded-lg border border-dashed border-border/60 p-4 md:col-span-2">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    Primary contact
                  </FormLabel>
                  <p className="text-xs text-tertiary-300">
                    Mark this contact as the main point of contact.
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-[#ECECF2] bg-[#FCFCFD] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <h3 className="text-sm font-semibold text-tertiary-100">Address Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <InputField<WarehouseFormSchemaType>
            name="addressLine1"
            label="Address Line 1"
            placeholder="e.g. Thimi Nagadesh"
          />
          <InputField<WarehouseFormSchemaType>
            name="addressLine2"
            label="Address Line 2"
            placeholder="Apartment, suite, floor, etc."
            isRequired={false}
          />
          <InputField<WarehouseFormSchemaType>
            name="city"
            label="City"
            placeholder="City"
          />
          <InputSelect<WarehouseFormSchemaType>
            name="state"
            title="State"
            placeholder="Select state"
            options={STATE_OPTIONS}
          />
          <InputField<WarehouseFormSchemaType>
            name="postalCode"
            label="Postal Code"
            placeholder="Postal code"
          />
          <InputField<WarehouseFormSchemaType>
            name="country"
            label="Country"
            placeholder="Country"
          />
          <InputField<WarehouseFormSchemaType>
            name="mapUrl"
            label="Map URL"
            placeholder="Paste Google Maps link"
            type="url"
            isRequired={false}
            className="md:col-span-2"
          />
        </div>
      </section>
    </div>
  )
}
