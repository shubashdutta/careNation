import type { IPaginationDataType } from "@/lib/type"
import type {
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
} from "@tanstack/react-table"
import Pagination from "./pagination"
import { BaseTable } from "./base-table"

interface ITableWithPaginationProps<T> {
  message: string
  data: T[]
  isLoading: boolean
  columns: ColumnDef<T>[]
  paginationData?: IPaginationDataType
  getRowId?: (row: T) => string
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
}

const TableWithPagination = <T,>({
  message,
  data,
  isLoading,
  columns,
  paginationData,
  getRowId,
  rowSelection,
  onRowSelectionChange,
}: ITableWithPaginationProps<T>) => {
  return (
    console.log("paginationData", paginationData),
    (
      <div className="space-y-4">
        <BaseTable<T, unknown>
          message={message}
          data={data}
          isLoading={isLoading}
          columns={columns}
          getRowId={getRowId}
          rowSelection={rowSelection}
          onRowSelectionChange={onRowSelectionChange}
        />

        {paginationData?.totalRecords ? (
          <Pagination
            currentPage={paginationData.currentPage}
            totalCount={paginationData.totalRecords}
            totalPages={paginationData.totalPages}
          />
        ) : null}
      </div>
    )
  )
}

export default TableWithPagination
