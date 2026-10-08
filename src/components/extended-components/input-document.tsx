import { useRef, useState } from "react"
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form"
import { FileText, UploadCloud } from "lucide-react"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"

interface InputDocumentProps<T extends FieldValues> {
  name: Path<T>
  title?: string
  isRequired?: boolean
  accept?: string
  maxSizeMb?: number
  className?: string
  hint?: string
}

const DocumentPreview = ({ file }: { file: File | string | null | undefined }) => {
  if (!file) return <UploadCloud className="h-6 w-6 text-tertiary-300" />

  const name = typeof file === "string" ? file.split("/").pop() : file.name

  return (
    <span className="flex items-center gap-1.5 text-sm text-tertiary-100">
      <FileText className="h-4 w-4 text-primary-500" />
      {name}
    </span>
  )
}

export const InputDocument = <T extends FieldValues>({
  name,
  title,
  isRequired = false,
  accept = ".pdf,.jpg,.jpeg,.png,.webp",
  maxSizeMb = 50,
  className,
  hint = "PNG, JPG, WEBP, PDF · Max 50MB per file",
}: InputDocumentProps<T>) => {
  const form = useFormContext<T>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const file = field.value as File | string | null | undefined

        const handleFiles = (fileList: FileList | null) => {
          const selected = fileList?.[0]
          if (!selected) return
          if (selected.size > maxSizeMb * 1024 * 1024) {
            form.setError(name, {
              message: `File must be smaller than ${maxSizeMb}MB`,
            })
            return
          }
          field.onChange(selected)
        }

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
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                handleFiles(e.dataTransfer.files)
              }}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D3D4D6] bg-[#D3D4D6]/10 px-4 py-8 text-center transition-colors",
                isDragging && "border-primary-400 bg-primary-50"
              )}
            >
              <DocumentPreview file={file} />
              <p className="text-sm font-medium text-tertiary-100">
                Drop files here or click to upload
              </p>
              <p className="text-xs text-tertiary-300">{hint}</p>

              <button
                type="button"
                className="mt-1 rounded-lg border border-[#EDE9FE] bg-white px-3 py-1.5 text-xs font-medium text-[#374151] shadow-sm hover:bg-[#F1F5F9]"
                onClick={(e) => {
                  e.stopPropagation()
                  inputRef.current?.click()
                }}
              >
                Browse Files
              </button>

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
        )
      }}
    />
  )
}
