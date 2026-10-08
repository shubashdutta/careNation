import ExtendedDialog from "@/components/extended-components/extended-dialog"
import ConfirmationModal from "@/components/shared/confirmation-modal"
import RowActions from "@/components/shared/row-actions"
import useDisclosure from "@/hooks/use-disclosure"
import useDeleteFile from "../hooks/use-delete-file"
import EditFile from "./edit-file"
import type { IFile } from "../type"

const CellAction = ({ File }: { File: IFile }) => {
  const editModal = useDisclosure()
  const deleteModal = useDisclosure()
  const { deleteFile, isPending } = useDeleteFile({
    onSuccess: deleteModal.close,
  })

  return (
    <>
      <RowActions
        entity="File"
        onEdit={editModal.open}
        onDelete={deleteModal.open}
      />

      <ExtendedDialog
        open={editModal.isOpen}
        onOpenChange={editModal.set}
        title="Edit File"
      >
        <EditFile File={File} />
      </ExtendedDialog>

      <ConfirmationModal
        open={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete File"
        description={`Are you sure you want to delete "${File.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        loading={isPending}
        onConfirm={() => deleteFile(File.id)}
      />
    </>
  )
}

export default CellAction
