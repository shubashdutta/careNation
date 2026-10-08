import { Warehouse as WarehouseIcon } from "lucide-react"
import type { IWarehouse } from "../type"

const ViewWarehouse = ({ warehouse }: { warehouse: IWarehouse }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100">
          <WarehouseIcon className="h-6 w-6 text-tertiary-300" />
        </div>
        <div>
          <p className="text-lg font-medium text-tertiary-100">
            {warehouse.name}
          </p>
          <p className="text-sm text-tertiary-300">{warehouse.code}</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-500">
          {warehouse.type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            Description
          </p>
          <p className="text-sm text-tertiary-100">
            {warehouse.description || "—"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            Contact Name
          </p>
          <p className="text-sm text-tertiary-100">
            {warehouse?.contact?.contactName || "—"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            Contact Email
          </p>
          <p className="text-sm text-tertiary-100">
            {warehouse?.contact?.contactEmail || "—"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            Contact Phone
          </p>
          <p className="text-sm text-tertiary-100">
            {warehouse?.contact?.contactPhone || "—"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            Primary Contact
          </p>
          <p className="text-sm text-tertiary-100">
            {warehouse?.contact?.isPrimary ? "Yes" : "No"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            City
          </p>
          <p className="text-sm text-tertiary-100">{warehouse?.address?.city || "—"}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            State
          </p>
          <p className="text-sm text-tertiary-100">{warehouse?.address?.state || "—"}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            Postal Code
          </p>
          <p className="text-sm text-tertiary-100">
            {warehouse?.address?.postalCode || "—"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            Country
          </p>
          <p className="text-sm text-tertiary-100">{warehouse?.address?.country || "—"}</p>
        </div>
        <div className="col-span-2">
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            Address Line 1
          </p>
          <p className="text-sm text-tertiary-100">
            {warehouse?.address?.addressLine1 || "—"}
          </p>
        </div>
        <div className="col-span-2">
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            Address Line 2
          </p>
          <p className="text-sm text-tertiary-100">
            {warehouse?.address?.addressLine2 || "—"}
          </p>
        </div>
        <div className="col-span-2">
          <p className="mb-1 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
            Map URL
          </p>
          {warehouse?.address?.mapUrl ? (
            <a
              href={warehouse?.address?.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="truncate text-sm text-primary-500 hover:underline"
            >
              {warehouse?.address?.mapUrl}
            </a>
          ) : (
            <p className="text-sm text-tertiary-100">—</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewWarehouse
