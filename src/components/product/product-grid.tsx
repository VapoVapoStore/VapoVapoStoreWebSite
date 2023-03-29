

import type { FC } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("@components/product/product-card"))


interface ProductGridProps {
	className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
	const { query } = useRouter();
	const {
		isFetching: isLoading,
		data,
		error,
	} = useProductsQuery({ per_page: 10, ...query });
	if (error) return <p>{error.message}</p>;


	return (
		<>
			<div
				className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{isLoading && !data?.pages?.length ? (
					<ProductFeedLoader limit={20} uniqueKey="search-product" />
				) : (
					data?.pages?.map((page) => {
						return page?.data?.map((product) => (
							<ProductCard
								key={'product-key-' + product.id}
								product={product}
								variant="grid"
							/>
						));
					})
				)}
			</div>
		</>
	);
};
