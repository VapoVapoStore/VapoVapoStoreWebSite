import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";

export const SubCategoryFilter = () => {
	const router = useRouter();
	const { pathname, query } = router;
	const { data, isLoading } = useCategoriesQuery({});
	const selectedSubCategories = query?.subcategory
		? (query.subcategory as string).split(",")
		: [];
	const selectedCategories = query?.category
		? (query.category as string).split(",")
		: [];
	const [formState, setFormState] = React.useState<string[]>(
		selectedSubCategories
	);

	React.useEffect(() => {
		setFormState(selectedSubCategories);
	}, [query?.subcategory]);

	if (isLoading) return <p>Loading...</p>;

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		const { subcategory, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { subcategory: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}

	const items = data?.categories.data;
	if (selectedCategories.length <= 0) return <></>
	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{"Sub Categorias"}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{items?.map((item: any) => (selectedCategories.includes(item.name)) ? (
					item.children.map((child: any) => (
						<>
							<CheckBox
								key={'subCategory' + child.id}
								label={child.name}
								name={child.name.toLowerCase()}
								checked={formState.includes(child.slug)}
								value={child.slug}
								onChange={handleItemClick}
							/>
						</>
					))
				) : (<></>))}
			</div>
		</div>
	);
};
