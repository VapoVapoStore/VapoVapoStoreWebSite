import { QueryOptionsType, ProductVapo } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";



function compare(a: any, b: any) {
  const bandA = new Date(a.created_on).getTime();
  const bandB = new Date(b.created_on).getTime();

  if (bandA > bandB) {
    return -1
  } else if (bandA < bandB) {
    return 1
  }
  return 0
}

export const fetchNewArrivalProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
  let returnData = data
  returnData = returnData.sort((a: any, b: any) => compare(a, b))
  if (_params.per_page)
    returnData = data.slice(0, _params.per_page)
  return returnData as ProductVapo[];
};
export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {
  return useQuery<ProductVapo[], Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchNewArrivalProducts
  );
};
