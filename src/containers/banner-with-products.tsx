
import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductCardListSmallLoader from "@components/ui/loaders/product-card-small-list-loader";
import { useOnSellingProductsQuery } from "@framework/product/get-all-on-selling-products";
import Alert from "@components/ui/alert";

interface ProductsProps {
	sectionHeading: string;
	categorySlug?: string;
	className?: string;
	variant?: "default" | "reverse";
}

const BannerWithProducts: React.FC<ProductsProps> = ({
	sectionHeading,
	categorySlug,
	variant = "default",
	className = "mb-12 md:mb-14 xl:mb-16",
}) => {
	const { data, isLoading, error } = useOnSellingProductsQuery({
		per_page: 9,
	});

	return (
		<div className={className}>
			<SectionHeader
				sectionHeading={sectionHeading}
				categorySlug={categorySlug}
			/>
			{error ? (
				<Alert message={error?.message} />
			) : (
					<div
						className={`col-span-full 3xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 xl:gap-7 ${variant === "reverse" ? "row-span-full" : ""
							}`}
					>
						{isLoading
							? Array.from({ length: 15 }).map((_, idx) => (
								<ProductCardListSmallLoader
									key={idx}
									uniqueKey={`on-selling-${idx}`}
								/>
							))
							: data?.map((product) => (
								<ProductCard
									key={`product--key${product.id}`}
									product={product}
									imgWidth={176}
									imgHeight={176}
									variant="listSmall"
								/>
							))}
					</div>
			)}
		</div>
	);
};

export default BannerWithProducts;
