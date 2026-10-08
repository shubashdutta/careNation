import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import { GoldTeamSchema, type GoldTeamSchemaType } from "../schema"
import GoldTeamForm from "./gold-team-form"
import GoldTeamView from "./gold-team-view"
import useAdGoldTeam from "../hooks/use-gold-team"

const AddGoldTeamFile = () => {
  const form = useForm<GoldTeamSchemaType>({
    resolver: zodResolver(GoldTeamSchema),
    defaultValues: {
      userId: "",
    },
  })

  const { AdGoldTeam, isPending, treeData } = useAdGoldTeam()

  return (
    <div className="space-y-6">
      {treeData ? (
        <GoldTeamView team={treeData} />
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

export default AddGoldTeamFile
