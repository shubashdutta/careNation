import Breadcrumb from "@/components/shared/breadcrumb"
import ReferralListContent from "./partials/referral-list"

const breadcrumbTrail = ["Home", "Team", "Referral"]

const ReferralList = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Team" />
      <ReferralListContent />
    </div>
  )
}

export default ReferralList
