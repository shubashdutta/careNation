import { useEffect, useMemo, useRef, useState } from "react"
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form"
import { FileText, Loader2, Plus, UploadCloud, X } from "lucide-react"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"

type FileValue = File | string

interface InputMultiFileProps<T extends FieldValues> {
  name: Path<T>
  title?: string
  isRequired?: boolean
  isDisabled?: boolean
  accept?: string
  maxSizeMb?: number
  maxFiles?: number
  className?: string
  hint?: string
  /** When provided, each file uploads immediately on selection and the
   *  field value is swapped from File -> returned URL once it resolves. */
  onUpload?: (file: File) => Promise<string>
}

const Thumbnail = ({
  file,
  onRemove,
  disabled,
  isUploading,
}: {
  file: FileValue
  onRemove: () => void
  disabled?: boolean
  isUploading?: boolean
}) => {
  const isImage =
    typeof file === "string"
      ? /\.(png|jpe?g|webp|gif)$/i.test(file)
      : file.type.startsWith("image/")

  const url = useMemo(() => {
    if (file instanceof File && isImage) return URL.createObjectURL(file)
    return typeof file === "string" ? file : null
  }, [file, isImage])

  useEffect(() => {
    return () => {
      if (file instanceof File && url) URL.revokeObjectURL(url)
    }
  }, [file, url])

  const name = typeof file === "string" ? file.split("/").pop() : file.name

  return (
    <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-tertiary-75 bg-[#D3D4D6]/10">
      {isImage && url ? (
        <img src={url} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1">
          <FileText className="h-6 w-6 text-primary-500" />
          <span className="w-full truncate text-center text-[10px] text-tertiary-300">
            {name}
          </span>
        </div>
      )}

      {isUploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/50 text-white">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-[9px]">Uploading...</span>
        </div>
      )}

      {!disabled && !isUploading && (
        <button
          type="button"
          aria-label="Remove file"
          onClick={onRemove}
          className="absolute top-1 right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

export const InputMultiFile = <T extends FieldValues>({
  name,
  title,
  isRequired = false,
  isDisabled = false,
  accept = ".png,.jpg,.jpeg,.webp,.gif,.mp4,.pdf",
  maxSizeMb = 50,
  maxFiles = 20,
  className,
  hint = "PNG, JPG, WEBP, GIF, MP4 · Max 50MB per file · Up to 20 images",
  onUpload,
}: InputMultiFileProps<T>) => {
  const form = useFormContext<T>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<Set<File>>(new Set())

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const files: FileValue[] = Array.isArray(field.value) ? field.value : []

        const uploadFile = async (file: File) => {
          setUploadingFiles((prev) => new Set(prev).add(file))

          try {
            const url = await onUpload!(file)
            const current: FileValue[] = Array.isArray(form.getValues(name))
              ? form.getValues(name)
              : []
            field.onChange(current.map((f) => (f === file ? url : f)))
          } catch {
            form.setError(name, {
              message: `Failed to upload ${file.name}`,
            })
          } finally {
            setUploadingFiles((prev) => {
              const next = new Set(prev)
              next.delete(file)
              return next
            })
          }
        }

        const handleFiles = (fileList: FileList | null) => {
          if (!fileList || fileList.length === 0) return
          const incoming = Array.from(fileList)
          const oversize = incoming.find(
            (f) => f.size > maxSizeMb * 1024 * 1024
          )
          if (oversize) {
            form.setError(name, {
              message: `File must be smaller than ${maxSizeMb}MB`,
            })
            return
          }
          const next = [...files, ...incoming].slice(0, maxFiles)
          field.onChange(next)

          if (onUpload) {
            const accepted = next.filter((f): f is File => f instanceof File)
            incoming
              .filter((f) => accepted.includes(f))
              .forEach((f) => uploadFile(f))
          }
        }

        const removeAt = (index: number) => {
          field.onChange(files.filter((_, i) => i !== index))
        }

        return (
          <div className={cn("space-y-1.5", className)}>
            {title && (
              <Label className="text-sm font-normal text-tertiary-100">
                {title}{" "}
                {isRequired && <span className="text-destructive">*</span>}
              </Label>
            )}

            {files.length === 0 ? (
              <div
                onClick={() => !isDisabled && inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  if (!isDisabled) setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setIsDragging(false)
                  if (!isDisabled) handleFiles(e.dataTransfer.files)
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D3D4D6] bg-[#D3D4D6]/10 px-4 py-8 text-center transition-colors",
                  isDisabled
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer",
                  isDragging && "border-primary-400 bg-primary-50"
                )}
              >
                <UploadCloud className="h-6 w-6 text-tertiary-300" />
                <p className="text-sm font-medium text-tertiary-100">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-tertiary-300">{hint}</p>
                <button
                  type="button"
                  disabled={isDisabled}
                  className="mt-1 rounded-lg border border-[#EDE9FE] bg-white px-3 py-1.5 text-xs font-medium text-[#374151] shadow-sm hover:bg-[#F1F5F9]"
                  onClick={(e) => {
                    e.stopPropagation()
                    inputRef.current?.click()
                  }}
                >
                  Browse Files
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <Thumbnail
                    key={
                      typeof file === "string" ? file : `${file.name}-${index}`
                    }
                    file={file}
                    disabled={isDisabled}
                    isUploading={
                      file instanceof File && uploadingFiles.has(file)
                    }
                    onRemove={() => removeAt(index)}
                  />
                ))}
                {!isDisabled && files.length < maxFiles && (
                  <button
                    type="button"
                    aria-label="Add more files"
                    onClick={() => inputRef.current?.click()}
                    className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#D3D4D6] bg-[#D3D4D6]/10 text-tertiary-300 hover:border-primary-400 hover:text-primary-500"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple
              hidden
              onChange={(e) => {
                handleFiles(e.target.files)
                e.target.value = ""
              }}
            />

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
