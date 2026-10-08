import { useState } from "react"
import type { RowSelectionState } from "@tanstack/react-table"
import TableWithPagination from "@/components/shared/table-with-pagination"
import ListToolbar from "@/components/shared/list-toolbar"
import Breadcrumb from "@/components/shared/breadcrumb"
import useSearch from "@/hooks/use-search"
import { useFileColumns } from "./columns"
import AddFile from "./components/add-file"
import useGetFiles from "./hooks/use-get-file"

const breadcrumbTrail = ["Home", "Product Management", "File"]

const FileManager = () => {
  const columns = useFileColumns()
  const { search, handleSearch } = useSearch()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const { data, isLoading } = useGetFiles()

  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="File" />
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <AddFile />
      </div>
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <ListToolbar
          title="Upload File List"
          searchValue={search}
          onSearch={handleSearch}
          searchPlaceholder="Search File..."
        />

        <TableWithPagination
          message="No Files found"
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

export default FileManager
