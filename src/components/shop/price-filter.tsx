import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
const priceFilterItems = [
	{
		id: "1",
		name: "Abaixo de R$50",
		slug: "0-50",
	},
	{
		id: "2",
		name: "R$50 ate R$100",
		slug: "50-100",
	},
	{
		id: "3",
		name: "R$100 ate R$150",
		slug: "100-150",
	},
	{
		id: "4",
		name: "R$150 ate R$200",
		slug: "150-200",
	},
	{
		id: "5",
		name: "R$200 ate R$300",
		slug: "200-300",
	},
	{
		id: "6",
		name: "R$300 ate $500",
		slug: "300-500",
	},
	{
		id: "7",
		name: "Acima de R$500",
		slug: "500-",
	},
];
export const PriceFilter = () => {
	const router = useRouter();
	const { pathname, query } = router;
	const selectedPrices = query?.price ? (query.price as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedPrices);
	React.useEffect(() => {
		setFormState(selectedPrices);
	}, [query?.price]);
	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		// setFormState(currentFormState);
		const { price, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { price: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}
	const items = priceFilterItems;

	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{"Preço"}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{items?.map((item: any) => (
					<CheckBox
						key={item.id}
						label={item.name}
						name={item.name.toLowerCase()}
						checked={formState.includes(item.slug)}
						value={item.slug}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
