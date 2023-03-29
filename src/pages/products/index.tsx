import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';

export default function Products() {
	const router = useRouter()
	useEffect(() => {
		router.push('/search')
	});
	return (
		<>
			<Container>
			</Container>
		</>
	);
}

Products.Layout = Layout;