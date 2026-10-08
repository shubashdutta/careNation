import Breadcrumb from "@/components/shared/breadcrumb"
import KycStatusContent from "./partials/kyc-status"

const breadcrumbTrail = ["Home", "Team", "KYC"]

const KycStatus = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Verify KYC" />
      <KycStatusContent />
    </div>
  )
}

export default KycStatus
