import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import { ProfileSchema, type ProfileSchemaType } from "../schema"
import ProfileForm from "./profile-form"
import ProfileView from "./profile-view"

const Profile = () => {
  const [showTree, setShowTree] = useState(true)

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      userId: "",
    },
  })

  const handleSubmit = (_data: ProfileSchemaType) => {
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
        <ProfileForm />
      </ExtendedForm>

      {/* Renders static mock tree component */}
      {showTree && <ProfileView />}
    </div>
  )
}

export default Profile
