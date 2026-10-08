import Breadcrumb from "@/components/shared/breadcrumb"
import AddGoldTeamFile from "./partials/gold-team"

const breadcrumbTrail = ["Home", "Team", "Team 1"]

const GoldTeam = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Team 1" />
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <AddGoldTeamFile />
      </div>
    </div>
  )
}

export default GoldTeam
