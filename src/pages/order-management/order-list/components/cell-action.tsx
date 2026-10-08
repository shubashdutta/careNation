import { BookOpenTextIcon, Check, Eye, Home, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useChangeOrderStatus from "../hooks/use-change-order-status"
import type { IOrder } from "../type"
import useDisclosure from "@/hooks/use-disclosure"
import ViewOrderModal from "./view-order-modal"
import { useNavigate } from "react-router-dom"

const CellAction = ({ order }: { order: IOrder }) => {
  const { handleStatusChange, isPending } = useChangeOrderStatus()
  const viewOrder = useDisclosure()
  const navigate = useNavigate()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-muted">
          <MoreVertical className="h-4 w-4 text-tertiary-200" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-52 rounded-lg border-none bg-white p-1 shadow-md"
        >
          <DropdownMenuItem
            className="cursor-pointer gap-2 py-2"
            onClick={viewOrder.open}
          >
            <BookOpenTextIcon className="h-4 w-4" /> View Order Details
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer gap-2 py-2"
            onClick={() =>
              navigate(
                `/products/list/view/${order?.orderItems[0]?.productSnapshot?.productId}`
              )
            }
          >
            <Eye className="h-4 w-4" /> View Product
          </DropdownMenuItem>

          {order.status === "PENDING" && (
            <DropdownMenuItem
              disabled={isPending}
              className="cursor-pointer gap-2 py-2"
              onClick={() =>
                handleStatusChange({ id: order.id, status: "CONFIRMED" })
              }
            >
              <Check className="h-4 w-4" /> Accept Order
            </DropdownMenuItem>
          )}

          {order.status === "CONFIRMED" && (
            <DropdownMenuItem
              disabled={isPending}
              className="cursor-pointer gap-2 py-2"
              onClick={() =>
                handleStatusChange({ id: order.id, status: "Sent Warehouse" })
              }
            >
              <Home className="h-4 w-4" /> Sent For Warehouse
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render Modal Outside Dropdown Container */}
      {viewOrder.isOpen && (
        <ViewOrderModal
          isOpen={viewOrder.isOpen}
          onClose={viewOrder.close}
          order={order}
        />
      )}
    </>
  )
}

export default CellAction
