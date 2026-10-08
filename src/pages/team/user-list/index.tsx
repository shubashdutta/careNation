import { useState } from "react"
import type { RowSelectionState } from "@tanstack/react-table"
import TableWithPagination from "@/components/shared/table-with-pagination"
import ListToolbar from "@/components/shared/list-toolbar"
import Breadcrumb from "@/components/shared/breadcrumb"
import useSearch from "@/hooks/use-search"
import AddFile from "./components/add-file"
import useGetFiles from "./hooks/use-get-file"
import { useUserColumns } from "./columns"

const breadcrumbTrail = ["Home", "Product Management", "File"]

const UserList = () => {
  const columns = useUserColumns()
  const { search, handleSearch } = useSearch()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const { data, isLoading } = useGetFiles()

  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="User List" />
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <AddFile />
      </div>
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <ListToolbar
          title="Distributor List"
          searchValue={search}
          onSearch={handleSearch}
          searchPlaceholder="Search User..."
        />

        <TableWithPagination
          message="No Users found"
          data={data?.records ?? []}
          isLoading={isLoading}
          columns={columns}
          paginationData={data}
          getRowId={(row) => row.id}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    </div>
  )
}

export default UserList
