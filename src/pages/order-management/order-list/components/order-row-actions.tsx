import { Eye, Pencil, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import useDisclosure from "@/hooks/use-disclosure"
import ConfirmationModal from "@/components/shared/confirmation-modal"
import useDeleteOrder from "../hooks/use-delete-order"
import ViewOrderModal from "./view-order-modal"
import type { IOrder } from "../type"

const OrderRowActions = ({ order }: { order: IOrder }) => {
  const navigate = useNavigate()
  const viewOrder = useDisclosure()
  const deleteOrder = useDisclosure()
  const { deleteOrder: remove, isPending } = useDeleteOrder({
    onSuccess: () => {
      deleteOrder.close()
    },
  })

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          title="View order details"
          onClick={viewOrder.open}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-sky-600 transition-colors hover:bg-sky-50"
        >
          <Eye className="h-4 w-4" />
        </button>

        <button
          type="button"
          title="Edit order"
          onClick={() =>
            toast.info(`Editing order #${order.orderNumber} (coming soon)`)
          }
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-amber-600 transition-colors hover:bg-amber-50"
        >
          <Pencil className="h-4 w-4" />
        </button>

        <button
          type="button"
          title="Delete order"
          onClick={deleteOrder.open}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-rose-600 transition-colors hover:bg-rose-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {viewOrder.isOpen && (
        <ViewOrderModal
          isOpen={viewOrder.isOpen}
          onClose={viewOrder.close}
          order={order}
        />
      )}

      <ConfirmationModal
        open={deleteOrder.isOpen}
        onClose={deleteOrder.close}
        title="Delete Order"
        description={`Are you sure you want to delete order #${order.orderNumber}? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        loading={isPending}
        onConfirm={() => remove(order.id)}
      />
    </>
  )
}

export default OrderRowActions
