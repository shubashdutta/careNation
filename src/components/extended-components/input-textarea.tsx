import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InputTextareaProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
  label?: string;
  isRequired?: boolean;
  rows?: number;
  maxLength?: number;
}

export const InputTextarea = <TFormValues extends FieldValues>({
  name,
  placeholder,
  isDisabled = false,
  className,
  label,
  isRequired = false,
  rows = 4,
  maxLength,
}: InputTextareaProps<TFormValues>) => {
  const form = useFormContext<TFormValues>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm font-normal data-[error=true]:text-black">
              {label}{" "}
              {isRequired && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              {...field}
              rows={rows}
              maxLength={maxLength}
              placeholder={placeholder}
              disabled={isDisabled}
              className={className}
            />
          </FormControl>
          <FormMessage className="text-left" />
        </FormItem>
      )}
    />
  );
};
