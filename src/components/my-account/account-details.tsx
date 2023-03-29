import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
	useUpdateUserMutation,
	UpdateUserType,
} from "@framework/customer/use-update-customer";
import Cookies from "js-cookie";

const defaultValues = {};
const AccountDetails: React.FC = () => {
	const { mutate: updateUser, isLoading } = useUpdateUserMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateUserType>({
		defaultValues,
	});
	function onSubmit(input: UpdateUserType) {
		//updateUser(input);
		const auth_token = Cookies.get('auth_token')
		if (auth_token) {
			input.cookie = auth_token
			updateUser(input)
		}
	}

	return (
		<motion.div
			layout
			initial="from"
			animate="to"
			exit="from"
			//@ts-ignore
			variants={fadeInTop(0.35)}
			className={`w-full flex flex-col`}
		>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{"Detalhes da conta"}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 sm:space-y-5">
					<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
						<Input
							labelKey="Nome *"
							{...register("fullName", {
								required: "Este campo é obrigatorio",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.fullName?.message}
						/>
						<Input
							labelKey="Endereço *"
							{...register("address", {
								required: "Este campo é obrigatorio",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.address?.message}
						/>
					</div>
					<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
						<Input
							type="tel"
							labelKey="Número *"
							{...register("phoneNumber", {
								required: "Este campo é obrigatorio",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.phoneNumber?.message}
						/>
						<Input
							type="email"
							labelKey="forms:label-email-star"
							{...register("email", {
								required: "Este campo é obrigatorio",
								pattern: {
									value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "Email está no formato errado",
								},
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.email?.message}
						/>
					</div>
					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-12 mt-3 w-full sm:w-32"
						>
							{"Salvar"}
						</Button>
					</div>
				</div>
			</form>
		</motion.div>
	);
};

export default AccountDetails;
