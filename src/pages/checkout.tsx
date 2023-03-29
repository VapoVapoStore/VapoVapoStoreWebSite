import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import CheckoutForm from "@components/checkout/checkout-form";
import CheckoutCard from "@components/checkout/checkout-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useState } from "react";
import CheckoutFormDelivery from "@components/checkout/checkout-form-delivery";
export default function CheckoutPage() {
	//@ts-ignore
	const [deliveryMethods, setDeliveryMethods] = useState(['Retirada', 'Entrega'])
	const Add = deliveryMethods.map(Add=>Add)
	const [isDelivery, setIsDelivery] = useState(true)

	const handleSelectChange = (e:any) => {
		if(e.target.value == 0)
			setIsDelivery(false)
		else
			setIsDelivery(true)
	}

	return (
		<>
			<Container>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{"Tipo de Entrega"}
			</h2>
				<div className="relative w-full lg:max-w-sm">
					<select className="w-full p-2  bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-black"
					onChange={e=>handleSelectChange(e)}>
						{Add.map((method, key)=><option value={key}>{method}</option>)}
					</select>
				</div>

				<div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">

					<div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
						{isDelivery ? <CheckoutForm /> : <CheckoutFormDelivery />
						}
					</div>
					<div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
						<CheckoutCard isDelivery={isDelivery} />
					</div>
				</div>
				<Subscription />
			</Container>

		</>
	);
}

CheckoutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
