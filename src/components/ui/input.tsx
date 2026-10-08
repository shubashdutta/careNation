import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-md border border-[#D3D4D6] bg-[#D3D4D6]/20 px-3 py-2 text-sm text-tertiary-100 outline-none transition-colors placeholder:text-[#C8C8C8] focus:border-primary-400 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
