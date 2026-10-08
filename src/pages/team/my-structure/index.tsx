import Breadcrumb from "@/components/shared/breadcrumb"
import AddMyStructureFile from "./partials/my-structure"

const breadcrumbTrail = ["Home", "Team", "Team Structure"]

const MyStructure = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Team Structure" />
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <AddMyStructureFile />
      </div>
    </div>
  )
}

export default MyStructure
