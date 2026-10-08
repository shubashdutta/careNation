import Layout from "@/layout"
// import PrivateRouteWrapper from "./private-route-wrapper";
import PublicRouteWrapper from "./public-route-wrapper"
import { publicRoutes } from "./partials/public-routes/public-route"
import { dashboardRoutes } from "./partials/private-routes/dashboard-route"
import { orderRoutes } from "./partials/private-routes/order-route"
import PrivateRouteWrapper from "./private-route-wrapper"
import NotFound from "@/pages/not-found"
import { brandRoutes } from "./partials/private-routes/brand-route"
import { warehouseRoutes } from "./partials/private-routes/warehouse-route"
import { settingsRoutes } from "./partials/private-routes/settings-route"
import { contentRoutes } from "./partials/private-routes/content-route"
import { cmsRoutes } from "./partials/private-routes/cms-route"
import { teamRoutes } from "./partials/private-routes/team-route"

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
      ...orderRoutes,
      ...brandRoutes,
      ...warehouseRoutes,
      ...settingsRoutes,
      ...contentRoutes,
      ...cmsRoutes,
      ...teamRoutes,

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    // Public routes wrapper: accessible only to unauthenticated users
    element: <PublicRouteWrapper />,
    children: [...publicRoutes],
  },
]

export default MainRoutes
