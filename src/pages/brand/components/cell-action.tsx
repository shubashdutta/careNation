import ExtendedDialog from "@/components/extended-components/extended-dialog"
import ConfirmationModal from "@/components/shared/confirmation-modal"
import RowActions from "@/components/shared/row-actions"
import useDisclosure from "@/hooks/use-disclosure"
import useDeleteBrand from "../hooks/use-delete-brand"
import EditBrand from "./edit-brand"
import type { IBrand } from "../type"

const CellAction = ({ brand }: { brand: IBrand }) => {
  const editModal = useDisclosure()
  const deleteModal = useDisclosure()
  const { deleteBrand, isPending } = useDeleteBrand({
    onSuccess: deleteModal.close,
  })

  return (
    <>
      <RowActions
        entity="brand"
        onEdit={editModal.open}
        onDelete={deleteModal.open}
      />

      <ExtendedDialog
        open={editModal.isOpen}
        onOpenChange={editModal.set}
        title="Edit Brand"
      >
        <EditBrand brand={brand} onClose={editModal.close} />
      </ExtendedDialog>

      <ConfirmationModal
        open={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete brand"
        description={`Are you sure you want to delete "${brand.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        loading={isPending}
        onConfirm={() => deleteBrand(brand.id)}
      />
    </>
  )
}

export default CellAction
