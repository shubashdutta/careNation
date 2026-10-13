import { useState } from "react"
import Breadcrumb from "@/components/shared/breadcrumb"
import ManageCategoryTable, {
  type CategoryRowData,
} from "./components/manage-category-table"
import AddCategoryView from "./components/add-category-view"
import AddCategoryWithSubsView from "./components/add-category-with-subs-view"

export type CategoryView = "manage" | "add" | "add-with-subs"

const initialCategories: CategoryRowData[] = [
  {
    id: 1,
    code: "CAT001",
    name: "Electronics",
    market: "Market A",
    business: "Business A",
    subcat: 3,
    active: true,
  },
  {
    id: 2,
    code: "CAT002",
    name: "Fashion",
    market: "Market B",
    business: "Business B",
    subcat: 5,
    active: true,
  },
  {
    id: 3,
    code: "CAT003",
    name: "Grocery",
    market: "Market A",
    business: "Business C",
    subcat: 2,
    active: false,
  },
  {
    id: 4,
    code: "CAT004",
    name: "Beauty",
    market: "Market C",
    business: "Business A",
    subcat: 4,
    active: true,
  },
  {
    id: 5,
    code: "CAT005",
    name: "Home & Living",
    market: "Market B",
    business: "Business B",
    subcat: 1,
    active: true,
  },
]

const Category = () => {
  const [view, setView] = useState<CategoryView>("manage")
  const [categories, setCategories] =
    useState<CategoryRowData[]>(initialCategories)

  const trail =
    view === "manage"
      ? ["Home", "Store Manager", "Category"]
      : view === "add"
        ? ["Home", "Store Manager", "Category", "Add Category"]
        : ["Home", "Store Manager", "Category", "Add Sub-Category"]

  const handleAddCategory = (name: string, subCount = 0) => {
    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        code: `CAT${String(prev.length + 1).padStart(3, "0")}`,
        name,
        market: "Market A",
        business: "Business A",
        subcat: subCount,
        active: true,
      },
    ])
    setView("manage")
  }

  return (
    <div className="space-y-5">
      {view === "manage" && (
        <>
          <Breadcrumb trail={trail} />
          <div className="px-1">
            <h1 className="text-xl font-bold text-[#2F234F]">
              Manage Category
            </h1>
            <p className="mt-1 text-sm text-slate-500">Category List</p>
          </div>
          <ManageCategoryTable
            categories={categories}
            onAdd={() => setView("add")}
          />
        </>
      )}

      {view === "add" && (
        <AddCategoryView
          trail={trail}
          onBack={() => setView("manage")}
          onAddSub={() => setView("add-with-subs")}
          onSave={(name) => handleAddCategory(name, 0)}
        />
      )}

      {view === "add-with-subs" && (
        <AddCategoryWithSubsView
          trail={trail}
          onBack={() => setView("manage")}
          onSave={(name, count) => handleAddCategory(name, count)}
        />
      )}
    </div>
  )
}

export default Category

