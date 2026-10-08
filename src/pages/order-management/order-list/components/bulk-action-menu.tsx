import useDisclosure from "@/hooks/use-disclosure";
import SharedBulkActionMenu from "@/components/shared/bulk-action-menu";
import useDeleteOrder from "../hooks/use-delete-order";

const BulkActionMenu = ({
  selectedIds,
  onDeleted,
}: {
  selectedIds: string[];
  onDeleted: () => void;
}) => {
  const { isOpen, open, close } = useDisclosure();
  const { deleteOrder, isPending } = useDeleteOrder({ onSuccess: onDeleted });

  return (
    <SharedBulkActionMenu
      entityLabel="order"
      selectedIds={selectedIds}
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
      onDelete={() => deleteOrder(selectedIds)}
      isDeleting={isPending}
    />
  );
};

export default BulkActionMenu;
