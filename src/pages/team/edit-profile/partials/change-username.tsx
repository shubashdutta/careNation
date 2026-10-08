import ExtendedForm from "@/components/extended-components/extended-form"
import { useForm } from "react-hook-form"
import { InputField } from "@/components/extended-components/extended-input"
import { zodResolver } from "@hookform/resolvers/zod"
import useChangeUsername, {
  ChangeUsernameSchema,
  type ChangeUsernameSchemaType,
} from "../hooks/use-change-username"

interface ChangeUsernameProps {
  onClose: () => void
}

const ChangeUsername = ({ onClose }: ChangeUsernameProps) => {
  const form = useForm<ChangeUsernameSchemaType>({
    resolver: zodResolver(ChangeUsernameSchema),
    defaultValues: {
      newUsername: "",
    },
  })

  const { ChangeUsername, isPending } = useChangeUsername(() => {
    form.reset()
    onClose()
  })

  const onSubmit = (data: ChangeUsernameSchemaType) => {
    ChangeUsername(data)
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
        <InputField name="newUsername" label="New Username" />
      </div>
    </ExtendedForm>
  )
}

export default ChangeUsername
