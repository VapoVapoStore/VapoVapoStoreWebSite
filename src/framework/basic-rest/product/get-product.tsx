import { ProductVapo } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchProduct = async (_slug: string) => {
	const { data } = await http.get(`${API_ENDPOINTS.PRODUCTS}`);
	let returnData = data.filter((item: any) => item.slug == _slug)
	if (returnData.length == 1)
		returnData = returnData[0]
	return returnData;
};
export const useProductQuery = (slug: string) => {
	return useQuery<ProductVapo, Error>([API_ENDPOINTS.PRODUCTS, slug], () =>
		fetchProduct(slug)
	);
};
