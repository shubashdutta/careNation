import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import { MatchingTreeSchema, type MatchingTreeSchemaType } from "../schema"
import MatchingTreeForm from "./matching-tree-form"
import MatchingTreeView from "./matching-tree-view"

const AddMatchingTreeFile = () => {
  const [showTree, setShowTree] = useState(false)

  const form = useForm<MatchingTreeSchemaType>({
    resolver: zodResolver(MatchingTreeSchema),
    defaultValues: {
      userId: "",
    },
  })

  const handleSubmit = (_data: MatchingTreeSchemaType) => {
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
        <MatchingTreeForm />
      </ExtendedForm>

      {/* Renders static mock tree component */}
      {showTree && <MatchingTreeView />}
    </div>
  )
}

export default AddMatchingTreeFile
