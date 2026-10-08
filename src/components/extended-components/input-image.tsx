import { useEffect, useRef, useState } from "react";
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";
import { UploadCloud } from "lucide-react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface InputImageProps<T extends FieldValues> {
  name: Path<T>;
  title?: string;
  isRequired?: boolean;
  accept?: string;
  maxSizeMb?: number;
  className?: string;
}

const FilePreview = ({ file }: { file: File | string | null | undefined }) => {
  const [url, setUrl] = useState<string | null>(
    typeof file === "string" ? file : null,
  );

  useEffect(() => {
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setUrl(typeof file === "string" ? file : null);
  }, [file]);

  if (!url) {
    return <UploadCloud className="h-6 w-6 text-tertiary-300" />;
  }

  return (
    <img src={url} alt="Preview" className="h-16 w-16 rounded-lg object-cover" />
  );
};

export const InputImage = <T extends FieldValues>({
  name,
  title = "Image",
  isRequired = false,
  accept = ".jpg,.jpeg,.png,.svg,.zip",
  maxSizeMb = 10,
  className,
}: InputImageProps<T>) => {
  const form = useFormContext<T>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const file = field.value as File | string | null | undefined;

        const handleFiles = (fileList: FileList | null) => {
          const selected = fileList?.[0];
          if (!selected) return;
          if (selected.size > maxSizeMb * 1024 * 1024) {
            form.setError(name, {
              message: `File must be smaller than ${maxSizeMb}MB`,
            });
            return;
          }
          field.onChange(selected);
        };

        return (
          <div className={cn("space-y-1.5", className)}>
            {title && (
              <Label className="text-sm font-normal text-tertiary-100">
                {title}{" "}
                {isRequired && <span className="text-destructive">*</span>}
              </Label>
            )}

            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D3D4D6] bg-[#D3D4D6]/10 px-4 py-8 text-center transition-colors",
                isDragging && "border-primary-400 bg-primary-50",
              )}
            >
              <FilePreview file={file} />
              <p className="text-sm text-tertiary-300">
                Drag your file(s) or{" "}
                <span className="text-primary-500 underline">browse</span>
              </p>
              <p className="text-xs text-tertiary-300">
                Max {maxSizeMb} MB files are allowed
              </p>
              <p className="text-xs text-tertiary-300">
                Only support .jpg, .png and .svg and zip files
              </p>
              <input
                ref={inputRef}
                type="file"
                accept={accept}
                hidden
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {fieldState.error && (
              <p className="text-xs text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
