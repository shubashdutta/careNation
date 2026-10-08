import {
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import NoData from "./no-data"

interface BaseTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  message: string
  getRowId?: (row: TData) => string
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
}

export function BaseTable<TData, TValue>({
  message,
  isLoading,
  columns,
  data,
  getRowId,
  rowSelection,
  onRowSelectionChange,
}: BaseTableProps<TData, TValue>) {
  const [searchParams] = useSearchParams()
  const perPage = searchParams.get("perPage") ?? "10"
  const location = useLocation()
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getRowId,
    enableRowSelection: Boolean(onRowSelectionChange),
    onRowSelectionChange,
    state: {
      columnFilters,
      rowSelection,
      pagination: {
        pageSize: perPage ? parseInt(perPage, 10) : 10,
        pageIndex: 0,
      },
    },
  })

  const searchText = (location?.state as { search?: string } | null)?.search

  return (
    <div className="overflow-hidden rounded-[7px] border border-[#F2F4F7] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-[#F0F2F5] bg-[#FAFAFC] hover:bg-[#FAFAFC]"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-[48px] border-r border-[#F0F2F5] px-5 py-3 text-[15px] font-normal whitespace-nowrap text-[#344054] last:border-r-0"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 bg-white text-center"
                >
                  <div className="flex items-center justify-center gap-2 py-8 text-[14px] text-[#667085]">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#f0e7fa] border-t-[#7F56D9]" />
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={
                    rowSelection && row.getIsSelected() ? "selected" : undefined
                  }
                  className={`h-10 border-b border-[#F0F2F5] transition-colors last:border-b-0 ${"bg-white"} hover:bg-[#fffffe] data-[state=selected]:bg-[#EDE9FF]`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-r border-[#F0F2F5] px-5 py-3 text-[14px] font-normal whitespace-nowrap text-[#475467] last:border-r-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 bg-white text-center"
                >
                  <NoData title={searchText || message} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
