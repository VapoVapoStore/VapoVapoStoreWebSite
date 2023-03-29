import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";

type Props = {
	isDelivery: boolean
}

const CheckoutCard: React.FC<Props> = (props: Props) => {
	const { items, total, isEmpty } = useCart();
	const { price: subtotal } = usePrice({
		amount: total,
		currencyCode: "BRL",
	});
	const checkoutFooter = [
		{
			id: 1,
			name: "Sub Total",
			price: subtotal,
		},
		{
			id: 2,
			name: props.isDelivery ? "Entrega" : 'Retirada',
			price: props.isDelivery ? "Cobrança pelo Whatsapp" : '',
		},
		{
			id: 3,
			name: "Total",
			price: subtotal,
		},
	];
	return (
		<div className="pt-12 md:pt-0 2xl:ps-4">
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{"Seu Pedido"}
			</h2>
			<div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
				<span>{"Produto"}</span>
				<span className="ms-auto flex-shrink-0">{"Sub Total"}</span>
			</div>
			{!isEmpty ? (
				items.map((item) => <CheckoutItem item={item} key={item.id} />)
			) : (
				<p className="text-red-500 lg:px-3 py-4">{"Carrinho está Vazio"}</p>
			)}
			{checkoutFooter.map((item: any) => (
				<CheckoutCardFooterItem item={item} key={item.id} />
			))}
		</div>
	);
};

export default CheckoutCard;
