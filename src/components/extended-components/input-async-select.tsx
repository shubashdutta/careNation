import { useEffect, useState } from "react"
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"
import axiosInstance from "@/lib/axios-instance"
import AsyncSelectField, {
  type AsyncSelectLoadOptions,
  type OptionType,
} from "./async-select"

interface InputAsyncSelectProps<T extends FieldValues> {
  name: Path<T>
  title?: string | React.JSX.Element
  placeholder?: string
  loadOptions: AsyncSelectLoadOptions
  isClearable?: boolean
  isRequired?: boolean
  containerClassName?: string
  onChange?: (value: OptionType | null) => void
  showClearButton?: boolean
  disabled?: boolean
  endPoint?: string
  /** Prefills the selected label without an initial-value lookup call, e.g. when editing a row that already carries the display label. */
  defaultOption?: OptionType | null
}

const InputAsyncSelect = <T extends FieldValues>({
  name,
  title,
  placeholder = "Select",
  loadOptions,
  isClearable = true,
  isRequired = true,
  containerClassName,
  onChange,
  showClearButton,
  disabled = false,
  endPoint,
  defaultOption,
}: InputAsyncSelectProps<T>) => {
  const form = useFormContext<T>()
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    defaultOption ?? null
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedOption(defaultOption ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOption?.value])

  useEffect(() => {
    const fetchInitialValue = async () => {
      const currentValue = form.getValues(name)
      if (!currentValue || !endPoint || defaultOption) return

      try {
        const res = await axiosInstance.get(`${endPoint}${currentValue}/`)
        const data = res.data?.data
        setSelectedOption({
          label: data.name || data.full_name || data.title || String(data.id),
          value: data.id,
        })
      } catch (err) {
        console.error("Failed to fetch initial value:", err)
      }
    }

    fetchInitialValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endPoint])

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {title && (
        <Label
          htmlFor={String(name)}
          className="text-sm font-normal text-tertiary-100"
        >
          {title} {isRequired && <span className="text-destructive">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <div>
            <AsyncSelectField
              value={selectedOption}
              loadOptions={loadOptions}
              onChange={(option) => {
                setSelectedOption(option ?? null)
                field.onChange(option ? option.value : "")
                onChange?.(option ?? null)
              }}
              isClearable={isClearable}
              showClearButton={showClearButton}
              placeholder={placeholder}
              disabled={disabled}
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <p className="mt-1 text-xs text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default InputAsyncSelect
