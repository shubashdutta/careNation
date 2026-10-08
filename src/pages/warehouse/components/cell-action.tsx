import ExtendedDialog from "@/components/extended-components/extended-dialog"
import ConfirmationModal from "@/components/shared/confirmation-modal"
import RowActions from "@/components/shared/row-actions"
import useDisclosure from "@/hooks/use-disclosure"
import useDeleteWarehouse from "../hooks/use-delete-warehouse"
import EditWarehouse from "./edit-warehouse"
import ViewWarehouse from "./view-warehouse"
import type { IWarehouse } from "../type"

const CellAction = ({ warehouse }: { warehouse: IWarehouse }) => {
  const viewModal = useDisclosure()
  const editModal = useDisclosure()
  const deleteModal = useDisclosure()
  const { deleteWarehouse, isPending } = useDeleteWarehouse({
    onSuccess: deleteModal.close,
  })

  return (
    <>
      <RowActions
        entity="warehouse"
        onView={viewModal.open}
        onEdit={editModal.open}
        onDelete={deleteModal.open}
      />

      <ExtendedDialog
        open={viewModal.isOpen}
        onOpenChange={viewModal.set}
        title="Warehouse details"
        className="max-w-4xl"
      >
        <ViewWarehouse warehouse={warehouse} />
      </ExtendedDialog>

      <ExtendedDialog
        open={editModal.isOpen}
        onOpenChange={editModal.set}
        title="Edit Warehouse"
        className="max-w-3xl"
      >
        <EditWarehouse warehouse={warehouse} onClose={editModal.close} />
      </ExtendedDialog>

      <ConfirmationModal
        open={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete warehouse"
        description={`Are you sure you want to delete "${warehouse.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        loading={isPending}
        onConfirm={() => deleteWarehouse(warehouse.id)}
      />
    </>
  )
}

export default CellAction
