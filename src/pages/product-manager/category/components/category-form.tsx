import { useFormContext } from "react-hook-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InputField } from "@/components/extended-components/extended-input"
import { InputTextarea } from "@/components/extended-components/input-textarea"
import InputSelect from "@/components/extended-components/input-select"
import ExtendedButton from "@/components/extended-components/extended-button"
import { SeoFields } from "@/components/shared/seo-fields"
import { toSlug } from "@/utils"
import type { CategoryFormSchemaType } from "../schema"
import type { ICategory, Step } from "../type"
import { getCategoryLoadOptions } from "@/utils/loadOptions"
import InputAsyncSelect from "@/components/extended-components/input-async-select"
import { InputUploadImage } from "@/components/extended-components/input-upload-image"
import uploadImage from "@/hooks/use-upload-image"

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
]

interface CategoryFormProps {
  categories: ICategory[]
  lockParents?: boolean
  step?: Step
  /** When provided, tab triggers become clickable (used outside the Add wizard, e.g. Edit). */
  onStepChange?: (step: Step) => void
}

export const CategoryForm = ({
  step = "basic",
  onStepChange,
  lockParents,
}: CategoryFormProps) => {
  const form = useFormContext<CategoryFormSchemaType>()
  const name = form.watch("name")
  const slug = form.watch("slug")

  const previewPath = `/cat/${slug || "your-slug"}`

  return (
    <Tabs
      defaultValue="basic"
      value={step}
      onValueChange={(value) => onStepChange?.(value as Step)}
      className="space-y-4"
    >
      <TabsList>
        <TabsTrigger value="basic">Basic info</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4">
        <InputAsyncSelect<CategoryFormSchemaType>
          name="parentId"
          title="Parent Category"
          placeholder="Select category"
          loadOptions={getCategoryLoadOptions}
          disabled={lockParents}
        />

        <InputField<CategoryFormSchemaType>
          name="name"
          label={"Name"}
          placeholder="Enter Name"
        />

        <div>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <InputField<CategoryFormSchemaType>
                name="slug"
                label="Slug"
                placeholder="url-friendly-identifier"
              />
            </div>
            <ExtendedButton
              type="button"
              variant="outline"
              text="Auto Generate"
              size="small"
              radius="medium"
              onClick={() =>
                form.setValue("slug", toSlug(name || ""), {
                  shouldValidate: true,
                })
              }
            />
          </div>
          <p className="mt-1 text-xs text-tertiary-300">
            URL-friendly identifier, auto-generated from name, or edit manually
          </p>
        </div>

        <InputSelect<CategoryFormSchemaType>
          name="status"
          title="Status"
          placeholder="Select status"
          options={STATUS_OPTIONS}
        />

        <InputTextarea<CategoryFormSchemaType>
          name="description"
          label="Description"
          placeholder="Short description"
        />
      </TabsContent>

      <TabsContent value="image">
        <InputUploadImage name="logo" onUpload={uploadImage} />
      </TabsContent>

      <TabsContent value="seo">
        <SeoFields<CategoryFormSchemaType> previewPath={previewPath} />
      </TabsContent>
    </Tabs>
  )
}
