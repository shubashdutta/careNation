import type { ReactNode } from "react"
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"
import { Form } from "@/components/ui/form"
import ExtendedButton from "@/components/extended-components/extended-button"
import { cn } from "@/lib/utils"

interface ExtendedFormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  onClose?: () => void
  children: ReactNode
  submitText?: string
  cancelText?: string
  isSubmitting?: boolean
  className?: string
  showCancelBtn?: boolean
  btnDisabled?: boolean
  submitBtnType?: "submit" | "button"
  onClick?: () => void
}

export default function ExtendedForm<T extends FieldValues>({
  form,
  onSubmit,
  onClose,
  children,
  submitText = "Submit",
  cancelText = "Cancel",
  isSubmitting = false,
  className = "",
  showCancelBtn = false,
  btnDisabled = false,
  submitBtnType = "submit",
  onClick,
}: ExtendedFormProps<T>) {
  // console.log("submitBtnType", submitBtnType)
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4", className)}
      >
        {children}

        <div className="mt-8 flex w-full items-center justify-end gap-3">
          {showCancelBtn && (
            <ExtendedButton
              type="button"
              variant="outline"
              text={cancelText}
              disabled={isSubmitting}
              onClick={() => {
                // form.reset()
                onClose?.()
              }}
            />
          )}

          <ExtendedButton
            type={submitBtnType}
            text={submitText}
            disabled={btnDisabled}
            isLoading={isSubmitting}
            onClick={submitBtnType === "button" ? onClick : undefined}
          />
        </div>
      </form>
    </Form>
  )
}
