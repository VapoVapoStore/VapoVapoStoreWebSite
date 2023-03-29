
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const AgeGate: React.FC = () => {
	const { t } = useTranslation();
	const { closeModal } = useUI();
	const router = useRouter()

	function handlePositive() {
		Cookies.set('age-gate', 'true', { expires: 7 })
		router.push('/search')
	}

	function handleNegative() {
		Cookies.set('age-gate', 'false', { expires: 7 })
	}

	return (
		<div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{t("Você tem mais de 18 anos ?")}
				</p>
			</div>
			<div className="flex justify-center items-center flex-wrap mb-5 md:mb-6 ">
				<div className="relative">
					<Button
						className="h-11 md:h-12 w-2 mt-1.5 "
						onClick={handlePositive}
					>
						{t("Sim")}

					</Button>
				</div>
				<div className="relative">
					<Button
						className="h-11 md:h-12 w-2 mt-1.5 ml-12"
						onClick={handleNegative}
					>
						{t("Não")}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AgeGate;
