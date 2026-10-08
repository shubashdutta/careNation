import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BreadcrumbProps {
  trail: string[]
  className?: string
  title?: string
  action?: ReactNode
}

const Breadcrumb = ({ trail, className, title, action }: BreadcrumbProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Clean White Pill Container */}
      <nav className="flex w-full items-center rounded-lg border border-gray-100/80 bg-white px-6 py-3.5">
        <ol className="flex items-center gap-2 text-xs font-normal text-gray-400">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1
            return (
              <li key={crumb} className="flex items-center gap-2">
                <span
                  className={cn(
                    "transition-colors",
                    isLast
                      ? "font-medium text-gray-500"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {crumb}
                </span>

                {/* Slash Separator */}
                {!isLast && (
                  <span className="font-light text-gray-300 select-none">
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Optional Title & Action Header Section */}
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 px-1">
          {title && (
            <h1 className="text-xl font-medium text-[#2F234F]">{title}</h1>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
    </div>
  )
}

export default Breadcrumb
