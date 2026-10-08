import type { ReactNode } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ExtendedButton from "@/components/extended-components/extended-button";
import ConfirmationModal from "@/components/shared/confirmation-modal";

interface BulkActionMenuProps {
  entityLabel: string;
  selectedIds: string[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  children?: ReactNode;
}

const BulkActionMenu = ({
  entityLabel,
  selectedIds,
  isOpen,
  onOpen,
  onClose,
  onDelete,
  isDeleting = false,
  children,
}: BulkActionMenuProps) => {
  const hasSelection = selectedIds.length > 0;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ExtendedButton
            variant="outline"
            text="Bulk Action"
            radius="medium"
            icon={<ChevronDown className="h-3.5 w-3.5" />}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-48 rounded-lg border-none bg-white p-1 shadow-md"
        >
          {children}
          <DropdownMenuItem
            variant="destructive"
            disabled={!hasSelection}
            className="cursor-pointer gap-2 py-2"
            onClick={onOpen}
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationModal
        open={isOpen}
        onClose={onClose}
        title={`Delete ${entityLabel}s`}
        description={`Are you sure you want to delete ${selectedIds.length} selected ${entityLabel}${
          selectedIds.length > 1 ? "s" : ""
        }? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        loading={isDeleting}
        onConfirm={onDelete}
      />
    </>
  );
};

export default BulkActionMenu;
