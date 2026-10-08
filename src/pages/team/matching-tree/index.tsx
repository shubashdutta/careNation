import Breadcrumb from "@/components/shared/breadcrumb"
import AddMatchingTreeFile from "./partials/matching-tree"

const breadcrumbTrail = ["Home", "Team", "Matching Tree"]

const MatchingTree = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Matching Tree" />
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <AddMatchingTreeFile />
      </div>
    </div>
  )
}

export default MatchingTree
