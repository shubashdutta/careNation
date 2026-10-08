import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import { MyStructureSchema, type MyStructureSchemaType } from "../schema"
import MyStructureForm from "./my-structure-form"
import MyStructureView from "./my-structure-view"

const AddMyStructureFile = () => {
  const [showTree, setShowTree] = useState(false)

  const form = useForm<MyStructureSchemaType>({
    resolver: zodResolver(MyStructureSchema),
    defaultValues: {
      userId: "",
    },
  })

  const handleSubmit = (_data: MyStructureSchemaType) => {
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
        <MyStructureForm />
      </ExtendedForm>

      {/* Renders static mock tree component */}
      {showTree && <MyStructureView />}
    </div>
  )
}

export default AddMyStructureFile
