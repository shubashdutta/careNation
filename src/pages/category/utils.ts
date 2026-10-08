import type { ICategory } from "./type"

export const findById = (
  categories: ICategory[],
  id: string
): ICategory | undefined => {
  for (const category of categories) {
    if (category.id === id) return category
    if (category.children) {
      const found = findById(category.children, id)
      if (found) return found
    }
  }
  return undefined
}

export const findParentOf = (
  categories: ICategory[],
  childId: string
): ICategory | undefined => {
  for (const category of categories) {
    if (category.children?.some((child) => child.id === childId)) {
      return category
    }
    if (category.children) {
      const found = findParentOf(category.children, childId)
      if (found) return found
    }
  }
  return undefined
}
