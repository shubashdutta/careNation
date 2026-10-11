import { PATH } from "@/constant/path"
import Brand from "@/pages/product-manager/brand"
import Category from "@/pages/product-manager/category"

export const productManagerRoutes = [
  {
    path: PATH.productManager.category,
    element: <Category />,
  },
   {
    path: PATH.productManager.brands,
    element: <Brand />,
  },
]
