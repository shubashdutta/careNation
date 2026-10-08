import { PATH } from "@/constant/path"
import AboutUs from "@/pages/cms/about-us"
import HomeSectionPage from "@/pages/cms/home"
// import Media from "@/pages/media"

export const cmsRoutes = [
  {
    path: PATH.cms.homeSection,
    element: <HomeSectionPage />,
  },
  {
    path: PATH.cms.aboutUs,
    element: <AboutUs />,
  },
]
