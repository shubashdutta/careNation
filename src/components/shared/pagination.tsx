import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "../ui/button"

interface PaginationProps {
  totalPages?: number
  totalCount?: number
  currentPage?: number
}

const Pagination = ({
  totalPages = 0,
  totalCount = 0,
  currentPage = 1,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const itemsPerPage = useMemo(
    () => parseInt(searchParams.get("perPage") || "10", 10),
    [searchParams]
  )

  const initialPage = useMemo(
    () => parseInt(searchParams.get("page") || currentPage.toString(), 10),
    [searchParams, currentPage]
  )

  const [page, setPage] = useState(initialPage)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(initialPage)
  }, [initialPage])

  const goToPage = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages) return
    const newParams = new URLSearchParams(searchParams)
    newParams.set("page", targetPage.toString())
    setSearchParams(newParams)
  }

  const startItem = (page - 1) * itemsPerPage + 1
  const endItem = Math.min(page * itemsPerPage, totalCount)

  return (
    <div className="my-6 flex items-center justify-between px-4">
      <div className="text-sm text-tertiary-300">
        {totalCount > 0
          ? `${startItem}-${endItem} of ${totalCount}`
          : "0 results"}
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-primary-500 font-bold text-white hover:bg-primary-600 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1 text-base font-normal">
          <span className="text-primary-500">{page}</span>/
          <span>{totalPages}</span>
        </div>

        <Button
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-primary-500 font-bold text-white hover:bg-primary-600 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
