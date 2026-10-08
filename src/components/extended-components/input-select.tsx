import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface Option {
  label: string
  value: string | number | undefined
}

interface InputSelectProps<T extends FieldValues> {
  name: Path<T>
  title?: string | React.JSX.Element
  options: Option[]
  placeholder?: string
  isRequired?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  className?: string
  defaultValue?: string | number
}

const InputSelect = <T extends FieldValues>({
  name,
  title,
  options,
  placeholder = "Select",
  isRequired = true,
  isDisabled = false,
  isLoading = false,
  className = "",
  defaultValue,
}: InputSelectProps<T>) => {
  const { control } = useFormContext<T>()

  return (
    <div>
      <Label
        htmlFor={String(name)}
        className="mb-1 text-sm font-normal text-tertiary-100"
      >
        {title} {isRequired && <span className="text-destructive">*</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as FieldValues[Path<T>] | undefined}
        render={({ field, fieldState }) => (
          <>
            <Select
              disabled={isDisabled || isLoading}
              value={
                field.value !== undefined && field.value !== ""
                  ? String(field.value)
                  : defaultValue !== undefined
                    ? String(defaultValue)
                    : null
              }
              onValueChange={(val) => {
                if (val) {
                  field.onChange(val)
                }
              }}
            >
              <SelectTrigger
                className={cn(isLoading && "cursor-wait", className)}
              >
                <SelectValue
                  placeholder={
                    isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading...
                      </span>
                    ) : (
                      placeholder
                    )
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {isLoading ? (
                  <SelectItem value="__loading" disabled>
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </span>
                  </SelectItem>
                ) : options.length === 0 ? (
                  <SelectItem value="__no-options" disabled>
                    No options found
                  </SelectItem>
                ) : (
                  options.map((opt) => (
                    <SelectItem key={opt.value} value={String(opt.value)}>
                      {opt.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            {fieldState.error && (
              <p className="mt-1 text-xs text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  )
}

export default InputSelect
