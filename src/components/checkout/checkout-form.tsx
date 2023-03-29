import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import Router from "next/router";
import { useCart } from "@contexts/cart/cart.context";
import usePrice from "@framework/product/use-price";

interface CheckoutInputType {
	fullName: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	zipCode: string;
	save: boolean;
	note: string;
	district: string;
}

const CheckoutForm: React.FC = () => {
	const { mutate: updateUser, isLoading } = useCheckoutMutation();
	const { items, total, isEmpty } = useCart();
	const { price: subtotal } = usePrice({
		amount: total,
		currencyCode: "BRL",
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();

	function onSubmit(input: CheckoutInputType) {
		if (isEmpty)
			return
		updateUser(input)
		let url = 'https://api.whatsapp.com/send?phone=559684006399&text='
		let text = `
		Olá, gostaria de pedir para entrega *${items.map((item: any) => ' '+item.name)}* \n
		Detalhes - \n
		Nome: ${input.fullName} \n
		Preço Total: ${subtotal} \n
		Número: ${input.phone} \n
		Endereço: ${input.address} - ${input.district} \n
		Cep: ${input.zipCode} \n
		Nota: ${input.note} \n
		`
		Router.push(url + text);
	}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{"Endereço para entrega"}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 lg:space-y-5">
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="Nome completo *"
							{...register("fullName", {
								required: "Este campo é obrigatorio",
							})}
							errorKey={errors.fullName?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
						/><Input
							labelKey="CEP *"
							{...register("zipCode", {
								required: "Este campo é obrigatorio",
							})}
							errorKey={errors.zipCode?.message}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
						/>
					</div>
					<Input
						labelKey="Endereço *"
						{...register("address", {
							required: "Este campo é obrigatorio",
						})}
						errorKey={errors.address?.message}
						variant="solid"
					/>
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							type="tel"
							labelKey="Número *"
							{...register("phone", {
								required: "Este campo é obrigatorio",
							})}
							errorKey={errors.phone?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>

						<Input
							labelKey="Bairro *"
							{...register("district", {
								required: "Este campo é obrigatorio",
							})}
							errorKey={errors.district?.message}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
						/>
					</div>
					<div className="relative flex items-center ">
						<CheckBox labelKey="Salvar Informacoes para a Proxima Compra" />
					</div>
					<TextArea
						labelKey="Notas para o vendedor (Opcional)"
						{...register("note")}
						placeholderKey="Notas para o vendedor, como algo que precisamos saber na entrega"
						className="relative pt-3 xl:pt-6"
					/>
					<div className="flex w-full">
						<Button
							className="w-full sm:w-auto"
							loading={isLoading}
							disabled={isLoading}
						>
							{"Comprar"}
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default CheckoutForm;
