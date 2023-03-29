import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import AgeGate from "@components/auth/age-gate-form";

export default function SignInPage() {
	return (
		<>
			<Container>
				<div className="py-16 lg:py-20">
					<AgeGate />
				</div>
			</Container>
		</>
	);
}


SignInPage.Layout = Layout;