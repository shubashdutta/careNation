import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ExtendedForm from "@/components/extended-components/extended-form"
import useAddFile from "../hooks/use-add-file"
import FilterForm from "./file-form"
import { FileFormSchema, type FileFormSchemaType } from "../schema"

const AddFile = () => {
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
  })

  const handleSubmit = (data: FileFormSchemaType) => {
    addFile(data)
  }
  return (
    <ExtendedForm
      form={form}
      onSubmit={handleSubmit}

      submitText={"Create"}
      cancelText={"Cancel"}
      submitBtnType={"submit"}
      isSubmitting={isPending}
    >
      <FilterForm />
    </ExtendedForm>
  )
}

export default AddFile
