import { useState, type KeyboardEvent } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";

interface InputProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  placeholder?: string; 
  type?: string;
  isDisabled?: boolean;
  className?: string;
  label?: string | React.JSX.Element;
  isPassword?: boolean;
  isRequired?: boolean;
  onKeyDown?: (e: KeyboardEvent<Element>) => void;
}

export const InputField = <TFormValues extends FieldValues>({
  name,
  placeholder,
  type = "text",
  isDisabled = false,
  className,
  label,
  isPassword = false,
  isRequired = true,
  onKeyDown,
}: InputProps<TFormValues>) => {
  const form = useFormContext<TFormValues>();
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Home",
        "End",
      ];

      if (e.ctrlKey && ["c", "a", "v", "x"].includes(e.key.toLowerCase())) {
        return;
      }

      if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
    onKeyDown?.(e);
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      (e.target as HTMLInputElement).blur();
    }
  };

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
            <div className="relative">
              <Input
                {...field}
                type={inputType}
                placeholder={placeholder}
                disabled={isDisabled}
                onChange={field.onChange}
                onBlur={field.onBlur}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                className={cn(isPassword && "pr-9", className)}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
              <FormMessage className="text-left" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
