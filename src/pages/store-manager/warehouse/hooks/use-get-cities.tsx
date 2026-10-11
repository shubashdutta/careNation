import axiosInstance from "@/lib/axios-instance";
import { END_POINT } from "@/constant/end-point";
import type { AsyncSelectLoadOptions } from "@/components/extended-components/async-select";

const PAGE_SIZE = 10;

interface CityApiItem {
  id: string;
  name: string;
}

export const loadCityOptions = (state: string): AsyncSelectLoadOptions =>
  async (search, _loadedOptions, additional) => {
    const page = additional?.page ?? 1;

    const response = await axiosInstance.get(END_POINT.WAREHOUSE.CITIES, {
      params: { state: state || undefined, search: search || undefined, page, perPage: PAGE_SIZE },
    });

    const data: CityApiItem[] = response.data?.data ?? [];
    const options = data.map((city) => ({
      label: city.name,
      value: city.id,
    }));

    return {
      options,
      hasMore: options.length === PAGE_SIZE,
      additional: { page: page + 1 },
    };
  };
