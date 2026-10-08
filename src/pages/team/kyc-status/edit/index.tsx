import Breadcrumb from "@/components/shared/breadcrumb"
import EditKycContent from "./partials/edit-kyc"

const breadcrumbTrail = ["Home", "Team", "Edit KYC"]

const EditKyc = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Edit KYC" />
      <EditKycContent />
    </div>
  )
}

export default EditKyc
