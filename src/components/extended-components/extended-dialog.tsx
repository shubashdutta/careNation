import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ExtendedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

const ExtendedDialog = ({
  open,
  onOpenChange,
  title,
  children,
  className,
}: ExtendedDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("max-h-[90vh] min-w-[600px] overflow-y-auto", className)}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ExtendedDialog;
