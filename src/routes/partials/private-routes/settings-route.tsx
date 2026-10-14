import { PATH } from "@/constant/path"
import BankSettingPage from "@/pages/settings/bankSetting/BankSettingPage"
import GeneralSettings from "@/pages/settings/general"
import MailSettingPage from "@/pages/settings/mailSetting/MailSettingPage"
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

  {
    path: PATH.settings.bankSeting,
    element: <BankSettingPage />,
  },
  {
    path: PATH.settings.mailSetting,
    element: <MailSettingPage />,
  },
]
