import ProductsBlock from "@containers/products-block";
import { useNewArrivalProductsQuery } from "@framework/product/get-all-new-arrival-products";

export default function NewArrivalsProductFeed() {
	const { data, isLoading, error } = useNewArrivalProductsQuery({
		per_page: 8,
	});

	return (
		<ProductsBlock
			sectionHeading="Novos na Vapo"
			products={data}
			loading={isLoading}
			error={error?.message}
			uniqueKey="new-arrivals"
		/>
	);
}
