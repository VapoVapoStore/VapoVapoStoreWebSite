import React, { useState } from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useRouter } from "next/router";
import { useProductQuery } from "@framework/product/get-product";
import { getVariations } from "@framework/utils/get-variations";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { ProductAttributes } from "./product-attributes";
import isEmpty from "lodash/isEmpty";
import Link from "@components/ui/link";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";

const productGalleryCarouselResponsive = {
	"768": {
		slidesPerView: 2,
	},
	"0": {
		slidesPerView: 1,
	},
};

const ProductSingleDetails: React.FC = () => {
	const {
		query: { slug },
	} = useRouter();
	const { width } = useWindowSize();
	const { data, isLoading } = useProductQuery(slug as string);
	const { addItemToCart } = useCart();
	const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
	const [quantity, setQuantity] = useState(1);
	const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
	const { price, basePrice, discount } = usePrice(
		data && {
			amount: data.sale_price ? data.sale_price : data.price,
			baseAmount: data.price,
			currencyCode: "BRL",
		}
	);
	if (isLoading) return <p>Loading...</p>;
	const variations = getVariations(data?.variations);

	const isSelected = !isEmpty(variations)
		? !isEmpty(attributes) &&
		Object.keys(variations).every((variation) =>
			attributes.hasOwnProperty(variation)
		)
		: true;

	function addToCart() {
		if (!isSelected) return;
		// to show btn feedback while product carting
		setAddToCartLoader(true);
		setTimeout(() => {
			setAddToCartLoader(false);
		}, 600);

		const item = generateCartItem(data!);
		addItemToCart(item, quantity);
		toast("Adicionado ao Carrinho", {
			type: "dark",
			progressClassName: "fancy-progress-bar",
			position: width > 768 ? "bottom-right" : "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
	}

	function handleAttribute(attribute: any) {
		setAttributes((prev) => ({
			...prev,
			...attribute,
		}));
	}

	return (
		<div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
			{width < 1025 ? (
				<Carousel
					pagination={{
						clickable: true,
					}}
					breakpoints={productGalleryCarouselResponsive}
					className="product-gallery"
					buttonClassName="hidden"
				>
					<SwiperSlide key={`product-image-key-${data?.id}`}>
						<div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
							<img
								src={
									data?.image ?data?.image:
									"/assets/placeholder/products/product-gallery.svg"
								}
								alt={`${data?.name}--${data?.id}`}
								className="object-cover w-full"
							/>
						</div>
					</SwiperSlide>
					{data?.gallery?.map((item: any) => (
						<SwiperSlide key={`product-gallery-key-${data.id}`}>
							<div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
								<img
									src={
										item ? item:
										"/assets/placeholder/products/product-gallery.svg"
									}
									alt={`${data?.name}--${data.id}`}
									className="object-cover w-full"
								/>
							</div>
						</SwiperSlide>
					))}
				</Carousel>
			) : (
				<div className="col-span-5 grid grid-cols-2 gap-2.5"><SwiperSlide key={`product-image-key-${data?.id}`}>
					<div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
						<img
							src={
								data?.image ?data?.image:
								"/assets/placeholder/products/product-gallery.svg"
							}
							alt={`${data?.name}--${data?.id}`}
							className="object-cover w-full"
						/>
					</div>
				</SwiperSlide>
					{data?.gallery?.map((item: any) => (
						<div
							key={data.id}
							className="col-span-1 transition duration-150 ease-in hover:opacity-90"
						>
							<img
								src={
									item ? item:
									"/assets/placeholder/products/product-gallery.svg"
								}
								alt={`${data?.name}--${data.id}`}
								className="object-cover w-full"
							/>
						</div>
					))}
				</div>
			)}

			<div className="col-span-4 pt-8 lg:pt-0">
				<div className="pb-7 mb-7 border-b border-gray-300">
					<h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
						{data?.name}
					</h2>
					<p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
						{data?.description}
					</p>
					<div className="flex items-center mt-5">
						<div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							{price}
						</div>
						{discount && (
							<span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
								{basePrice}
							</span>
						)}
					</div>
				</div>

				<div className="pb-3 border-b border-gray-300">
					{Object.keys(variations).map((variation) => {
						return (
							<ProductAttributes
								key={variation}
								title={variation}
								attributes={variations[variation]}
								active={attributes[variation]}
								onClick={handleAttribute}
							/>
						);
					})}
				</div>
				<div className="flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b border-gray-300 py-8">
					<Counter
						quantity={quantity}
						onIncrement={() => setQuantity((prev) => prev + 1)}
						onDecrement={() =>
							setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
						}
						disableDecrement={quantity === 1}
					/>
					<Button
						onClick={addToCart}
						variant="slim"
						className={`w-full md:w-6/12 xl:w-full ${!isSelected && "bg-gray-400 hover:bg-gray-400"
							}`}
						disabled={!isSelected}
						loading={addToCartLoader}
					>
						<span className="py-2 3xl:px-8">Adicionar ao Carrinho</span>
					</Button>
				</div>
				<div className="py-6">
					<ul className="text-sm space-y-5 pb-1">
						{data?.category?.name && <li>
							<span className="font-semibold text-heading inline-block pe-2">
								Categoria:
							</span>
							<Link
								href={"/search?category=" + data?.category?.name}
								className="transition hover:underline hover:text-heading"
							>
								{data?.category?.name}
							</Link>
						</li>}
						{data?.category?.sub_category_name && <li>
							<span className="font-semibold text-heading inline-block pe-2">
								Sub Categoria:
							</span>
							<Link
								href={"/search?subcategory=" + data?.category?.sub_category_name}
								className="transition hover:underline hover:text-heading"
							>
								{data?.category?.sub_category_name}
							</Link>
						</li>}
					</ul>
				</div>
			</div>
		</div>
	);
};
// <ProductMetaReview data={data} />

export default ProductSingleDetails;
