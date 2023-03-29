import { QueryOptionsType, ProductVapo } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

function shuffle(array:any) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export const fetchOnSellingProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
  let returnData = data
  returnData = shuffle(returnData)
  if (_params.per_page)
    returnData = data.slice(0, _params.per_page)
  return returnData as ProductVapo[];
};
export const useOnSellingProductsQuery = (options: QueryOptionsType) => {
  return useQuery<ProductVapo[], Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchOnSellingProducts
  );
};
