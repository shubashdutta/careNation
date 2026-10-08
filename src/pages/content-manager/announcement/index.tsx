import Breadcrumb from "@/components/shared/breadcrumb"
import { CampaignCard } from "./components/campaign-card"

const breadcrumbTrail = ["Home", "Product Management", "Campaign"]

const Campaign = () => {
  return (
    <div className="space-y-6">
      <Breadcrumb trail={breadcrumbTrail} title="Announcement" />
      <CampaignCard />
      {/* <TableWithPagination
        message="No Campaigns found"
        data={campaigns}
        isLoading={isLoading}
        columns={columns}
        paginationData={data}
        getRowId={(row) => row.id}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      /> */}
    </div>
  )
}

export default Campaign
