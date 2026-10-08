import Breadcrumb from "@/components/shared/breadcrumb"
import TeamViewContent from "./partials/team-view"

const breadcrumbTrail = ["Home", "Team", "Team View"]

const TeamView = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Team" />
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <TeamViewContent />
      </div>
    </div>
  )
}

export default TeamView
