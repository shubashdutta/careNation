import { useFormContext } from "react-hook-form"
import { InputField } from "@/components/extended-components/extended-input"
import { InputTextarea } from "@/components/extended-components/input-textarea"
import ExtendedButton from "@/components/extended-components/extended-button"
import type { BrandFormSchemaType } from "../schema"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { InputUploadImage } from "@/components/extended-components/input-upload-image"
import uploadImage from "../../../hooks/use-upload-image"
import { toSlug } from "@/utils"

export const BrandForm = ({ step }: { step: string }) => {
  const form = useFormContext<BrandFormSchemaType>()
  const name = form.watch("name")

  return (
    <div className="my-2">
      <Tabs value={step}
      >
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>

          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <div className="flex flex-col gap-4">
            <InputField
              name="name"
              label="Brand Name"
              placeholder="Brand Name"
            />
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <InputField<BrandFormSchemaType>
                  name="slug"
                  label="Slug"
                  placeholder="url-friendly-identifier"
                />
              </div>
              <ExtendedButton
                disabled={!name}
                type="button"
                variant="outline"
                text="Auto Generate"
                className="mt-6 h-11"
                onClick={() =>
                  form.setValue("slug", toSlug(name ?? ""), {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
              />
            </div>
            <InputTextarea
              name="description"
              label="Description"
              placeholder="Description"
            />
          </div>
        </TabsContent>

        <TabsContent value="image">
          <InputUploadImage name="logo" onUpload={uploadImage} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
