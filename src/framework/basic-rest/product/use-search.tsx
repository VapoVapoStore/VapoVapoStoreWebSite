import { QueryOptionsType, ProductVapo } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchSearchedProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
  const returnData = data.filter((item: any) => item.name.toLowerCase().includes(_params.text.toLowerCase()))
  return returnData;
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<ProductVapo[], Error>(
    [API_ENDPOINTS.SEARCH, options],
    fetchSearchedProducts
  );
};
