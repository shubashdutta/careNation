import ExtendedForm from "@/components/extended-components/extended-form"
import { useForm } from "react-hook-form"
import { InputField } from "@/components/extended-components/extended-input"
import { zodResolver } from "@hookform/resolvers/zod"
import useChangePassword, {
  ChangePasswordSchema,
  type ChangePasswordSchemaType,
} from "../hooks/use-change-password"

interface ChangePasswordProps {
  onClose: () => void
}

const ChangePassword = ({ onClose }: ChangePasswordProps) => {
  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const { ChangePassword, isPending } = useChangePassword(() => {
    form.reset()
    onClose()
  })

  const onSubmit = (data: ChangePasswordSchemaType) => {
    ChangePassword(data)
  }

  return (
    <ExtendedForm
      form={form}
      onSubmit={onSubmit}
      onClose={onClose}
      submitText="Create"
      showCancelBtn={true}
      cancelText="Cancel"
      isSubmitting={isPending}
    >
      <div className="space-y-4">
        <InputField name="newPassword" label="New Password" type="password" />
        <InputField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
        />
      </div>
    </ExtendedForm>
  )
}

export default ChangePassword
