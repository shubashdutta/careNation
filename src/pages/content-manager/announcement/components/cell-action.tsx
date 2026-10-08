// import ConfirmationModal from "@/components/shared/confirmation-modal"
// import RowActions from "@/components/shared/row-actions"
// import useDisclosure from "@/hooks/use-disclosure"
// import useDeleteCampaign from "../hooks/use-delete-campaign"
// import type { ICampaign } from "../type"
// import { useNavigate } from "react-router-dom"
// import { PATH } from "@/constant/path"

// const CellAction = ({ campaign }: { campaign: ICampaign }) => {
//   const deleteModal = useDisclosure()
//   const { deleteCampaign, isPending } = useDeleteCampaign({
//     onSuccess: deleteModal.close,
//   })
//   const navigate = useNavigate()

//   return (
//     <>
//       <RowActions
//         entity="Campaign"
//         onEdit={() => {
//           navigate(PATH.campaign.edit.replace(":id", campaign.id))
//         }}
//         onDelete={deleteModal.open}
//       />

//       {/* <ExtendedDialog
//         open={editModal.isOpen}
//         onOpenChange={editModal.set}
//         title="Edit Campaign"
//       >
//         <EditCampaign campaign={campaign} onClose={editModal.close} />
//       </ExtendedDialog> */}

//       <ConfirmationModal
//         open={deleteModal.isOpen}
//         onClose={deleteModal.close}
//         title="Delete Campaign"
//         description={`Are you sure you want to delete "${campaign.name}"? This action cannot be undone.`}
//         confirmText="Delete"
//         confirmVariant="destructive"
//         loading={isPending}
//         onConfirm={() => deleteCampaign(campaign.id)}
//       />
//     </>
//   )
// }

// export default CellAction

import { useNavigate } from "react-router-dom"
import { Copy, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ConfirmationModal from "@/components/shared/confirmation-modal"
import useDisclosure from "@/hooks/use-disclosure"
import { PATH } from "@/constant/path"
import useDeleteCampaign from "../hooks/use-delete-campaign"
import type { ICampaign } from "../type"

const CellAction = ({ campaign }: { campaign: ICampaign }) => {
  const navigate = useNavigate()
  const { isOpen, open, close } = useDisclosure()
  const { deleteCampaign, isPending } = useDeleteCampaign({ onSuccess: close })

  const addModal = useDisclosure()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md outline-none">
          <MoreVertical className="h-4 w-4 text-tertiary-200" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44 rounded-lg border-none bg-white p-1 shadow-md"
        >
          <DropdownMenuItem className="cursor-pointer gap-2 py-2">
            <Pencil className="h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-2 py-2"
            onClick={() =>
              navigate(`${PATH.campaign.view.replace(":id", campaign.id)}`)
            }
          >
            <Eye className="h-4 w-4" /> View campaign
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-2 py-2"
            onClick={addModal.open}
          >
            <Copy className="h-4 w-4" /> Add Product Variant
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer gap-2 py-2"
            onClick={open}
          >
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationModal
        open={isOpen}
        onClose={close}
        title="Delete campaign"
        description={`Are you sure you want to delete "${campaign.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        loading={isPending}
        onConfirm={() => deleteCampaign(campaign.id)}
      />
    </>
  )
}

export default CellAction
