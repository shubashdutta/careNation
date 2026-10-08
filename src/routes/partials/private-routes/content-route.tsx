import { PATH } from "@/constant/path"
import Campaign from "@/pages/content-manager/announcement"
import FileManager from "@/pages/content-manager/file-manager"

export const contentRoutes = [
  {
    path: PATH.content.announcement,
    element: <Campaign />,
  },

  {
    path: PATH.content.fileManager,
    element: <FileManager />,
  },
]
