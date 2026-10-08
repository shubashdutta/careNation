export const getStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "ACTIVE":
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
          Active
        </span>
      )
    case "INACTIVE":
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
          Inactive
        </span>
      )
    case "DRAFT":
      return (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
          Draft
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
          Unknown
        </span>
      )
  }
}
