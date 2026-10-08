import React from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import type { LoadOptions } from "react-select-async-paginate"
import type {
  ControlProps,
  GroupBase,
  OptionProps,
  StylesConfig,
} from "react-select"
import { RxCross2 } from "react-icons/rx"

export type OptionType = {
  label: string
  value: string
}

export type AsyncSelectAdditional = { page: number }

export type AsyncSelectLoadOptions = LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  AsyncSelectAdditional
>

interface AsyncSelectFieldProps {
  placeholder?: string
  disabled?: boolean
  value: OptionType | null
  onChange: (value: OptionType | null) => void
  loadOptions: AsyncSelectLoadOptions
  isClearable?: boolean
  showClearButton?: boolean
  customStyles?: StylesConfig<OptionType, false, GroupBase<OptionType>>
  customComponents?: Record<string, unknown>
  error?: boolean
  placeholderFontSize?: string
  backgroundColor?: string
  borderRadius?: string
  height?: string
}

const AsyncSelectField: React.FC<AsyncSelectFieldProps> = ({
  placeholder = "Select an option",
  disabled = false,
  value,
  onChange,
  loadOptions,
  isClearable = true,
  showClearButton = true,
  customStyles,
  customComponents,
  placeholderFontSize,
  backgroundColor,
  borderRadius,
  height,
  error = false,
}) => {
  const defaultStyles: StylesConfig<
    OptionType,
    false,
    GroupBase<OptionType>
  > = {
    control: (base, state: ControlProps<OptionType, false>) => ({
      ...base,
      minWidth: "200px",
      minHeight: height || "40px",
      paddingLeft: "6px",
      borderRadius: borderRadius || "6px",
      fontSize: "14px",
      backgroundColor: backgroundColor || "rgba(211, 212, 214, 0.2)",
      border: state.isFocused
        ? "1px solid #8b5cf6"
        : error
          ? "1px solid #dc2626"
          : "1px solid #D3D4D6",
      boxShadow: "none",
      outline: "0px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      "&:hover": {
        boxShadow: "none",
      },
    }),
    option: (base, state: OptionProps<OptionType, false>) => ({
      ...base,
      fontSize: "14px",
      cursor: "pointer",
      color: state.isSelected ? "#581c87" : "#111827",
      backgroundColor: state.isFocused ? "#f5f2ff" : "transparent",
      "&:active": {
        backgroundColor: "#f5f2ff",
      },
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: placeholderFontSize || "14px",
      color: "#C8C8C8",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
      pointerEvents: "auto",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#6B7280",
      marginRight: "8px",
    }),
  }

  const defaultComponents = {
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
  }

  return (
    <div className="relative w-full">
      <AsyncPaginate
        menuPlacement="auto"
        debounceTimeout={300}
        isDisabled={disabled}
        defaultOptions
        placeholder={placeholder}
        value={value}
        onChange={(option) => onChange(option ?? null)}
        loadOptions={loadOptions}
        additional={{ page: 1 }}
        isClearable={isClearable}
        styles={customStyles || defaultStyles}
        components={customComponents || defaultComponents}
      />

      {showClearButton && value && (
        <button
          type="button"
          className="absolute top-1/2 right-9 -translate-y-1/2 cursor-pointer focus:outline-none"
          onClick={() => onChange(null)}
        >
          <RxCross2 size={17} color="#6B7280" />
        </button>
      )}
    </div>
  )
}

export default AsyncSelectField
