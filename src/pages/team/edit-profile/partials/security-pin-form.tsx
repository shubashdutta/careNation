import ExtendedForm from "@/components/extended-components/extended-form"
import { useForm } from "react-hook-form"
import { InputField } from "@/components/extended-components/extended-input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  changePinSchema,
  type changePinSchemaType,
} from "../hooks/use-security-pin"
import useChangePin from "../hooks/use-security-pin"

interface ChangePinProps {
  onClose: () => void
}

const SecurityPinForm = ({ onClose }: ChangePinProps) => {
  const form = useForm<changePinSchemaType>({
    resolver: zodResolver(changePinSchema),
    defaultValues: {
      newPin: "",
      confirmPin: "",
    },
  })

  const { changePin, isPending } = useChangePin(() => {
    form.reset()
    onClose()
  })

  const onSubmit = (data: changePinSchemaType) => {
    changePin(data)
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
        <InputField name="newPin" label="New PIN" type="password" />
        <InputField name="confirmPin" label="Confirm PIN" type="password" />
      </div>
    </ExtendedForm>
  )
}

export default SecurityPinForm
