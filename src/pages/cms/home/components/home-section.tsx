import { InputField } from "@/components/extended-components/extended-input"
import { InputTextarea } from "@/components/extended-components/input-textarea"
import { InputUploadImage } from "@/components/extended-components/input-upload-image"
import uploadImage from "@/hooks/use-upload-image"
import { DynamicTextList } from "./dynamic-text-list"
import { ServicesSection } from "./services-section"
import type { HomeSectionFormSchemaType } from "../schema"

export function HomeSectionForm() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Home Hero Section</h2>
        <p className="text-xs text-gray-400">
          Manage the homepage hero banner and service highlights
        </p>
      </div>

      <InputField<HomeSectionFormSchemaType>
        name="sectionName"
        label="Section Name"
        placeholder="Home Hero Section"
      />

      <InputField<HomeSectionFormSchemaType>
        name="heroText"
        label="Hero Text"
        placeholder="Build your business with our marketplace"
      />

      <InputTextarea<HomeSectionFormSchemaType>
        name="sectionSubtitle"
        label="Section Subtitle"
        placeholder="Everything you need in one place"
      />

      <InputUploadImage<HomeSectionFormSchemaType>
        name="sectionImage"
        title="Section Banner"
        onUpload={uploadImage}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DynamicTextList
          name="marketPlaceText"
          label="Marketplace Text"
          placeholder="e.g. Trusted Marketplace"
        />
        <DynamicTextList
          name="supportingText"
          label="Supporting Text"
          placeholder="e.g. Quality Products"
        />
        <DynamicTextList
          name="marketPlace"
          label="Marketplace Roles"
          placeholder="e.g. Vendor"
        />
      </div>

      <div className="border-t border-gray-100 pt-6">
        <ServicesSection />
      </div>
    </div>
  )
}
