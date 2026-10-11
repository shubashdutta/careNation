"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { InputField } from "@/components/extended-components/extended-input"

type FilterMode = "single" | "cycle"

export const singleSchema = z.object({
  filterMode: z.literal("single"),
  userName: z.string().min(1, "User name is required"),
})

export const cycleSchema = z.object({
  filterMode: z.literal("cycle"),
  cycleOn: z.string().min(1, "Cycle date is required"),
})

export const filterSearchSchema = z.discriminatedUnion("filterMode", [
  singleSchema,
  cycleSchema,
])

export type FilterSearchFormData = z.infer<typeof filterSearchSchema>

interface FilterSearchProps {
  filterMode: FilterMode
  onFilterModeChange: (mode: FilterMode) => void
  onSubmit: (data: FilterSearchFormData) => void
}

const FilterSearch = ({
  filterMode,
  onFilterModeChange,
  onSubmit,
}: FilterSearchProps) => {
  const form = useForm<FilterSearchFormData>({
    resolver: zodResolver(filterSearchSchema),
    mode: "onChange",
    defaultValues:
      filterMode === "single"
        ? { filterMode: "single", userName: "" }
        : { filterMode: "cycle", cycleOn: "" },
  })

  const handleModeChange = (mode: FilterMode) => {
    onFilterModeChange(mode)
    form.reset(
      mode === "single"
        ? { filterMode: "single", userName: "" }
        : { filterMode: "cycle", cycleOn: "" }
    )
  }

  return (
    <div className="space-y-6 rounded-lg border border-border bg-white p-6">
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Select</Label>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="single"
              checked={filterMode === "single"}
              onCheckedChange={() => handleModeChange("single")}
            />
            <Label htmlFor="single" className="cursor-pointer font-normal">
              Single
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="cycle"
              checked={filterMode === "cycle"}
              onCheckedChange={() => handleModeChange("cycle")}
            />
            <Label htmlFor="cycle" className="cursor-pointer font-normal">
              Cycle Wise
            </Label>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-co l gap-6 md:flex-row md:items-end"
        >
          <div className="flex">
            {filterMode === "single" ? (
              <InputField
                name="userName"
                label="User Name"
                placeholder="Search user"
                isRequired={true}
                className="w-80"
              />
            ) : (
              <InputField
                type="date"
                name="cycleOn"
                label="Cycle On"
                placeholder="Select Date"
                isRequired={true}
                className="w-80"
              />
            )}
          </div>

          <div className="flex items-center pb-0.5">
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="h-10 gap-2 bg-green-500 px-6 hover:bg-green-600"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </form>
      </Form>

      <div className="border-t pt-4">
        <p className="text-xs text-tertiary-500">
          <span className="font-semibold">Previous Payment Lot:</span>
          <a href="#" className="ml-1 text-primary underline">
            Commit Payment
          </a>
          ,
          <a href="#" className="ml-1 text-primary underline">
            Rollback Payment
          </a>
          ,
          <a href="#" className="ml-1 text-primary underline">
            Details
          </a>
        </p>
      </div>
    </div>
  )
}

export default FilterSearch
