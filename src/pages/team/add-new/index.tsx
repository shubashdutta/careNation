import Breadcrumb from "@/components/shared/breadcrumb"
import AddFile from "@/pages/content-manager/file-manager/components/add-file"

const breadcrumbTrail = ["Home", "Team", "Add New"]

const AddNewTeam = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Add New Team Member" />
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <AddFile />
      </div>
    </div>
  )
}

export default AddNewTeam
