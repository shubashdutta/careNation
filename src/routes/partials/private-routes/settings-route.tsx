import { PATH } from "@/constant/path"
import GeneralSettings from "@/pages/cms/about-us"
import PolicySettings from "@/pages/settings/policy"

export const settingsRoutes = [
  {
    path: PATH.settings.general,
    element: <GeneralSettings />,
  },
  {
    path: PATH.settings.policy,
    element: <PolicySettings />,
  },
]
