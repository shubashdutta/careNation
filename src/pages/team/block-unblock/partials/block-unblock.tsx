//@ts-nocheck
import { useState } from "react"
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table"
import { Download, List, Pencil, Printer, Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { Checkbox } from "@/components/ui/checkbox"
import ExtendedForm from "@/components/extended-components/extended-form"
import { InputField } from "@/components/extended-components/extended-input"
import ListToolbar from "@/components/shared/list-toolbar"
import TableWithPagination from "@/components/shared/table-with-pagination"
import type { IPaginationDataType } from "@/lib/type"
import useBlockUnblock from "../hooks/use-block-unblock"
import { BlockUnblockSchema, type BlockUnblockSchemaType } from "../schema"
import type { IBlockedMember } from "../type"

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
  recordShown: 6,
}

const columns: ColumnDef<IBlockedMember>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(value)}
        aria-label="Select all blocked members"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(value)}
        aria-label={`Select ${row.original.uniqueId}`}
      />
    ),
    enableSorting: false,
  },
  {
    id: "serialNumber",
    header: () => <List className="mx-auto h-4 w-4 text-[#64748B]" />,
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },
  { header: "Join Date", accessorKey: "joinDate" },
  { header: "Unique ID", accessorKey: "uniqueId" },
  { header: "Mobile", accessorKey: "mobile" },
  { header: "Password", accessorKey: "password" },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <span className="text-[#EF476F]">• {row.original.status}</span>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <button
        type="button"
        aria-label={`Edit ${row.original.uniqueId}`}
        className="text-[#7B7B7B] hover:text-primary-500"
        onClick={() => toast.info(`Editing ${row.original.uniqueId}`)}
      >
        <Pencil className="h-4 w-4" />
      </button>
    ),
    enableSorting: false,
  },
]

const BlockMembersTable = ({ members }: { members: IBlockedMember[] }) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  return (
    <section className="rounded-lg bg-white p-5 shadow-sm">
      <ListToolbar
        title="Block Member:"
        searchValue=""
        onSearch={() => undefined}
        searchPlaceholder="Search"
        showFilter={false}
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Download blocked members"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Print blocked members"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        }
      />
      <TableWithPagination
        message="No blocked members found"
        data={members}
        isLoading={false}
        columns={columns}
        paginationData={paginationData}
        getRowId={(row) => row.id}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="rounded-md bg-[#EDE5FF] px-5 py-2 text-sm font-medium text-primary-500 hover:bg-[#E4D8FF]"
          onClick={() => toast.success("Selected members unblocked")}
        >
          Unblock
        </button>
        <button
          type="button"
          className="rounded-md bg-[#EDE5FF] px-5 py-2 text-sm font-medium text-[#EF476F] hover:bg-[#F8DCE5]"
          onClick={() => toast.success("Selected members blocked")}
        >
          block
        </button>
      </div>
    </section>
  )
}

const BlockUnblockContent = () => {
  const form = useForm<BlockUnblockSchemaType>({
    resolver: zodResolver(BlockUnblockSchema),
    defaultValues: { userId: "" },
  })
  const { isPending, loadMembers, members } = useBlockUnblock()

  return (
    <div className="space-y-4">
      <section className="rounded-lg bg-white p-5 shadow-sm">
        <ExtendedForm
          form={form}
          onSubmit={loadMembers}
          submitText="Submit"
          cancelText="Cancel"
          submitBtnType="submit"
          isSubmitting={isPending}
          className="gap-2"
        >
          <div>
            <h2 className="text-[15px] font-medium text-[#322A53]">User Id</h2>
            <p className="text-xs text-[#A0AEC0]">
              Enter number Id to search user
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <InputField
              name="userId"
              label="User Name"
              placeholder="User Name"
              className="h-9 border-primary-400 bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-300"
            />
          </div>
        </ExtendedForm>
      </section>
      {members && <BlockMembersTable members={members} />}
    </div>
  )
}

export default BlockUnblockContent
