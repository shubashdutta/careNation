import { PATH } from "@/constant/path";
import OrderList from "@/pages/order-management/order-list";

export const orderRoutes = [
  {
    path: PATH.order.orderList,
    element: <OrderList />,
  },
];
