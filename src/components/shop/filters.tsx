import { CategoryFilter } from "./category-filter";
import { SubCategoryFilter } from "./sub-category-filter";
import { FilteredItem } from "./filtered-item";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";

export const ShopFilters: React.FC = () => { 
	const router = useRouter();
	const { pathname, query } = router;
	return (
		<div className="pt-1">
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-xl md:text-2xl">
						{"Filtros"}
					</h2>
					<button
						className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
						aria-label="Clear All"
						onClick={() => {
							router.push(pathname);
						}}
					>
						{"Limpar Filtros"}
					</button>
				</div>
				<div className="flex flex-wrap -m-1.5 pt-2">
					{!isEmpty(query) &&
						Object.values(query)
							.join(",")
							.split(",")
							.map((v, idx) => (
								<FilteredItem
									itemKey={
										Object.keys(query).find((k) => query[k]?.includes(v))!
									}
									itemValue={v}
									key={idx}
								/>
							))}
				</div>
			</div>

			<CategoryFilter />
			<SubCategoryFilter />
		</div>
	);
};

// <BrandFilter />
