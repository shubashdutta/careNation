import Layout from "@/layout"
// import PrivateRouteWrapper from "./private-route-wrapper";
import PublicRouteWrapper from "./public-route-wrapper"
import { publicRoutes } from "./partials/public-routes/public-route"
import { dashboardRoutes } from "./partials/private-routes/dashboard-route"
import { orderRoutes } from "./partials/private-routes/order-route"
import PrivateRouteWrapper from "./private-route-wrapper"
import NotFound from "@/pages/not-found"
import { warehouseRoutes } from "./partials/private-routes/warehouse-route"
import { settingsRoutes } from "./partials/private-routes/settings-route"
import { contentRoutes } from "./partials/private-routes/content-route"
import { teamRoutes } from "./partials/private-routes/team-route"
import { financialRoutes } from "./partials/private-routes/financial-route"
import { storeManagerRoutes } from "./partials/private-routes/store-manager-routes"
import { productManagerRoutes } from "./partials/private-routes/product-manager"
import { ReportRoutes } from "./partials/private-routes/reports-route"
import { supportRoutes } from "./partials/private-routes/suport-route"
import { ManageUser } from "./partials/private-routes/manageUser"

/**
 * MainRoutes defines the routing configuration for the application.
 * It separates routes into private (authenticated) and public (unauthenticated) routes.
 */

const MainRoutes = [
  {
    path: "/",
    element: (
      <PrivateRouteWrapper>
        <Layout />
      </PrivateRouteWrapper>
    ),
    children: [
      ...dashboardRoutes,
      ...financialRoutes,
      ...storeManagerRoutes,
      ...productManagerRoutes,
      ...orderRoutes,
      ...warehouseRoutes,
      ...settingsRoutes,
      ...contentRoutes,
      ...teamRoutes,
      ...ReportRoutes,

      ...supportRoutes,
      ...ManageUser,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    element: <PublicRouteWrapper />,
    children: [...publicRoutes],
  },
]

export default MainRoutes
