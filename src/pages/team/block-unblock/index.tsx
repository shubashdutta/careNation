import Breadcrumb from "@/components/shared/breadcrumb"
import BlockUnblockContent from "./partials/block-unblock"

const breadcrumbTrail = ["Home", "Team", "Block/Unblock"]

const BlockUnblock = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb trail={breadcrumbTrail} title="Block/Unblock" />
      <BlockUnblockContent />
    </div>
  )
}

export default BlockUnblock
