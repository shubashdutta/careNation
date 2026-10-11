
import { PATH } from "@/constant/path"
import InventoryReports from "@/pages/store-manager/inventory-reports"
import Province from "@/pages/store-manager/province"
import ReceiveInventory from "@/pages/store-manager/receive-inventory"
import SalesPoint from "@/pages/store-manager/sales-point"
import Warehouse from "@/pages/store-manager/warehouse"

export const storeManagerRoutes = [
  {
    path: PATH.storeManager.province,
    element: <Province />,
  },
  {
    path: PATH.storeManager.salesPoint,
    element: <SalesPoint />,
  },
  {
    path: PATH.storeManager.warehouse,
    element: <Warehouse/>
  },
  {
    path: PATH.storeManager.receiveInventory,
    element: <ReceiveInventory />,
  },
  {
    path: PATH.storeManager.inventoryReports,
    element: <InventoryReports />,
  },
]
