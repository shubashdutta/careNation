import * as React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface ButtonProps {
  text?: string
  variant?:
    "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
  type?: "button" | "submit"
  isLoading?: boolean
  onClick?: () => void
  disabled?: boolean
  loadingText?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  radius?: "medium" | "large" | "small"
  variantType?:
    | "destructive-outline"
    | "normal-outline"
    | "dark-outline"
    | "filter"
    | "soft"
    | ""
  size?: "small" | "normal" | "large"
}

const RADIUS_CLASSES: Record<NonNullable<ButtonProps["radius"]>, string> = {
  small: "rounded-[8px]",
  medium: "rounded-[10px]",
  large: "rounded-full",
}

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  small: "h-7",
  normal: "h-11",
  large: "h-12",
}

const VARIANT_TYPE_CLASSES: Record<string, string> = {
  "destructive-outline":
    "cursor-pointer shadow-none border border-destructive text-destructive bg-transparent hover:bg-destructive hover:text-white",
  "normal-outline":
    "cursor-pointer shadow-none border border-tertiary-100 text-tertiary-300 bg-transparent hover:bg-primary-50 hover:border-gray-200 hover:text-black text-xs ",
  "dark-outline":
    "cursor-pointer shadow-none border border-tertiary-100 text-tertiary-75 bg-transparent hover:bg-[#F7F7F7] hover:border-tertiary-100  text-xs ",
  filter:
    "cursor-pointer shadow-none border border-tertiary-50 text-tertiary-300 bg-transparent hover:bg-primary-50 hover:border-tertiary-50 hover:text-tertiary-300 text-xs ",
  soft: "cursor-pointer shadow-none border-none bg-[#EDE9FE] text-[#14ee2e] hover:bg-[#E4DBFC]",
}

const ExtendedButton: React.FC<ButtonProps> = ({
  text = "",
  variant = "default",
  className,
  type = "button",
  isLoading = false,
  onClick,
  disabled = false,
  loadingText = "Loading...",
  icon,
  iconPosition = "left",
  radius = "small",
  variantType,
  size = "normal",
}) => {
  const isDisabled = isLoading || disabled

  const radiusClass = RADIUS_CLASSES[radius]
  const sizeClass = SIZE_CLASSES[size]
  const variantClass =
    variant === "outline"
      ? "cursor-pointer bg-white border border-[#EDE9FE] text-[#374151] shadow-none hover:bg-[#F1F5F9]"
      : variantType
        ? VARIANT_TYPE_CLASSES[variantType]
        : ""

  const renderContent = () => (
    <span className="flex items-center gap-2">
      {icon && iconPosition === "left" && icon}
      {text}
      {icon && iconPosition === "right" && icon}
    </span>
  )

  return (
    <Button
      onClick={onClick}
      type={type}
      variant={variant}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 bg-[#1AC32E] px-4 text-sm font-normal text-white capitalize shadow-[0_4px_14px_0_#6D28D959] duration-300 hover:bg-[#14ee2e] disabled:cursor-not-allowed disabled:hover:bg-[#1AC32E]",
        radiusClass,
        sizeClass,
        variantClass,
        className
      )}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          {loadingText}
        </span>
      ) : (
        renderContent()
      )}
    </Button>
  )
}

export default ExtendedButton
