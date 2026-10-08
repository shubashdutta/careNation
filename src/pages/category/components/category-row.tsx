import { useState } from "react"
import { ChevronDown, ImageIcon } from "lucide-react"
import ExtendedDialog from "@/components/extended-components/extended-dialog"
import ConfirmationModal from "@/components/shared/confirmation-modal"
import RowActions from "@/components/shared/row-actions"
import useDisclosure from "@/hooks/use-disclosure"
import useDeleteCategory from "../hooks/use-delete-category"
import useChangeCategoryStatus from "../hooks/use-change-category-status"
import EditCategory from "./edit-category"
import type { ICategory } from "../type"

const CategoryRow = ({
  category,
  categories,
}: {
  category: ICategory
  categories: ICategory[]
}) => {
  const [expanded, setExpanded] = useState(false)
  const editModal = useDisclosure()
  const deleteModal = useDisclosure()

  const { deleteCategory, isPending: isDeleting } = useDeleteCategory({
    onSuccess: deleteModal.close,
  })
  const { handleStatusChange, isPending: isChangingStatus } =
    useChangeCategoryStatus()

  const canExpand = category.children && category.children.length > 0
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex items-center gap-3 rounded-lg p-3 ${"bg-white shadow-sm"}`}
      >
        {category.logo ? (
          <img
            src={category.logo}
            alt={category.name}
            className="h-10 w-10 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <ImageIcon className="h-4 w-4 text-tertiary-300" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-tertiary-100">
            {category.name}
          </p>
          {/* {level < 2 && (
            <p className="truncate text-xs text-tertiary-300">
              {category.slug}
            </p>
          )} */}
        </div>

        {/* {hasChildren && (
          <span className="shrink-0 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-500">
            {category.children!.length} sub
          </span>
        )} */}

        {
          <button
            type="button"
            disabled={isChangingStatus}
            onClick={() =>
              handleStatusChange({
                id: category.id,
                status: category.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
              })
            }
            className={`shrink-0 cursor-pointer rounded-full px-2.5 py-0.5 text-xs font-medium ${
              category.status === "ACTIVE"
                ? "bg-success1 text-success"
                : "bg-gray-100 text-tertiary-300"
            }`}
          >
            {category.status === "ACTIVE" ? "activate" : "INACTIVE"}
          </button>
        }

        <RowActions
          entity="category"
          onEdit={editModal.open}
          onDelete={deleteModal.open}
        />

        {canExpand && (
          <button
            type="button"
            aria-label="Toggle children"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-tertiary-300"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {expanded && canExpand && (
        <div className="mt-2 ml-6 space-y-2 border-l border-gray-100 py-1 pl-4">
          {category.children?.map((child) => (
            <CategoryRow
              key={child.id}
              category={child}
              categories={categories}
            />
          ))}
        </div>
      )}

      <ExtendedDialog
        open={editModal.isOpen}
        onOpenChange={editModal.set}
        title={`Edit Category`}
      >
        <EditCategory
          category={category}
          categories={categories}
          onClose={editModal.close}
        />
      </ExtendedDialog>

      <ConfirmationModal
        open={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete category"
        description={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        loading={isDeleting}
        onConfirm={() => deleteCategory(category.id)}
      />
    </div>
  )
}

export default CategoryRow
