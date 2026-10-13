import { PATH } from "@/constant/path"
import AttributesPage from "@/pages/product-manager/attributes"
import Brand from "@/pages/product-manager/brand"
import Category from "@/pages/product-manager/category"
import ProducsPage from "@/pages/product-manager/producs"

export const productManagerRoutes = [
  {
    path: PATH.productManager.category,
    element: <Category />,
  },
  {
    path: PATH.productManager.brands,
    element: <Brand />,
  },
  {
    path: PATH.productManager.products,
    element: <ProducsPage />,
  },
  {
    path: PATH.productManager.attributes,
    element: <AttributesPage />,
  },
]
