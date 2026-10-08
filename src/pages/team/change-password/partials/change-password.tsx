import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Form } from "@/components/ui/form"
import ExtendedForm from "@/components/extended-components/extended-form"
import { InputField } from "@/components/extended-components/extended-input"
import ExtendedButton from "@/components/extended-components/extended-button"
import GoldTeamForm from "@/pages/team/gold-team/partials/gold-team-form"
import useAdGoldTeam from "@/pages/team/gold-team/hooks/use-gold-team"
import {
  GoldTeamSchema,
  type GoldTeamSchemaType,
} from "@/pages/team/gold-team/schema"
import { PATH } from "@/constant/path"
import {
  ChangePasswordSchema,
  type ChangePasswordSchemaType,
} from "@/pages/team/edit-profile/hooks/use-change-password"

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[minmax(135px,1fr)_minmax(0,2fr)] gap-3 text-xs text-[#6B7280]">
    <span>{label}</span>
    <span className="truncate text-[#7B7B7B]">: {value}</span>
  </div>
)

const PasswordResult = ({
  userId,
  onCancel,
}: {
  userId?: string
  onCancel: () => void
}) => {
  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = (_data: ChangePasswordSchemaType) => {
    toast.success("Password changed successfully")
    form.reset()
  }

  return (
    <div className="space-y-4">
      <section className="rounded-lg bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-[15px] font-medium text-[#322A53]">
          Distributor Detail
        </h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-x-16">
          <div className="space-y-4">
            <DetailItem label="User ID" value={userId || "9827720454"} />
            <DetailItem label="Date Of Joining" value="08/05/2025" />
            <DetailItem label="Introducer User ID" value="9765235898" />
          </div>
          <div className="space-y-4">
            <DetailItem label="Name" value="Anita Gautam" />
            <DetailItem label="Designation" value="No Designation" />
            <DetailItem label="Introducer Name" value="Achut Shrestha" />
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-[#4B5563]">
            Change Password
          </h2>
          <button
            type="button"
            className="text-xs font-medium text-[#EF4444] hover:text-[#DC2626]"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid max-w-md gap-4">
              <InputField
                name="newPassword"
                label="New Password"
                placeholder="-New Password-"
                type="password"
                isPassword
              />
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="-Confirm Password-"
                type="password"
                isPassword
              />
            </div>
            <div className="flex justify-end">
              <ExtendedButton type="submit" text="Done" className="w-24" />
            </div>
          </form>
        </Form>
      </section>
    </div>
  )
}

const ChangePasswordContent = () => {
  const lookupForm = useForm<GoldTeamSchemaType>({
    resolver: zodResolver(GoldTeamSchema),
    defaultValues: { userId: "" },
  })
  const navigate = useNavigate()
  const { AdGoldTeam, isPending, treeData } = useAdGoldTeam("Change Password")

  return treeData ? (
    <PasswordResult
      userId={treeData.userId || treeData.id}
      onCancel={() => navigate(PATH.team.changePassword)}
    />
  ) : (
    <section className="rounded-lg bg-white p-5 shadow-sm">
      <ExtendedForm
        form={lookupForm}
        onSubmit={(data) => AdGoldTeam(data)}
        submitText="Submit"
        cancelText="Cancel"
        submitBtnType="submit"
        isSubmitting={isPending}
      >
        <GoldTeamForm />
      </ExtendedForm>
    </section>
  )
}

export default ChangePasswordContent
