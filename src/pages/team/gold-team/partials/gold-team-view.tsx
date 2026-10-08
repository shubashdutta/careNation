import type { ColumnDef } from "@tanstack/react-table"
import { Download, List, Printer, Search } from "lucide-react"
import { BaseTable } from "@/components/shared/base-table"
import type { IGoldTeam, IGoldTeamMember } from "../type"

interface GoldTeamViewProps {
  team: IGoldTeam
  teamLabel?: "Gold" | "Diamond"
}

const columns: ColumnDef<IGoldTeamMember>[] = [
  {
    id: "serialNumber",
    header: () => <List className="mx-auto h-4 w-4 text-[#64748B]" />,
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },
  { header: "DOJ", accessorKey: "doj" },
  { header: "ID", accessorKey: "userId" },
  { header: "Name", accessorKey: "name" },
  { header: "Sponsor ID", accessorKey: "sponsorId" },
  { header: "Placement ID", accessorKey: "placementId" },
  { header: "Placement", accessorKey: "placement" },
  { header: "Business", accessorKey: "business" },
  { header: "Rank/Club", accessorKey: "rankClub" },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => (
      <span className="text-[#00A86B]">• {String(getValue() || "Solved")}</span>
    ),
  },
]

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="grid grid-cols-[minmax(150px,1fr)_minmax(0,2fr)] gap-3 text-xs text-[#6B7280]">
    <span>{label}</span>
    <span className="truncate text-[#7B7B7B]">: {value || "-"}</span>
  </div>
)

export const GoldTeamView = ({
  team,
  teamLabel = "Gold",
}: GoldTeamViewProps) => {
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
            {teamLabel} Team List
          </h2>
          <div className="flex items-center gap-2">
            <label className="flex h-9 w-56 items-center gap-2 rounded-lg border border-[#E5E7EB] px-3 text-xs text-[#9CA3AF]">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </label>
            <button
              type="button"
              aria-label={`Download ${teamLabel.toLowerCase()} team`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#4B5563] transition-colors hover:bg-[#F8FAFC]"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={`Print ${teamLabel.toLowerCase()} team`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#4B5563] transition-colors hover:bg-[#F8FAFC]"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>
        <BaseTable
          message="No team 1 members found"
          data={members}
          columns={columns}
          getRowId={(row) => row.id || row.userId || row.name || "member"}
        />
      </section>
    </div>
  )
}

export default GoldTeamView
