import { PackageSearch } from "lucide-react"

const NoData = ({ title = "No Data Found" }: { title?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-tertiary-300">
      <PackageSearch className="h-8 w-8" />
      <p className="text-sm">{title}</p>
    </div>
  )
}

export default NoData
