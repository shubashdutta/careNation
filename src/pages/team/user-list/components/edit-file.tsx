import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useEditFile from "../hooks/use-edit-file"
import { FileFormSchema, type FileFormSchemaType } from "../schema"
import type { IFile } from "../type"
import ExtendedForm from "@/components/extended-components/extended-form"
import FilterForm from "./file-form"

interface EditFileProps {
  File: IFile
}

const EditFile = ({ File }: EditFileProps) => {
  const form = useForm<FileFormSchemaType>({
    resolver: zodResolver(FileFormSchema),
    defaultValues: {
      name: File.name,
      url: File.url,
      description: File.description ?? "",
      file: File.file || "",
    },
  })

  const { editFile, isPending } = useEditFile(File, () => {
    form.reset()
  })
  const handleSubmit = (data: FileFormSchemaType) => {
    editFile(data)
  }

  return (
    <ExtendedForm
      form={form}
      onSubmit={handleSubmit}

      // onClose={onClose}
      submitText={"Filter"}
      showCancelBtn={true}
      cancelText={"Reset All"}
      submitBtnType={"submit"}
      isSubmitting={isPending}
    >
      <FilterForm />
    </ExtendedForm>
  )
}
export default EditFile
