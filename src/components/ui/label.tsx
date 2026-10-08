import * as React from "react"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<"label"> & { "data-error"?: boolean }) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-1 text-sm leading-none font-normal select-none data-[error=true]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Label }
