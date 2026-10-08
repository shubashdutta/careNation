import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import { FileFormSchema, type FileFormSchemaType } from "../schema"
import useAddFile from "../hooks/use-add-team-member"
import { FileForm } from "@/pages/content-manager/file-manager/components/file-form"

interface AddFileProps {
  onClose: () => void
}

const AddFile = ({ onClose }: AddFileProps) => {
  const form = useForm<FileFormSchemaType>({
    resolver: zodResolver(FileFormSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
      file: "",
    },
  })

  const { addFile, isPending } = useAddFile(() => {
    form.reset()
    onClose()
  })

  const handleSubmit = (data: FileFormSchemaType) => {
    addFile(data)
  }
  return (
    <ExtendedForm
      form={form}
      onSubmit={handleSubmit}

      onClose={onClose}
      submitText={"Create"}
      cancelText={"Cancel"}
      submitBtnType={"submit"}
      isSubmitting={isPending}
    >
      <FileForm />
    </ExtendedForm>
  )
}

export default AddFile
