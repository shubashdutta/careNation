import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import ExtendedForm from "@/components/extended-components/extended-form"
import InputSelect from "@/components/extended-components/input-select"
import { InputTextarea } from "@/components/extended-components/input-textarea"
import {
  GoldTeamSchema,
  type GoldTeamSchemaType,
} from "@/pages/team/gold-team/schema"
import GoldTeamForm from "@/pages/team/gold-team/partials/gold-team-form"
import GoldTeamView from "@/pages/team/gold-team/partials/gold-team-view"
import useAdGoldTeam from "@/pages/team/gold-team/hooks/use-gold-team"
import { TeamViewStatusSchema, type TeamViewStatusSchemaType } from "../schema"

const STATUS_OPTIONS = [
  { label: "Province Name", value: "province-name" },
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
]

const ChangeStatusForm = () => {
  const form = useForm<TeamViewStatusSchemaType>({
    resolver: zodResolver(TeamViewStatusSchema),
    defaultValues: {
      orderStatus: "",
      remark: "",
    },
  })

  const handleSubmit = (_data: TeamViewStatusSchemaType) => {
    toast.success("Team status updated successfully")
  }

  return (
    <section className="rounded-lg bg-white p-5">
      <h2 className="mb-5 text-[15px] font-medium text-[#322A53]">
        Change Status
      </h2>
      <ExtendedForm
        form={form}
        onSubmit={handleSubmit}
        submitText="Submit"
        cancelText="Cancel"
        showCancelBtn
      >
        <div className="grid gap-5 md:grid-cols-2">
          <InputSelect
            name="orderStatus"
            title="Order Status"
            placeholder="Select status"
            options={STATUS_OPTIONS}
            className="h-10 rounded-md border-[#D3D4D6] bg-white text-sm"
          />
          <InputTextarea
            name="remark"
            label="Remark"
            placeholder="Add remark"
            rows={4}
            className="min-h-24 resize-none rounded-md border-[#D3D4D6] bg-white text-sm"
          />
        </div>
      </ExtendedForm>
    </section>
  )
}

const TeamViewContent = () => {
  const form = useForm<GoldTeamSchemaType>({
    resolver: zodResolver(GoldTeamSchema),
    defaultValues: {
      userId: "",
    },
  })

  const { AdGoldTeam, isPending, treeData } = useAdGoldTeam("Diamond")

  return (
    <div className="space-y-6">
      {treeData ? (
        <>
          <GoldTeamView team={treeData} teamLabel="Diamond" />
          <ChangeStatusForm />
        </>
      ) : (
        <ExtendedForm
          form={form}
          onSubmit={(data) => AdGoldTeam(data)}
          submitText="Submit"
          cancelText="Cancel"
          submitBtnType="submit"
          isSubmitting={isPending}
        >
          <GoldTeamForm />
        </ExtendedForm>
      )}
    </div>
  )
}

export default TeamViewContent
