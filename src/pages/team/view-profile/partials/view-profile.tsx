import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import { ViewProfileSchema, type ViewProfileSchemaType } from "../schema"
import ViewProfileForm from "./view-profile-form"
import ViewProfileView from "./view-profile-view"

const AddViewProfileFile = () => {
  const [showTree, setShowTree] = useState(false)

  const form = useForm<ViewProfileSchemaType>({
    resolver: zodResolver(ViewProfileSchema),
    defaultValues: {
      userId: "",
    },
  })

  const handleSubmit = (_data: ViewProfileSchemaType) => {
    // Statically show tree immediately on click without calling BE API
    setShowTree(true)
  }

  return (
    <div className="space-y-6">
      <ExtendedForm
        form={form}
        onSubmit={handleSubmit}
        submitText={"Submit"}
        cancelText={"Cancel"}
        submitBtnType={"submit"}
      >
        <ViewProfileForm />
      </ExtendedForm>

      {/* Renders static mock tree component */}
      {showTree && <ViewProfileView />}
    </div>
  )
}

export default AddViewProfileFile
