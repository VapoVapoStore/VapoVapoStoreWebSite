import { CategoriesQueryOptionsType, CategoryVapo } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCategories = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.CATEGORIES);
	return { categories: { data: data as CategoryVapo[] } };
};
export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
	return useQuery<{ categories: { data: CategoryVapo[] } }, Error>(
		[API_ENDPOINTS.CATEGORIES, options],
		fetchCategories
	);
};
