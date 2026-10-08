import { useState } from "react"
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table"
import { Download, List, Printer, Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import ExtendedForm from "@/components/extended-components/extended-form"
import GoldTeamForm from "@/pages/team/gold-team/partials/gold-team-form"
import useAdGoldTeam from "@/pages/team/gold-team/hooks/use-gold-team"
import {
  GoldTeamSchema,
  type GoldTeamSchemaType,
} from "@/pages/team/gold-team/schema"
import TableWithPagination from "@/components/shared/table-with-pagination"
import type { IPaginationDataType } from "@/lib/type"
import type { IGoldTeam, IGoldTeamMember } from "@/pages/team/gold-team/type"

const columns: ColumnDef<IGoldTeamMember>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(value)}
        aria-label="Select all referral members"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(value)}
        aria-label={`Select ${row.original.name || "referral member"}`}
      />
    ),
    enableSorting: false,
  },
  {
    id: "serialNumber",
    header: () => <List className="mx-auto h-4 w-4 text-[#64748B]" />,
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },
  { header: "Username", accessorKey: "userId" },
  { header: "Name", accessorKey: "name" },
  { header: "Package", accessorKey: "package" },
  { header: "Doj", accessorKey: "doj" },
  { header: "Mobile", accessorKey: "mobile" },
  { header: "Email ID", accessorKey: "emailId" },
  { header: "Directs", accessorKey: "directs" },
  { header: "Placement ID", accessorKey: "placementId" },
  { header: "Placement", accessorKey: "placement" },
]

const paginationData: IPaginationDataType = {
  limit: 5,
  currentPage: 1,
  next: null,
  prev: null,
  totalPages: 1,
  totalRecords: 20,
  pagingCounter: 1,
  hasPrevious: false,
  hasNext: false,
  recordShown: 1,
}

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="grid grid-cols-[minmax(150px,1fr)_minmax(0,2fr)] gap-3 text-xs text-[#6B7280]">
    <span>{label}</span>
    <span className="truncate text-[#7B7B7B]">: {value || "-"}</span>
  </div>
)

const ReferralResult = ({ team }: { team: IGoldTeam }) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const members = team.members ?? [team]

  return (
    <div className="space-y-4">
      <section className="rounded-lg bg-white p-5">
        <h2 className="mb-5 text-[15px] font-medium text-[#322A53]">
          Distributor Detail
        </h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-x-16">
          <div className="space-y-4">
            <DetailItem label="User ID" value={team.userId || team.id} />
            <DetailItem label="Date Of Joining" value={team.dateOfJoining} />
            <DetailItem
              label="Introducer User ID"
              value={team.introducerUserId}
            />
          </div>
          <div className="space-y-4">
            <DetailItem label="Name" value={team.name} />
            <DetailItem label="Designation" value={team.designation} />
            <DetailItem label="Introducer Name" value={team.introducerName} />
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[15px] font-medium text-[#322A53]">
            Referral List
          </h2>
          <div className="flex items-center gap-2">
            <label className="flex h-9 w-56 items-center gap-2 rounded-lg border border-[#E5E7EB] px-3 text-xs text-[#9CA3AF]">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </label>
            <button
              type="button"
              aria-label="Download referral list"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F8FAFC]"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Print referral list"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F8FAFC]"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>
        <TableWithPagination
          message="No referrals found"
          data={members}
          isLoading={false}
          columns={columns}
          paginationData={paginationData}
          getRowId={(row) => row.id || row.userId || row.name || "member"}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </section>
    </div>
  )
}

const ReferralListContent = () => {
  const form = useForm<GoldTeamSchemaType>({
    resolver: zodResolver(GoldTeamSchema),
    defaultValues: { userId: "" },
  })
  const { AdGoldTeam, isPending, treeData } = useAdGoldTeam("Referral")

  return treeData ? (
    <ReferralResult team={treeData} />
  ) : (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <ExtendedForm
        form={form}
        onSubmit={(data) => AdGoldTeam(data)}
        submitText="Submit"
        cancelText="Cancel"
        submitBtnType="submit"
        isSubmitting={isPending}
      >
        <GoldTeamForm />
      </ExtendedForm>
    </section>
  )
}

export default ReferralListContent
