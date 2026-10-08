import { useSearchParams } from "react-router-dom";

type FilterKeyFrom<T extends readonly string[]> = T[number];
type FilterParams<T extends readonly string[]> = Partial<
  Record<FilterKeyFrom<T>, string>
>;

const useFilterItem = <T extends readonly string[]>(FILTER_KEYS: T) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialized = true;

  const isFilterOpen = searchParams.get("isFilterOpen") === "true";

  const filterValues = FILTER_KEYS.reduce(
    (acc, key) => {
      acc[key as FilterKeyFrom<T>] = searchParams.get(key) ?? "";
      return acc;
    },
    {} as Record<FilterKeyFrom<T>, string>
  );

  const updateSearchParams = (params: FilterParams<T>) => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        updatedSearchParams.delete(key);
      } else {
        updatedSearchParams.set(key, value as string);
      }
    });

    if (isFilterOpen) {
      updatedSearchParams.set("isFilterOpen", "true");
    }

    setSearchParams(updatedSearchParams, { replace: false });
  };

  const handleResetFilter = () => {
    const newSearchParams = new URLSearchParams();
    if (isFilterOpen) {
      newSearchParams.set("isFilterOpen", "true");
    }

    setSearchParams(newSearchParams, { replace: true });
  };

  return {
    ...filterValues,
    updateSearchParams,
    handleResetFilter,
    isInitialized,
  };
};

export default useFilterItem;
