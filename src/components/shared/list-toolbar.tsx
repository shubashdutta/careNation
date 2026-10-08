import type { ReactNode } from "react"
import { ArrowDownAZ, ArrowUpAZ, ChevronDown, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ExtendedButton from "@/components/extended-components/extended-button"
import { cn } from "@/lib/utils"
import SearchBox from "./search-box"

type SortOrder = "asc" | "desc"

interface ListToolbarProps {
  title?: string
  searchValue: string
  onSearch: (value: string) => void
  searchPlaceholder?: string
  onFilter?: () => void
  showFilter?: boolean
  sortOrder?: string
  onSortChange?: (value: SortOrder) => void
  children?: ReactNode
  actions?: ReactNode
  className?: string
  action?: ReactNode
}

const ListToolbar = ({
  title = "",
  searchValue,
  onSearch,
  searchPlaceholder = "Search",
  onFilter,
  showFilter = true,
  sortOrder,
  onSortChange,
  children,
  actions,
  className,
}: ListToolbarProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-4 py-2",
        className
      )}
    >
      {/* Left side: Title & custom children */}
      <div className="flex items-center gap-3">
        {title && (
          <h2 className="text-[20px] font-medium text-[#322A53]">{title}</h2>
        )}
        {children}
      </div>

      {/* Right side: Search, Filter, Sort, and Actions */}
      <div className="flex items-center gap-2">
        <SearchBox
          defaultValue={searchValue}
          onSearch={onSearch}
          placeholder={searchPlaceholder}
          className="w-64 rounded-lg border-gray-200 text-xs focus-within:ring-0"
        />

        {showFilter && (
          <button
            type="button"
            onClick={onFilter}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
          </button>
        )}

        {onSortChange && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ExtendedButton
                text="Sort"
                variant="outline"
                radius="medium"
                icon={<ChevronDown className="h-3.5 w-3.5" />}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 rounded-lg border border-gray-100 bg-white p-1 shadow-md"
            >
              <DropdownMenuItem
                className="cursor-pointer gap-2 py-2 text-xs"
                onClick={() => onSortChange("asc")}
              >
                <ArrowUpAZ className="h-4 w-4" />
                Ascending
                {sortOrder === "asc" && (
                  <span className="ml-auto text-primary-500">•</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer gap-2 py-2 text-xs"
                onClick={() => onSortChange("desc")}
              >
                <ArrowDownAZ className="h-4 w-4" />
                Descending
                {sortOrder === "desc" && (
                  <span className="ml-auto text-primary-500">•</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {actions}
      </div>
    </div>
  )
}

export default ListToolbar

// import type { ReactNode } from "react"
// import { ArrowDownAZ, ArrowUpAZ, ChevronDown, ListFilter } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import ExtendedButton from "@/components/extended-components/extended-button"
// import { cn } from "@/lib/utils"
// import SearchBox from "./search-box"

// type SortOrder = "asc" | "desc"

// interface ListToolbarProps {
//   searchValue: string
//   onSearch: (value: string) => void
//   searchPlaceholder?: string
//   onFilter?: () => void
//   showFilter?: boolean
//   sortOrder?: string
//   onSortChange?: (value: SortOrder) => void
//   children?: ReactNode
//   actions?: ReactNode
//   className?: string
//   action?: ReactNode
// }

// const ListToolbar = ({
//   searchValue,
//   onSearch,
//   searchPlaceholder = "Search...",
//   onFilter,
//   showFilter = true,
//   sortOrder,
//   onSortChange,
//   children,
//   actions,
//   className,
// }: ListToolbarProps) => {
//   return (
//     <div className={cn("flex flex-wrap items-center gap-3", className)}>
//       <SearchBox
//         defaultValue={searchValue}
//         onSearch={onSearch}
//         placeholder={searchPlaceholder}
//       />

//       {children}

//       {showFilter && (
//         <ExtendedButton
//           variant="outline"
//           text="Filter"
//           radius="medium"
//           icon={<ListFilter className="h-3.5 w-3.5" />}
//           onClick={onFilter}
//         />
//       )}

//       {onSortChange && (
//         <DropdownMenu>
//           <DropdownMenuTrigger>
//             <ExtendedButton
//               text="Sort"
//               variant="outline"
//               radius="medium"
//               icon={<ChevronDown className="h-3.5 w-3.5" />}
//             />
//           </DropdownMenuTrigger>
//           {/* <DropdownMenuContent
//             align="start"
//             className="w-40 rounded-lg border-none bg-white p-1 shadow-md"
//           >
//             <DropdownMenuItem
//               className="cursor-pointer gap-2 py-2"
//               onClick={() => onSortChange("asc")}
//             >
//               <ArrowUpAZ className="h-4 w-4" />
//               Ascending
//               {sortOrder === "asc" && (
//                 <span className="ml-auto text-primary-500">•</span>
//               )}
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               className="cursor-pointer gap-2 py-2"
//               onClick={() => onSortChange("desc")}
//             >
//               <ArrowDownAZ className="h-4 w-4" />
//               Descending
//               {sortOrder === "desc" && (
//                 <span className="ml-auto text-primary-500">•</span>
//               )}
//             </DropdownMenuItem>
//           </DropdownMenuContent> */}
//         </DropdownMenu>
//       )}

//       {actions}
//     </div>
//   )
// }

// export default ListToolbar
