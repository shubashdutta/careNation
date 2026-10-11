import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import ConfirmationModal from "@/components/shared/confirmation-modal"
import useDisclosure from "@/hooks/use-disclosure"
import useChangeBrandStatus from "../hooks/use-change-brand-status"

const StatusSwitch = ({
  id,
  status,
}: {
  id: string
  status: "ACTIVE" | "INACTIVE"
}) => {
  const [value, setValue] = useState(status === "ACTIVE")
  const [pendingValue, setPendingValue] = useState<boolean | null>(null)
  const { isOpen, open, close } = useDisclosure()

  const { handleStatusChange, isPending } = useChangeBrandStatus({
    onSuccess: () => {
      if (pendingValue !== null) setValue(pendingValue)
      setPendingValue(null)
      close()
    },
  })

  const action = pendingValue ? "enable" : "disable"

  const handleClose = () => {
    if (isPending) return
    setPendingValue(null)
    close()
  }

  return (
    <>
      <Switch
        checked={value}
        onCheckedChange={(next) => {
          setPendingValue(next)
          open()
        }}
      />

      <ConfirmationModal
        open={isOpen}
        onClose={handleClose}
        onReject={() => setPendingValue(null)}
        title={`${pendingValue ? "Enable" : "Disable"} Brand`}
        description={`Are you sure you want to ${action} this brand?`}
        confirmText="Confirm"
        loading={isPending}
        onConfirm={() => {
          if (pendingValue === null) return
          handleStatusChange({
            id,
            status: pendingValue ? "ACTIVE" : "INACTIVE",
          })
        }}
      />
    </>
  )
}

export default StatusSwitch
