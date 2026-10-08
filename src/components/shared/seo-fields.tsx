import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { InputField } from "@/components/extended-components/extended-input";

interface SeoFieldsProps<T extends FieldValues> {
  previewPath: string;
  metaTitleName?: Path<T>;
  metaDescriptionName?: Path<T>;
}

export function SeoFields<T extends FieldValues>({
  previewPath,
  metaTitleName = "metaTitle" as Path<T>,
  metaDescriptionName = "metaDescription" as Path<T>,
}: SeoFieldsProps<T>) {
  const form = useFormContext<T>();
  const metaTitle: string = form.watch(metaTitleName) || "";
  const metaDescription: string = form.watch(metaDescriptionName) || "";

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-medium tracking-wide text-tertiary-300 uppercase">
          Search engine preview
        </p>
        <div className="space-y-1 rounded-lg border border-dashed border-tertiary-75 p-4">
          <p className="text-[11px] font-medium tracking-wide text-tertiary-300">
            GOOGLE PREVIEW
          </p>
          <p className="text-sm text-success">{previewPath}</p>
          <p className="truncate text-sm text-blue">
            {metaTitle || "Meta title will appear here"}
          </p>
          <p className="text-xs text-tertiary-300">
            {metaDescription ||
              "meta description will appear here as a short summary in search results."}
          </p>
        </div>
      </div>

      <div>
        <InputField<T>
          name={metaTitleName}
          label="Meta title (recommended 50-60 chars)"
          placeholder="Meta title"
        />
        <p className="mt-1 text-right text-xs text-tertiary-300">
          {metaTitle.length}/60
        </p>
      </div>

      <div>
        <InputField<T>
          name={metaDescriptionName}
          label="Meta description (recommended 150-160 chars)"
          placeholder="Meta description"
        />
        <p className="mt-1 text-right text-xs text-tertiary-300">
          {metaDescription.length}/160
        </p>
      </div>
    </div>
  );
}
