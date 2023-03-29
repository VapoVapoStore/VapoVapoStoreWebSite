import { QueryOptionsType, ProductVapo } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useInfiniteQuery } from "react-query";

type PaginatedProduct = {
	data: ProductVapo[];
	paginatorInfo: any;
};

function compare(a: any, b: any, sort_by: any) {
	const bandA = a.sale_price
	const bandB = b.sale_price

	if (bandA > bandB) {
		return sort_by == 'low-high' ? 1 : -1
	} else if (bandA < bandB) {
		return sort_by == 'low-high' ? -1 : 1
	}
	return 0
}

const fetchProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
	let returnData = data.filter((item: any) => item.quantity !== 0);
	if (_params.category) {
		var categories = _params.category.split(',')
		returnData = returnData.filter((item: any) => item.category != null ? categories.includes(item.category.name) : null)
	}
	if (_params.subcategory) {
		var subcategories = _params.subcategory.split(',')
		returnData = returnData.filter((item: any) => item.category != null ? subcategories.includes(item.category.sub_category_name) : null)
	}
	if (_params.price) {
		var prices = _params.price.split(',')
		var filterdData: any = []
		prices.forEach(function (price: any) {
			var values = price.split('-')
			filterdData.push(returnData.filter((item: any) => item.sale_price >= values[0] && item.sale_price <= values[1] ? values[1] : 1000000))
		})
		returnData = filterdData.reduce((initial: any, current: any) => initial.concat(current), [])
	}
	if (_params.sort_by) {
		if (_params.sort_by == 'low-high' || _params.sort_by == 'high-low')
			returnData = returnData.sort((a: any, b: any) => compare(a, b, _params.sort_by))
	}
	if (_params.q) {
		returnData = data.filter((item: any) => item.name.toLowerCase().includes(_params.q.toLowerCase()))
	}
	return {
		data: returnData,
		paginatorInfo: {
			nextPageUrl: "",
		},
		hasNextPage: false
	};
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedProduct, Error>(
		[API_ENDPOINTS.PRODUCTS, options],
		fetchProducts,
		{
			getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
		}
	);
};

export { useProductsQuery, fetchProducts };
