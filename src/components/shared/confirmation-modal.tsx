import ExtendedButton from "@/components/extended-components/extended-button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onReject?: () => void;
  loading?: boolean;
  className?: string;
  confirmVariant?: "destructive" | "primary" | "outline";
}

const CONFIRM_VARIANT_CLASSNAME: Record<
  NonNullable<ConfirmationModalProps["confirmVariant"]>,
  string
> = {
  primary: "",
  outline: "",
  destructive:
    "bg-destructive shadow-none hover:bg-destructive/90 disabled:hover:bg-destructive",
};

const ConfirmationModal = ({
  open,
  onClose,
  title = "Confirm Action",
  description = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onReject,
  loading = false,
  className,
  confirmVariant = "primary",
}: ConfirmationModalProps) => {
  const handleReject = () => {
    if (loading) return;
    onReject?.();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next, eventDetails) => {
        // Interactive: block outside-press / escape from closing the
        // dialog while a confirm/reject action is still in flight.
        if (!next && loading) {
          eventDetails.cancel();
          return;
        }
        if (!next) {
          handleReject();
        }
      }}
    >
      <DialogContent
        showCloseButton={!loading}
        className={cn("min-w-[400px] p-0 sm:min-w-[524px]", className)}
      >
        <div className="flex flex-col items-center p-6">
          <p className="text-2xl font-semibold text-tertiary-100">{title}</p>
          <p className="mt-2 text-center text-base font-normal text-[#6A6A6A]">
            {description}
          </p>
          <div className="mt-8 flex w-full gap-5">
            <ExtendedButton
              variant="outline"
              onClick={handleReject}
              disabled={loading}
              text={cancelText}
              className="flex-1"
            />
            <ExtendedButton
              variant="default"
              onClick={onConfirm}
              text={confirmText}
              className={cn(
                "flex-1",
                CONFIRM_VARIANT_CLASSNAME[confirmVariant],
              )}
              isLoading={loading}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
