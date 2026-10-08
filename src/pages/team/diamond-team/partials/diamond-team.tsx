import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import {
  GoldTeamSchema,
  type GoldTeamSchemaType,
} from "@/pages/team/gold-team/schema"
import GoldTeamForm from "@/pages/team/gold-team/partials/gold-team-form"
import GoldTeamView from "@/pages/team/gold-team/partials/gold-team-view"
import useAdGoldTeam from "@/pages/team/gold-team/hooks/use-gold-team"

const DiamondTeamContent = () => {
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
        <GoldTeamView team={treeData} teamLabel="Diamond" />
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

export default DiamondTeamContent
