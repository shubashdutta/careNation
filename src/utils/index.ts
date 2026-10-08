export * from "./format-currency"
export * from "./format-date"
export * from "./get-cookie"
export * from "./format-string"
export * from "./format-number"

//this needs to eb segregrated

/**
 * Check if object is empty
 */
export const isEmptyObject = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0
}

/**
 * Delay/timeout function for async operations
 */
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Remove duplicate items from array
 */
export const uniqueArray = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr))
}

/**
 * Shuffle an array
 */
export const shuffleArray = <T>(arr: T[]): T[] => {
  return arr.sort(() => Math.random() - 0.5)
}

/**
 * Convert string to slug (URL friendly)
 */
export const toSlug = (str: string) => {
  console.log("toSlug", str)
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 2) => {
  return `${value.toFixed(decimals)}%`
}

/**
 * Get query parameters from URL
 */
export const getQueryParam = (param: string) => {
  if (typeof window === "undefined") return null
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

/**
 * Scroll to top of the page
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

/**
 *
 * Copy to clipboard
 */
export const copyToClipboard = (text: string) =>
  navigator.clipboard.writeText(text)

// export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//   if (type === "number") {
//     const allowedKeys = [
//       "Backspace",
//       "Tab",
//       "ArrowLeft",
//       "ArrowRight",
//       "Delete",
//       "+",
//       "-",
//       " ",
//     ];

//     if (e.ctrlKey && ["c", "a", "v", "x"].includes(e.key.toLowerCase())) {
//       return;
//     }

//     if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
//       e.preventDefault();
//     }
//   }
// };

// export const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
//   if (type === "number") {
//     (e.target as HTMLInputElement).blur();
//   }
// };

export const removeCertainValuesFromArray = (
  array: { id?: string; field: string; display: boolean }[],
  valuesToRemove: string[]
) => {
  return array.filter((item) => !valuesToRemove.includes(item.field))
}

export const urlToFile = async (url: string, filename: string) => {
  const res = await fetch(url)
  const blob = await res.blob()
  const type = blob.type || "image/jpeg"
  return new File([blob], filename, { type })
}

export const convertToHours = (reminder: string) => {
  if (!reminder) return 0

  const [value, unit] = reminder.split("_")

  switch (unit) {
    case "minutes":
      return Number(value) / 60
    case "hours":
      return Number(value)
    case "days":
      return Number(value) * 24
    default:
      return 0
  }
}

export function getFileExtension(fileUrl: string): string {
  try {
    const parts = fileUrl.split(".")
    return parts.length > 1 ? parts.pop() || "" : ""
  } catch {
    return ""
  }
}

export function getFileName(fileUrl: string): string {
  try {
    return fileUrl.split("/").pop() || ""
  } catch {
    return ""
  }
}

export const getTimeInDays = (dateString?: string) => {
  if (!dateString) return ""

  const createdDate = new Date(dateString)
  const now = new Date()

  const diffMs = now.getTime() - createdDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "Today"
  } else if (diffDays === 1) {
    return "Yesterday"
  } else {
    return `${diffDays} days ago`
  }
}
