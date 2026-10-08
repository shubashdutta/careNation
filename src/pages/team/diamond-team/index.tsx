import Breadcrumb from "@/components/shared/breadcrumb"
import DiamondTeamContent from "./partials/diamond-team"

const breadcrumbTrail = ["Home", "Team", "Team 2"]

const DiamondTeam = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Team 2" />
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <DiamondTeamContent />
      </div>
    </div>
  )
}

export default DiamondTeam
