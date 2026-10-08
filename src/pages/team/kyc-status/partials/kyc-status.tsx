import { useState } from "react"
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table"
import { Download, FileText, Filter, List, Printer } from "lucide-react"
import { toast } from "react-toastify"
import { useNavigate, type NavigateFunction } from "react-router-dom"
import { Checkbox } from "@/components/ui/checkbox"
import { PATH } from "@/constant/path"
import ListToolbar from "@/components/shared/list-toolbar"
import RowActions from "@/components/shared/row-actions"
import TableWithPagination from "@/components/shared/table-with-pagination"
import useSearch from "@/hooks/use-search"
import type { IPaginationDataType } from "@/lib/type"
import type { IKycMember } from "../type"

const MOCK_KYC_MEMBERS: IKycMember[] = [
  {
    id: "kyc-1",
    dateApplied: "20/08/2024",
    userId: "9856453856",
    name: "Oral Product",
    phoneNumber: "9827760668",
    document: "Pan",
    documentNumber: "988556328",
    status: "Active",
  },
  {
    id: "kyc-2",
    dateApplied: "20/08/2024",
    userId: "984443545",
    name: "Name",
    phoneNumber: "9827766068",
    document: "pan",
    documentNumber: "98-74-56328",
    status: "Active",
  },
  {
    id: "kyc-3",
    dateApplied: "20/08/2024",
    userId: "9875256453",
    name: "Oral Product",
    phoneNumber: "9827766068",
    document: "PAN",
    documentNumber: "98-7456328",
    status: "Not Active",
  },
  {
    id: "kyc-4",
    dateApplied: "20/08/2024",
    userId: "9827765343",
    name: "Name",
    phoneNumber: "9827766068",
    document: "pan",
    documentNumber: "98-74-56328",
    status: "Not Active",
  },
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
  recordShown: 4,
}

const columns = (navigate: NavigateFunction): ColumnDef<IKycMember>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(value)}
        aria-label="Select all KYC members"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(value)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
    enableSorting: false,
  },
  {
    id: "serialNumber",
    header: () => <List className="mx-auto h-3.5 w-3.5 text-[#64748B]" />,
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },
  { header: "Date of Applied", accessorKey: "dateApplied" },
  { header: "User ID", accessorKey: "userId" },
  { header: "Name", accessorKey: "name" },
  { header: "Phone No.", accessorKey: "phoneNumber" },
  {
    header: "Document",
    accessorKey: "document",
    cell: ({ row }) => (
      <span className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-[#7B7B7B]" />
        {row.original.document}
      </span>
    ),
  },
  { header: "Document No.", accessorKey: "documentNumber" },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status === "Active" ? "text-[#00A86B]" : "text-[#EF4444]"
        }
      >
        • {row.original.status}
      </span>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <RowActions
        entity="KYC member"
        variant="plain"
        onView={() => toast.info(`Viewing ${row.original.name}`)}
        onEdit={() =>
          navigate(PATH.team.editKyc.replace(":id", row.original.id))
        }
      />
    ),
    enableSorting: false,
  },
]

const KycStatusContent = () => {
  const navigate = useNavigate()
  const { search, handleSearch } = useSearch()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  return (
    <section className="space-y-4 rounded-lg bg-white p-5 shadow-sm">
      <ListToolbar
        title="Member List"
        searchValue={search}
        onSearch={handleSearch}
        searchPlaceholder="Search"
        showFilter={false}
        actions={
          <>
            <button
              type="button"
              aria-label="Filter KYC members"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Download KYC members"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Print KYC members"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            >
              <Printer className="h-4 w-4" />
            </button>
          </>
        }
      />
      <TableWithPagination
        message="No KYC members found"
        data={MOCK_KYC_MEMBERS}
        isLoading={false}
        columns={columns(navigate)}
        paginationData={paginationData}
        getRowId={(row) => row.id}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
    </section>
  )
}

export default KycStatusContent
