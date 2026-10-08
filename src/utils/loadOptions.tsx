import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import type {
  AsyncSelectAdditional,
  OptionType,
} from "@/components/extended-components/async-select"
import type { AsyncSelectLoadOptions } from "@/components/extended-components/async-select"

interface CategoryRecord {
  id: string
  name: string
  numericId?: string
  title?: string
  children?: CategoryRecord[]
}

export const mapOption = (
  item: CategoryRecord,
  label: string = item.name || item.title || item.numericId || ""
): OptionType => ({
  value: item.id,
  label,
})

/**
 * Flattens the nested category tree into a single list of options, so
 * children show up alongside their parents. Child labels are prefixed
 * with the parent's name (e.g. "Electronics / Mobile Phones") so they're
 * distinguishable from top-level categories in the dropdown.
 */
const flattenCategoryRecords = (
  records: CategoryRecord[],
  parentLabel?: string
): OptionType[] =>
  records.flatMap((item) => {
    const label = parentLabel ? `${parentLabel} - ${item.name}` : item.name
    const children = item.children ?? []

    return [mapOption(item, label), ...flattenCategoryRecords(children, label)]
  })

export const getCategoryLoadOptions: AsyncSelectLoadOptions = async (
  inputValue,
  _loadedOptions,
  additional
) => {
  const page = additional?.page ?? 1
  const limit = 50

  try {
    const { data } = await axiosInstance.get("", {
      params: { search: inputValue, page, limit },
    })

    const records: CategoryRecord[] = data?.data?.records ?? []
    const options = flattenCategoryRecords(records)

    const hasMore = Boolean(data?.data?.hasNext)

    return {
      options,
      hasMore,
      additional: { page: page + 1 },
    }
  } catch (error) {
    console.error("Error loading category options:", error)
    return {
      options: [],
      hasMore: false,
      additional: { page },
    }
  }
}

export const getBrandLoadOptions: AsyncSelectLoadOptions = async (
  inputValue,
  _loadedOptions,
  additional
) => {
  const page = additional?.page ?? 1
  const limit = 50

  try {
    const { data } = await axiosInstance.get(END_POINT.BRAND.LIST, {
      params: { search: inputValue, page, limit },
    })

    const records: { id: string; name: string }[] = data?.data?.records ?? []
    const options = records.map((item) => mapOption(item, item.name))

    const hasMore = Boolean(data?.data?.hasNext)
    return {
      options,
      hasMore,
      additional: { page: page + 1 },
    }
  } catch (error) {
    console.error("Error loading brand options:", error)
    return {
      options: [],
      hasMore: false,
      additional: { page },
    }
  }
}

export const getAttributeLoadOptions: AsyncSelectLoadOptions = async (
  inputValue,
  _loadedOptions,
  additional
) => {
  const page = additional?.page ?? 1
  const limit = 50
  const { data } = await axiosInstance.get("", {
    params: { search: inputValue, page, limit },
  })

  const records: { id: string; name: string }[] = data?.data?.records ?? []

  const options = records?.map((item: any) => ({
    value: item.id,
    label: item.name,
  })) as OptionType[]

  const hasMore = Boolean(data?.data?.hasNext)
  return {
    options,
    hasMore,
    limit,
    values: records,
    additional: { page: page + 1 },
  }
}

const PRODUCT_VARIANT_SEARCH_ENDPOINT = "/product-varient"

export const loadProductVariantOptions = async (
  inputValue: string,
  _loadedOptions: OptionType[],
  additional?: AsyncSelectAdditional
): Promise<{
  options: OptionType[]
  hasMore: boolean
  additional: AsyncSelectAdditional
}> => {
  const page = additional?.page ?? 1

  try {
    const response = await axiosInstance.get(PRODUCT_VARIANT_SEARCH_ENDPOINT, {
      params: { search: inputValue, page },
    })
    const raw = response.data?.data
    const variants = Array.isArray(raw) ? raw : (raw?.records ?? [])
    const hasNext = Array.isArray(raw) ? false : Boolean(raw?.hasNext)

    const options: OptionType[] = variants.map((variant: any) => ({
      label: variant?.id,
      value: variant.id,
    }))

    return {
      options,
      hasMore: hasNext,
      additional: { page: page + 1 },
    }
  } catch (err) {
    return {
      options: [],
      hasMore: false,
      additional: { page },
    }
  }
}

export const roleLoadOptions: AsyncSelectLoadOptions = async (
  inputValue,
  _loadedOptions,
  additional
) => {
  const page = additional?.page ?? 1
  const limit = 50
  try {
    const { data } = await axiosInstance.get("", {
      params: { search: inputValue, page, limit },
    })

    const records: { id: string; description: string }[] =
      data?.data?.records ?? []
    //@ts-ignore
    const options = records.map((item) => mapOption(item, item?.name))

    const hasMore = Boolean(data?.data?.hasNext)

    return {
      options,
      hasMore,
      additional: { page: page + 1 },
    }
  } catch (error) {
    console.error("Error loading role options:", error)
    return {
      options: [],
      hasMore: false,
      additional: { page },
    }
  }
}
export const accountLoadOptions: AsyncSelectLoadOptions = async (
  inputValue,
  _loadedOptions,
  additional
) => {
  const page = additional?.page ?? 1
  const limit = 50
  try {
    const { data } = await axiosInstance.get("/account", {
      params: { search: inputValue, page, limit },
    })

    const records: { id: string; name: string }[] = data?.data?.records ?? []
    //@ts-ignore
    const options = records.map((item) => mapOption(item, item?.type))

    const hasMore = Boolean(data?.data?.hasNext)

    return {
      options,
      hasMore,
      additional: { page: page + 1 },
    }
  } catch (error) {
    console.error("Error loading account options:", error)
    return {
      options: [],
      hasMore: false,
      additional: { page },
    }
  }
}
