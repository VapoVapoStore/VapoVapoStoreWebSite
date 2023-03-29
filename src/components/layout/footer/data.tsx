import {
	IoLogoInstagram,
	IoLogoTwitter,
	IoLogoFacebook,
	IoLogoYoutube,
} from "react-icons/io5";

export const footer = {
	widgets: [
		{
			id: 1,
			widgetTitle: "widget-title-social",
			lists: [
				{
					id: 1,
					title: "link-instagram",
					path: "https://www.instagram.com/vapovapostore/",
					icon: <IoLogoInstagram />,
				},
				{
					id: 2,
					title: "link-twitter",
					path: "",
					icon: <IoLogoTwitter />,
				},
				{
					id: 3,
					title: "link-facebook",
					path: "https://www.facebook.com/vapovapomacapa/",
					icon: <IoLogoFacebook />,
				},
				{
					id: 4,
					title: "link-youtube",
					path: "",
					icon: <IoLogoYoutube />,
				},
			],
		},
		{
			id: 2,
			widgetTitle: "Contatos",
			lists: [
				{
					id: 1,
					title: "Email da Vapo Vapo",
					path: "vapovapostoremcp@gmail.com",
				},
				{
					id: 2,
					title: "Chama no Zap",
					path: "https://api.whatsapp.com/send/?phone=5596984006399&text&type=phone_number&app_absent=0",
				},
			],
		},
		{
			id: 3,
			widgetTitle: "widget-title-about",
			lists: [
				{
					id: 1,
					title: "link-support-center",
					path: "/contact-us",
				},
				{
					id: 2,
					title: "link-customer-support",
					path: "/",
				},
				{
					id: 3,
					title: "link-about-us",
					path: "/contact-us",
				},
				{
					id: 4,
					title: "link-copyright",
					path: "/",
				},
			],
		},
		{
			id: 4,
			widgetTitle: "widget-title-customer-care",
			lists: [
				{
					id: 1,
					title: "link-faq",
					path: "/faq",
				},
				{
					id: 2,
					title: "link-shipping",
					path: "/",
				},
				{
					id: 3,
					title: "link-exchanges",
					path: "/",
				},
			],
		},
		{
			id: 5,
			widgetTitle: "widget-title-our-information",
			lists: [
				{
					id: 1,
					title: "link-privacy",
					path: "/privacy",
				},
				{
					id: 2,
					title: "link-terms",
					path: "/terms",
				},
				{
					id: 3,
					title: "link-return-policy",
					path: "/privacy",
				},
				{
					id: 4,
					title: "link-site-map",
					path: "/",
				},
			],
		},
		{
			id: 6,
			widgetTitle: "widget-title-top-categories",
			lists: [
				{
					id: 1,
					title: "link-men-wear",
					path: "/search",
				},
				{
					id: 2,
					title: "link-men-wear",
					path: "/search",
				},
				{
					id: 3,
					title: "link-kids-wear",
					path: "/search",
				},
				{
					id: 4,
					title: "link-sports-wear",
					path: "/search",
				},
			],
		},
	],
	payment: [
		{
			id: 1,
			path: "https://www.instagram.com/vapovapostore/",
			image: "/assets/images/instagram.svg",
			name: "social-instagram",
			width: 35,
			height: 20,
		},
		{
			id: 2,
			path: "https://www.facebook.com/vapovapomacapa/",
			image: "/assets/images/facebook.svg",
			name: "social-facebook",
			width: 35,
			height: 20,
		},
		{
			id: 3,
			path: "https://api.whatsapp.com/send/?phone=5596984006399&text&type=phone_number&app_absent=0",
			image: "/assets/images/whatsapp.svg",
			name: "social-whatsapp",
			width: 35,
			height: 20,
		},
	],
};
