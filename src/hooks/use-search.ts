import { useSearchParams } from "react-router-dom";

const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const updateSearchParams = (params: { search?: string }) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    if (params.search !== undefined) {
      if (params.search === "" || params.search === null) {
        updatedSearchParams.delete("search");
      } else {
        updatedSearchParams.set("search", params.search);
      }
    }
    setSearchParams(updatedSearchParams);
  };
  const handleSearch = (val: string) => {
    updateSearchParams({ search: val });
  };

  return {
    handleSearch,
    search,
  };
};

export default useSearch;
