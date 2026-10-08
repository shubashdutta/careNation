import Breadcrumb from "@/components/shared/breadcrumb"
import Profile from "./partials/profile"

const breadcrumbTrail = ["Home", "Team", "Edit Profile"]

const EditProfile = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Profile" />
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <Profile />
      </div>
    </div>
  )
}

export default EditProfile
