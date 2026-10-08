import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Plus, Pencil, Search, Trash2 } from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"
import ListToolbar from "@/components/shared/list-toolbar"
import ExtendedButton from "@/components/extended-components/extended-button"
import ExtendedDialog from "@/components/extended-components/extended-dialog"
import ExtendedForm from "@/components/extended-components/extended-form"
import { InputImage } from "@/components/extended-components/input-image"
import { InputField } from "@/components/extended-components/extended-input"
import { InputTextarea } from "@/components/extended-components/input-textarea"
import { BaseTable } from "@/components/shared/base-table"
import useSearch from "@/hooks/use-search"
import type { ColumnDef } from "@tanstack/react-table"

const breadcrumbTrail = ["Home", "Settings", "Policy"]

type PolicyFormValues = {
  policyImage: File | string | null
  policyName: string
  policyDescription: string
}

type PolicyRecord = {
  id: string
  icon: string
  policyName: string
  description: string
}

const initialPolicies: PolicyRecord[] = [
  {
    id: "policy-privacy",
    icon: "Privacy",
    policyName: "Privacy Policy",
    description:
      "The information provided by you are safe and directly store in secure database for only you better experience with us",
  },
  {
    id: "policy-terms",
    icon: "Terms",
    policyName: "Terms & Conditions",
    description:
      "The information provided by you are safe and directly store in secure database for only you better experience with us",
  },
  {
    id: "policy-return",
    icon: "Return",
    policyName: "Return & Refund",
    description:
      "The information provided by you are safe and directly store in secure database for only you better experience with us",
  },
  {
    id: "policy-shipping",
    icon: "Shipping",
    policyName: "Shipping Policy",
    description:
      "The information provided by you are safe and directly store in secure database for only you better experience with us",
  },
  {
    id: "policy-payment",
    icon: "Payment",
    policyName: "Payment Policy",
    description:
      "The information provided by you are safe and directly store in secure database for only you better experience with us",
  },
  {
    id: "policy-warranty",
    icon: "Warranty",
    policyName: "Warranty Policy",
    description:
      "The information provided by you are safe and directly store in secure database for only you better experience with us",
  },
]

const POLICY_COLUMNS: ColumnDef<PolicyRecord>[] = [
  {
    id: "sn",
    header: "S/N",
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },
  {
    header: "Icon",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    cell: () => (
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
        <Search className="h-4 w-4 rotate-45" />
      </div>
    ),
  },
  {
    header: "Policy Name",
    accessorKey: "policyName",
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <p className="max-w-[560px] text-sm text-tertiary-300">
        {row.original.description}
      </p>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: () => (
      <div className="flex items-center gap-3 text-tertiary-300">
        <button type="button" className="hover:text-primary-500">
          <Pencil className="h-4 w-4" />
        </button>
        <button type="button" className="hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
]

const PolicySettings = () => {
  const { search, handleSearch } = useSearch()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [policies, setPolicies] = useState<PolicyRecord[]>(initialPolicies)

  const filteredPolicies = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return policies

    return policies.filter((policy) =>
      [policy.policyName, policy.description].some((value) =>
        value.toLowerCase().includes(query)
      )
    )
  }, [policies, search])

  const form = useForm<PolicyFormValues>({
    defaultValues: {
      policyImage: null,
      policyName: "",
      policyDescription: "",
    },
  })

  const openAddModal = () => {
    form.reset({
      policyImage: null,
      policyName: "",
      policyDescription: "",
    })
    setIsAddOpen(true)
  }

  const onSubmit = (values: PolicyFormValues) => {
    setPolicies((current) => [
      {
        id: `policy-${Date.now()}`,
        icon: "Policy",
        policyName: values.policyName,
        description: values.policyDescription,
      },
      ...current,
    ])
    setIsAddOpen(false)
    form.reset()
  }

  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Policy" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ListToolbar
          searchValue={search}
          onSearch={handleSearch}
          searchPlaceholder="Search Product..."
          showFilter={false}
          className="flex-1"
        />

        <ExtendedButton
          text="New Policy"
          radius="medium"
          icon={<Plus className="h-3.5 w-3.5" />}
          onClick={openAddModal}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#ECECF2] bg-white shadow-sm">
        <BaseTable<PolicyRecord, unknown>
          data={filteredPolicies}
          columns={POLICY_COLUMNS}
          message="No policy found"
          isLoading={false}
        />
      </div>

      <ExtendedDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Add Policy"
        className="max-w-5xl"
      >
        <ExtendedForm
          form={form}
          onSubmit={onSubmit}
          onClose={() => setIsAddOpen(false)}
          submitText="Create"
          cancelText="Cancel"
        >
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
              <InputImage<PolicyFormValues>
                name="policyImage"
                title="Upload Policy Type Image"
                accept=".jpg,.jpeg,.png,.svg"
                maxSizeMb={10}
                className="h-full"
              />

              <div className="space-y-4 rounded-2xl border border-[#ECECF2] bg-[#F8F9FC] p-4">
                <InputField<PolicyFormValues>
                  name="policyName"
                  label="Policy Name"
                  placeholder="Enter Name"
                />

                <div className="rounded-2xl border border-[#ECECF2] bg-white p-3">
                  <div className="mb-3 flex items-center gap-2 border-b border-[#ECECF2] pb-2 text-tertiary-300">
                    <span className="rounded-md bg-[#F4ECFF] px-2 py-1 text-xs text-primary-500">
                      Normal
                    </span>
                    <span className="text-sm font-semibold">B</span>
                    <span className="text-sm italic">I</span>
                    <span className="text-sm underline">U</span>
                    <span className="text-sm">“ ”</span>
                  </div>
                  <InputTextarea<PolicyFormValues>
                    name="policyDescription"
                    label="Policy"
                    placeholder="Write policy content"
                    rows={11}
                    className="border-0 p-0 shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </ExtendedForm>
      </ExtendedDialog>
    </div>
  )
}

export default PolicySettings
