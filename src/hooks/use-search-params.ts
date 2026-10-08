import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function useSearchParamsHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const urlSearchParams = new URLSearchParams(searchParams);

  function setQueryParams(params: Record<string, unknown> | URLSearchParams) {
    if (params instanceof URLSearchParams) {
      params.forEach((value, key) => {
        urlSearchParams.set(key, String(value));
      });
    } else {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlSearchParams.set(key, String(value));
        }
      });
    }

    const search = urlSearchParams.toString();
    navigate(
      {
        pathname: location.pathname,
        search: search ? `?${search}` : "",
      },
      { replace: false }
    );
  }

  function removeAllSearchParams() {
    navigate(location.pathname, { replace: false });
  }

  function removeSearchParams(keys: string[]) {
    keys.forEach((key) => {
      urlSearchParams.delete(key);
    });

    const search = urlSearchParams.toString();
    navigate(
      {
        pathname: location.pathname,
        search: search ? `?${search}` : "",
      },
      { replace: false }
    );
  }

  return {
    searchParams: urlSearchParams,
    setSearchParams: setQueryParams,
    removeAllSearchParams,
    removeSearchParams,
  };
}
