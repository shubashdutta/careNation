import { useSearchParams } from "react-router-dom";

const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") ?? "";

  const updateSearchParams = (params: { status?: string }) => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (value === "") {
          updatedSearchParams.delete(key);
        } else {
          updatedSearchParams.set(key, value);
        }
      }
    });

    setSearchParams(updatedSearchParams);
  };

  return {
    status,
    updateSearchParams,
  };
};

export default useFilter;
