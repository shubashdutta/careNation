import { Plus } from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"
import ExtendedButton from "@/components/extended-components/extended-button"
import ExtendedDialog from "@/components/extended-components/extended-dialog"
import useDisclosure from "@/hooks/use-disclosure"
import CategoryRow from "./components/category-row"
import AddCategory from "./components/add-category"
import useGetCategories from "./hooks/use-get-categories"
import type { ICategory } from "./type"

const breadcrumbTrail = ["Home", "Product Management", "Category"]

const Category = () => {
  const addModal = useDisclosure()
  const { categories, isLoading } = useGetCategories()
  console.log(categories, "CATEGORIES")

  return (
    <div className="space-y-4">
      <Breadcrumb
        trail={breadcrumbTrail}
        title="Category"
        action={
          <ExtendedButton
            text="Add Category"
            radius="medium"
            icon={<Plus className="h-3.5 w-3.5" />}
            onClick={addModal.open}
          />
        }
      />

      <div className="space-y-3">
        {isLoading ? (
          <div>Loading categories...</div>
        ) : (
          categories?.records?.map((category: ICategory) => (
            <CategoryRow
              key={category.id}
              category={category}
              categories={categories}
            />
          ))
        )}
      </div>

      <ExtendedDialog
        open={addModal.isOpen}
        onOpenChange={addModal.set}
        title="Add Category"
      >
        <AddCategory
          level={0}
          categories={categories}
          onClose={addModal.close}
        />
      </ExtendedDialog>
    </div>
  )
}

export default Category
