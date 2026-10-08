import useDisclosure from "@/hooks/use-disclosure"
import SharedBulkActionMenu from "@/components/shared/bulk-action-menu"
import useDeleteWarehouse from "../hooks/use-delete-warehouse"

const BulkActionMenu = ({
  selectedIds,
  onDeleted,
}: {
  selectedIds: string[]
  onDeleted: () => void
}) => {
  const { isOpen, open, close } = useDisclosure()
  const { deleteWarehouse, isPending } = useDeleteWarehouse({
    onSuccess: onDeleted,
  })

  return (
    <SharedBulkActionMenu
      entityLabel="warehouse"
      selectedIds={selectedIds}
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
      onDelete={() => deleteWarehouse(selectedIds)}
      isDeleting={isPending}
    />
  )
}

export default BulkActionMenu
