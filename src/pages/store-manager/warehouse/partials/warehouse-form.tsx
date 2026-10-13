import { InputField } from "@/components/extended-components/extended-input"
import InputSelect from "@/components/extended-components/input-select"
import type { WarehouseFormSchemaType } from "../schema"

const PROVINCE_OPTIONS = [
  { label: "Koshi", value: "Koshi" },
  { label: "Madhesh", value: "Madhesh" },
  { label: "Bagmati", value: "Bagmati" },
  { label: "Gandaki", value: "Gandaki" },
  { label: "Lumbini", value: "Lumbini" },
  { label: "Karnali", value: "Karnali" },
  { label: "Sudurpashchim", value: "Sudurpashchim" },
]

const DISTRICT_OPTIONS = [
  { label: "Morang", value: "Morang" },
  { label: "Jhapa", value: "Jhapa" },
  { label: "Dhanusha", value: "Dhanusha" },
  { label: "Kathmandu", value: "Kathmandu" },
  { label: "Lalitpur", value: "Lalitpur" },
  { label: "Bhaktapur", value: "Bhaktapur" },
  { label: "Kaski", value: "Kaski" },
  { label: "Rupandehi", value: "Rupandehi" },
  { label: "Surkhet", value: "Surkhet" },
  { label: "Kailali", value: "Kailali" },
]

const MUNICIPALITY_OPTIONS = [
  { label: "Biratnagar", value: "Biratnagar" },
  { label: "Birtamode", value: "Birtamode" },
  { label: "Janakpur", value: "Janakpur" },
  { label: "Kathmandu", value: "Kathmandu" },
  { label: "Lalitpur", value: "Lalitpur" },
  { label: "Bhaktapur", value: "Bhaktapur" },
  { label: "Pokhara", value: "Pokhara" },
  { label: "Butwal", value: "Butwal" },
  { label: "Birendranagar", value: "Birendranagar" },
  { label: "Dhangadhi", value: "Dhangadhi" },
]

const WAREHOUSE_OPTIONS = [
  { label: "Downtown Distribution Center (DCC-01)", value: "WH-001" },
  { label: "Midtown Retail Store (MRS-02)", value: "WH-002" },
  { label: "Express Shop - Brooklyn (ESB-03)", value: "WH-003" },
  { label: "Queens Fulfillment Center (QFC-04)", value: "WH-004" },
  { label: "Manufacturing Plant - Bronx (MPB-05)", value: "WH-005" },
  { label: "Staten Island Shopping Plaza (SSP-06)", value: "WH-006" },
  { label: "New Jersey Regional Hub (NJH-07)", value: "WH-007" },
  { label: "Jersey City Express (JCE-08)", value: "WH-008" },
  { label: "Manufacturing Hub - Patterson (MHP-09)", value: "WH-009" },
  { label: "Trenton Logistics Center (TLC-10)", value: "WH-010" },
]

const PRODUCT_OPTIONS = [
  { label: "Product A", value: "PROD-001" },
  { label: "Product B", value: "PROD-002" },
  { label: "Product C", value: "PROD-003" },
]

export const WarehouseForm = () => {
  return (
    <div className="my-2 space-y-6">
      <section className="space-y-4 rounded-2xl border border-[#ECECF2] bg-[#FCFCFD] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h3 className="text-sm font-semibold">Enter Warehouse Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <InputField<WarehouseFormSchemaType>
            name="name"
            label="Warehouse Name"
            placeholder="Warehouse name"
          />
          <InputField<WarehouseFormSchemaType>
            name="contactPhone"
            label="Contact Number"
            placeholder="e.g. 9800000000"
          />
          <InputField<WarehouseFormSchemaType>
            name="contactEmail"
            label="Email"
            placeholder="e.g. name@example.com"
            type="email"
            isRequired={false}
          />
          <InputField<WarehouseFormSchemaType>
            name="landmark"
            label="Land Mark"
            placeholder="e.g. Near city hall"
            isRequired={false}
          />
          <InputField<WarehouseFormSchemaType>
            name="streetName"
            label="Street Name"
            placeholder="e.g. Main street"
          />
          <InputSelect<WarehouseFormSchemaType>
            name="province"
            title="Province"
            placeholder="Select province"
            options={PROVINCE_OPTIONS}
          />
          <InputSelect<WarehouseFormSchemaType>
            name="district"
            title="District"
            placeholder="Select district"
            options={DISTRICT_OPTIONS}
          />
          <InputSelect<WarehouseFormSchemaType>
            name="municipality"
            title="Municipality"
            placeholder="Select municipality"
            options={MUNICIPALITY_OPTIONS}
          />
          <InputField<WarehouseFormSchemaType>
            name="wardNo"
            label="Ward No."
            placeholder="e.g. 5"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-[#ECECF2] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h3 className="text-sm font-semibold text-tertiary-100">
          Enter Warehouse Information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <InputSelect<WarehouseFormSchemaType>
            name="warehouseId"
            title="Warehouse"
            placeholder="Select warehouse"
            options={WAREHOUSE_OPTIONS}
          />
          <InputSelect<WarehouseFormSchemaType>
            name="productId"
            title="Product"
            placeholder="Select product"
            options={PRODUCT_OPTIONS}
          />
          <InputField<WarehouseFormSchemaType>
            name="productStock"
            label="Product Stock"
            placeholder="e.g. 100"
            type="number"
          />
          <InputField<WarehouseFormSchemaType>
            name="quantity"
            label="Quantity"
            placeholder="e.g. 10"
            type="number"
          />
        </div>
      </section>

      {/* <section className="space-y-4 rounded-2xl border border-[#ECECF2] bg-[#FCFCFD] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h3 className="text-sm font-semibold text-tertiary-100">
          Address Information
        </h3>

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
            options={PROVINCE_OPTIONS}
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
      </section> */}
    </div>
  )
}
