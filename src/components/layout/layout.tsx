import { NextSeo } from "next-seo";
import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";
import CookieBar from "@components/common/cookie-bar";
import { useAcceptCookies } from "@utils/use-accept-cookies";
import Button from "@components/ui/button";

const Layout: React.FC = ({ children }) => {
	const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
	return (
		<div className="flex flex-col min-h-screen">
			<NextSeo
				additionalMetaTags={[
					{
						name: "viewport",
						content: "width=device-width, initial-scale=1.0",
					},
				]}
				title="Vapo Vapo Store"
				description="Vapo Vapo Store Tabacaria"
				canonical=""
				openGraph={{
					url: "",
					title: "Vapo Vapo Store",
					description:
						"Vapo Vapo Store Tabacaria",
					images: [
						{
							url: "",
							width: 800,
							height: 600,
							alt: "Og Image Alt",
						},
						{
							url: "",
							width: 900,
							height: 800,
							alt: "Og Image Alt Second",
						},
					],
				}}
			/>
			<Header />
			<main
				className="relative flex-grow"
				style={{
					minHeight: "-webkit-fill-available",
					WebkitOverflowScrolling: "touch",
				}}
			>
				{children}
			</main>
			<Footer />
			<MobileNavigation />
			<Search />
			<CookieBar
				title={"Este site usa cookies para melhorar sua experiencia. Ao clickar, você aceita nossos termos de privacidade."}
				hide={acceptedCookies}
				action={
					<Button onClick={() => onAcceptCookies()} variant="slim">
						{'Aceitar Cookies'}
					</Button>
				}
			/>
		</div>
	);
};

export default Layout;
