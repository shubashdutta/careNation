import { Eye, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type RowActionsVariant = "bordered" | "plain"

const ACTION_CLASSES: Record<
  "view" | "edit" | "delete",
  Record<RowActionsVariant, string>
> = {
  view: {
    bordered: "border border-primary-100 text-primary-500 hover:bg-primary-50",
    plain: "text-primary-500",
  },
  edit: {
    bordered: "border border-tertiary-75 text-primary-500 hover:bg-primary-50",
    plain: "text-primary-500",
  },
  delete: {
    bordered:
      "border border-destructive/30 text-destructive hover:bg-destructive/10",
    plain: "text-destructive",
  },
}

interface RowActionsProps {
  entity: string
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  variant?: RowActionsVariant
  className?: string
}

const RowActions = ({
  entity,
  onView,
  onEdit,
  onDelete,
  variant = "bordered",
  className,
}: RowActionsProps) => {
  const baseClasses = cn(
    "flex shrink-0 cursor-pointer items-center justify-center",
    variant === "bordered" && "h-8 w-8 rounded-md"
  )
  const iconClasses = variant === "bordered" ? "h-3.5 w-3.5" : "h-4 w-4"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {onView && (
        <button
          type="button"
          aria-label={`View ${entity}`}
          onClick={onView}
          className={cn(baseClasses, ACTION_CLASSES.view[variant])}
        >
          <Eye className={iconClasses} />
        </button>
      )}
      {onEdit && (
        <button
          type="button"
          aria-label={`Edit ${entity}`}
          onClick={onEdit}
          className={cn(baseClasses, ACTION_CLASSES.edit[variant])}
        >
          <Pencil className={iconClasses} />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          aria-label={`Delete ${entity}`}
          onClick={onDelete}
          className={cn(baseClasses, ACTION_CLASSES.delete[variant])}
        >
          <Trash2 className={iconClasses} />
        </button>
      )}
    </div>
  )
}

export default RowActions
