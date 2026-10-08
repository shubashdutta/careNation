import * as React from "react"
import { Progress as BaseProgress } from "@base-ui/react/progress"
import { cn } from "@/lib/utils"

interface ProgressProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseProgress.Root>,
  "value"
> {
  value?: number | null
  indicatorClassName?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, indicatorClassName, value = 0, ...props }, ref) => {
    const normalizedValue = value ?? 0

    return (
      <BaseProgress.Root
        ref={ref}
        value={normalizedValue}
        className={cn(
          "relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100",
          className
        )}
        {...props}
      >
        <BaseProgress.Track className="h-full w-full">
          <BaseProgress.Indicator
            className={cn(
              "h-full bg-purple-600 transition-all duration-300",
              indicatorClassName
            )}
            style={{ width: `${Math.min(Math.max(normalizedValue, 0), 100)}%` }}
          />
        </BaseProgress.Track>
      </BaseProgress.Root>
    )
  }
)

Progress.displayName = "Progress"

export { Progress }
