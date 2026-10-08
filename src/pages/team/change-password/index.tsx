import Breadcrumb from "@/components/shared/breadcrumb"
import ChangePasswordContent from "./partials/change-password"

const breadcrumbTrail = ["Home", "Team", "Change Password"]

const ChangePassword = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Change Password" />
      <ChangePasswordContent />
    </div>
  )
}

export default ChangePassword
