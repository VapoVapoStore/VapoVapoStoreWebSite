
import Layout from "@components/layout/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AccountPage() {
	const router = useRouter()

	useEffect(() => {
		router.push('my-account/account-details')
	  });

	return (<></>
	);
}

AccountPage.Layout = Layout;
