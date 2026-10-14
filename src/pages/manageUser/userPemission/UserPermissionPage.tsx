import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"
import { Checkbox } from "@/components/ui/checkbox"

interface SubModule {
  id: string
  label: string
}

interface ModuleGroup {
  id: string
  label: string
  children: SubModule[]
}

const breadcrumbTrail = ["Dashboard", "Manage User", "User Permission"]

const USER_GROUP_OPTIONS = ["Back Office", "Front Office", "Management"]
const ROLE_OPTIONS = ["Admin", "Accountant", "Operator"]
const USER_NAME_OPTIONS = [
  "Vendor Tanaka",
  "Sunita Sapkota",
  "Khagendra Bhattrai",
]

const modules: ModuleGroup[] = [
  {
    id: "content",
    label: "Content Manager",
    children: [
      { id: "post", label: "Post/Announcement" },
      { id: "slide", label: "Slide Manager" },
    ],
  },
  {
    id: "epin",
    label: "E-Pin Manager",
    children: [
      { id: "generate", label: "Generate" },
      { id: "inout", label: "In & Out" },
      { id: "transfer", label: "Transfer List" },
      { id: "receive", label: "Receive & List" },
    ],
  },
  {
    id: "team",
    label: "Team",
    children: [
      { id: "addmember", label: "Add Member" },
      { id: "placementtree", label: "Placement Tree" },
      { id: "directmember", label: "Direct Member" },
      { id: "generation", label: "Generation" },
      { id: "allstaff", label: "All Staff" },
      { id: "teampending", label: "Team Pending" },
      { id: "directlist", label: "Direct List" },
      { id: "rankachiever", label: "Rank Achiever List" },
      { id: "sponsortree", label: "Sponsor Tree" },
      { id: "referlink", label: "Refer Link List" },
      { id: "idupgrade", label: "ID Upgrade" },
      { id: "memberlist", label: "Member List" },
      { id: "franchisedirect", label: "Franchise Direct List" },
      { id: "changeplacement", label: "Change Placement" },
    ],
  },
  {
    id: "financial",
    label: "Financial Manager",
    children: [
      { id: "paymentrequest", label: "Payment Request" },
      { id: "expressstatement", label: "Express Statement" },
    ],
  },
  {
    id: "store",
    label: "Store Manager",
    children: [
      { id: "product", label: "Product" },
      { id: "stockentry", label: "Stock Entry" },
      { id: "receivestock", label: "Receive Stock List" },
      { id: "inventoryaudit", label: "Inventory Audit" },
    ],
  },
  { id: "purchase", label: "Purchase", children: [] },
  {
    id: "reports",
    label: "Reports",
    children: [
      { id: "commissionreports", label: "Commission Reports" },
      { id: "salesreport", label: "Sales Report" },
      { id: "monthlycto", label: "Monthly CTO" },
      { id: "weeklyreport", label: "Weekly Report" },
      { id: "commissionreportm", label: "Commission Report (M)" },
      { id: "incomeaudit", label: "Income Audit" },
      { id: "tdsreport", label: "TDS Report" },
      { id: "tdspayout", label: "TDS Payout-Wise" },
      { id: "misreport", label: "MIS Report" },
      { id: "vatreport", label: "VAT Report" },
      { id: "notplaced", label: "Not Placed" },
      { id: "payouts", label: "Payouts" },
      { id: "rankachieverlist", label: "Rank Achiever" },
      { id: "productreport", label: "Product Report" },
    ],
  },
  {
    id: "setting",
    label: "Setting",
    children: [
      { id: "companysetting", label: "Company Setting" },
      { id: "bank", label: "Bank" },
      { id: "mailsetting", label: "Mail Setting" },
      { id: "generalsetting", label: "General Setting" },
    ],
  },
  {
    id: "ewallet",
    label: "E-Wallet",
    children: [
      { id: "dashboard", label: "Dashboard" },
      { id: "statement", label: "Statement" },
      { id: "sendcommission", label: "Send Commission" },
      { id: "withdrawal", label: "Withdrawal" },
    ],
  },
  { id: "support", label: "Customer Support", children: [] },
  {
    id: "manageusers",
    label: "Manage Users",
    children: [
      { id: "createusers", label: "Create Users" },
      { id: "userpermission", label: "User Permission" },
    ],
  },
]

// Seed the initial checked states to match the Figma screenshot.
const INITIAL_CHECKED: Record<string, boolean> = {
  // E-Pin Manager: parent + all children checked
  epin: true,
  generate: true,
  inout: true,
  transfer: true,
  receive: true,
  // Team: parent checked + two children checked
  team: true,
  addmember: true,
  allstaff: true,
}

const cardClass =
  "rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6"

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"

const labelClass = "mb-1.5 block text-sm font-medium text-slate-600"

const checkboxClass =
  "cursor-pointer data-checked:border-emerald-600 data-checked:bg-emerald-600 data-checked:text-white focus-visible:border-emerald-500 focus-visible:ring-emerald-500/40"

const Required = () => <span className="text-red-500">*</span>

const SelectField = ({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) => (
  <div>
    <label className={labelClass}>
      {label} <Required />
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  </div>
)

const ModuleCard = ({
  module,
  checked,
  onToggleParent,
  onToggleChild,
}: {
  module: ModuleGroup
  checked: Record<string, boolean>
  onToggleParent: (module: ModuleGroup, next: boolean) => void
  onToggleChild: (id: string, next: boolean) => void
}) => {
  const [open, setOpen] = useState(true)
  const childIds = module.children.map((child) => child.id)
  const checkedChildren = childIds.filter((id) => checked[id]).length
  const parentChecked =
    checkedChildren === childIds.length && childIds.length > 0
  const parentIndeterminate =
    checkedChildren > 0 && checkedChildren < childIds.length

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Parent Row */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/60 p-4">
        {module.children.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Collapse" : "Expand"}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-slate-400 transition-colors hover:text-slate-600"
          >
            {open ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        <Checkbox
          checked={parentChecked}
          indeterminate={parentIndeterminate}
          onCheckedChange={(next) => onToggleParent(module, Boolean(next))}
          aria-label={module.label}
          className={checkboxClass}
        />
        <span className="text-sm font-semibold text-slate-800">
          {module.label}
        </span>
      </div>

      {/* Children Grid */}
      {open && module.children.length > 0 && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-4 sm:grid-cols-3 lg:grid-cols-4">
          {module.children.map((child) => (
            <label
              key={child.id}
              className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
            >
              <Checkbox
                checked={Boolean(checked[child.id])}
                onCheckedChange={(next) =>
                  onToggleChild(child.id, Boolean(next))
                }
                aria-label={child.label}
                className={checkboxClass}
              />
              {child.label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

const UserPermissionPage = () => {
  const [userGroup, setUserGroup] = useState("")
  const [role, setRole] = useState("")
  const [userName, setUserName] = useState("")
  const [assignList, setAssignList] = useState(false)
  const [checked, setChecked] =
    useState<Record<string, boolean>>(INITIAL_CHECKED)

  const toggleParent = (module: ModuleGroup, next: boolean) => {
    setChecked((prev) => {
      const updated = { ...prev, [module.id]: next }
      module.children.forEach((child) => {
        updated[child.id] = next
      })
      return updated
    })
  }

  const toggleChild = (id: string, next: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: next }))
  }

  return (
    <div className="space-y-0">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb
        trail={breadcrumbTrail}
        title="User Permission"
        subtitle="Assign user permissions"
      />

      {/* 2. TOP SELECTION / FILTER CARD */}
      <section className={cardClass}>
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
          <SelectField
            label="User Group"
            placeholder="Select User Group"
            options={USER_GROUP_OPTIONS}
            value={userGroup}
            onChange={setUserGroup}
          />
          <SelectField
            label="Role"
            placeholder="Select Role"
            options={ROLE_OPTIONS}
            value={role}
            onChange={setRole}
          />
          <SelectField
            label="User Name"
            placeholder="User Name"
            options={USER_NAME_OPTIONS}
            value={userName}
            onChange={setUserName}
          />
          <div className="flex h-full items-end pb-2.5">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
              <Checkbox
                checked={assignList}
                onCheckedChange={(next) => setAssignList(Boolean(next))}
                aria-label="Assign Permission List"
                className={checkboxClass}
              />
              Assign Permission List
            </label>
          </div>
        </div>

        <div className="mt-5 flex justify-end border-t border-slate-100 pt-5">
          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Submit
          </button>
        </div>
      </section>

      {/* 3. PERMISSION MODULES TREE LIST */}
      <div>
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            checked={checked}
            onToggleParent={toggleParent}
            onToggleChild={toggleChild}
          />
        ))}
      </div>
    </div>
  )
}

export default UserPermissionPage
