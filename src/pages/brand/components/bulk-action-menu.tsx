import useDisclosure from "@/hooks/use-disclosure"
import SharedBulkActionMenu from "@/components/shared/bulk-action-menu"
import useDeleteBrand from "../hooks/use-delete-brand"

const BulkActionMenu = ({
  selectedIds,
  onDeleted,
}: {
  selectedIds: string[]
  onDeleted: () => void
}) => {
  const { isOpen, open, close } = useDisclosure()
  const { deleteBrand, isPending } = useDeleteBrand({ onSuccess: onDeleted })

  return (
    <SharedBulkActionMenu
      entityLabel="brand"
      selectedIds={selectedIds}
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
      onDelete={() => deleteBrand(selectedIds)}
      isDeleting={isPending}
    />
  )
}

export default BulkActionMenu
