import { PATH } from "@/constant/path"
import OrderList from "@/pages/order-management/order-list"
import PendingDispatchList from "@/pages/order-management/pendingDispatch/PendingDispatchList"
import QuickOrdersListPage from "@/pages/order-management/quickOrders/QuickOrdersListPage"

export const orderRoutes = [
  {
    path: PATH.order.quickOrder,
    element: <QuickOrdersListPage />,
  },
  {
    path: PATH.order.orderList,
    element: <OrderList />,
  },

  {
    path: PATH.order.pendingDispatch,
    element: <PendingDispatchList />,
  },
]
