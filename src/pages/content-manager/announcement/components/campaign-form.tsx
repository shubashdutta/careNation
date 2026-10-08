import { useFormContext } from "react-hook-form"
import type { CampaignFormSchemaType } from "../schema"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const CampaignForm = ({ step }: { step: string }) => {
  const form = useFormContext<CampaignFormSchemaType>()
  console.log("error", form.formState.errors)

  return (
    <div className="my-2">
      <Tabs value={step}>
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>

          <TabsTrigger value="configuration">Configuration</TabsTrigger>

          <TabsTrigger value="vendor-eligibility">
            Vendor Eligibility
          </TabsTrigger>

          <TabsTrigger value="product-eligibility">
            Product Eligibility
          </TabsTrigger>

          <TabsTrigger value="schedule">Schedule</TabsTrigger>

          <TabsTrigger value="rules">Rules</TabsTrigger>

          <TabsTrigger value="terms">Terms</TabsTrigger>

          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          {/* <div className="flex flex-col gap-4">
            <InputField
              name="name"
              label="Campaign Name"
              placeholder="Campaign Name"
            />
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <InputField<CampaignFormSchemaType>
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
          </div> */}
          {/* <CampaignBasicForm /> */}
        </TabsContent>

        {/* <TabsContent value="configuration">
          <CampaignConfigurationForm />
        </TabsContent>
        <TabsContent value="vendor-eligibility">
          <VendorEligibilityForm />
        </TabsContent>
        <TabsContent value="product-eligibility">
          <ProductEligibilityForm />
        </TabsContent>
        <TabsContent value="schedule">
          <ScheduleForm />
        </TabsContent>
        <TabsContent value="rules">
          <RulesForm />
        </TabsContent>
        <TabsContent value="terms">
          <Terms />
        </TabsContent>
        <TabsContent value="preview">
          <CampaignPreview />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
