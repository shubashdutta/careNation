import { useState } from "react"
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form"
import { Check, ChevronDown, Loader2, X } from "lucide-react"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"
import { useClickOutside } from "@/hooks/use-click-outside"

interface Option {
  label: string
  value: string
}

interface InputMultiSelectProps<T extends FieldValues> {
  name: Path<T>
  title?: string | React.JSX.Element
  options: Option[]
  placeholder?: string
  isRequired?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  className?: string
}

const InputMultiSelect = <T extends FieldValues>({
  name,
  title,
  options,
  placeholder = "Select",
  isRequired = true,
  isDisabled = false,
  isLoading = false,
  className = "",
}: InputMultiSelectProps<T>) => {
  const { control } = useFormContext<T>()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

  return (
    <div ref={ref} className="relative">
      {title && (
        <Label className="mb-1 text-sm font-normal text-tertiary-100">
          {title} {isRequired && <span className="text-destructive">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const selected: string[] = Array.isArray(field.value)
            ? field.value
            : []

          const toggleValue = (value: string) => {
            if (selected.includes(value)) {
              field.onChange(selected.filter((v) => v !== value))
            } else {
              field.onChange([...selected, value])
            }
          }

          const removeValue = (value: string) => {
            field.onChange(selected.filter((v) => v !== value))
          }

          return (
            <>
              <div
                onClick={() =>
                  !isDisabled && !isLoading && setIsOpen((o) => !o)
                }
                className={cn(
                  "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border border-tertiary-75 bg-transparent px-3 py-1.5 text-sm",
                  isDisabled || isLoading
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer",
                  fieldState.error && "border-destructive",
                  className
                )}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 text-tertiary-300">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </span>
                ) : selected.length === 0 ? (
                  <span className="text-tertiary-300">{placeholder}</span>
                ) : (
                  selected.map((value) => {
                    const option = options.find((opt) => opt.value === value)
                    return (
                      <span
                        key={value}
                        className="flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-500"
                      >
                        {option?.label ?? value}
                        {!isDisabled && (
                          <button
                            type="button"
                            aria-label={`Remove ${option?.label ?? value}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              removeValue(value)
                            }}
                            className="cursor-pointer text-primary-500 hover:text-primary-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </span>
                    )
                  })
                )}
                <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-tertiary-300" />
              </div>

              {isOpen && !isDisabled && !isLoading && (
                <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border border-tertiary-75 bg-white p-1 shadow-md">
                  {options.length === 0 ? (
                    <p className="px-3 py-2 text-sm text-tertiary-300">
                      No options found
                    </p>
                  ) : (
                    options.map((opt) => {
                      const isSelected = selected.includes(opt.value)
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => toggleValue(opt.value)}
                          className={cn(
                            "flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-left text-sm hover:bg-primary-50",
                            isSelected && "text-primary-500"
                          )}
                        >
                          {opt.label}
                          {isSelected && <Check className="h-3.5 w-3.5" />}
                        </button>
                      )
                    })
                  )}
                </div>
              )}

              {fieldState.error && (
                <p className="mt-1 text-xs text-destructive">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )
        }}
      />
    </div>
  )
}

export default InputMultiSelect
