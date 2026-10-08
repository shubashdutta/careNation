import { useFormContext, type FieldValues, type Path } from "react-hook-form"
import { Switch } from "@/components/ui/switch"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

interface InputSwitchProps<T extends FieldValues> {
  name: Path<T>
  label: string
  className?: string
  disabled?: boolean
}

export function InputSwitch<T extends FieldValues>({
  name,
  label,
  className,
  disabled,
}: InputSwitchProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-row items-center gap-2", className)}>
          <FormControl>
            <Switch
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormLabel className="cursor-pointer">{label}</FormLabel>
        </FormItem>
      )}
    />
  )
}
