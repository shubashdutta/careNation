import Breadcrumb from "@/components/shared/breadcrumb"
import AddViewProfileFile from "./partials/view-profile"

const breadcrumbTrail = ["Home", "Team", "View Profile"]

const ViewProfile = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="View Profile" />
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <AddViewProfileFile />
      </div>
    </div>
  )
}

export default ViewProfile
