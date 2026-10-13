import { PATH } from "@/constant/path"
import ApprovalReportsPage from "@/pages/order-management/approvalReports/ApprovalReportsPage"
import OrderList from "@/pages/order-management/order-list"
import PendingDispatchPage from "@/pages/order-management/pendingDispatch/PendingDispatchPage"
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
    element: <PendingDispatchPage />,
  },
  {
    path: PATH.order.approvalReports,
    element: <ApprovalReportsPage />,
  },
]
