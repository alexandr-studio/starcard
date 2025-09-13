// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import starcard from "./src/integrations/starcard.js";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://alexandr.codes",
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": "/src",
			},
		},
	},
	integrations: [
		sitemap(),
		starcard({
			meta: {
				title: "Alexander Sedeke",
				description: "Full-stack Developer & Videographer",
				keywords: [
					"astro",
					"astro-theme",
					"astro-template",
					"starcard",
					"profile",
					"vcard",
					"qr-code",
					"identity",
					"contact",
				],
				favicon: "/favicon.svg",
			},
			footer: {
				text: "© 2025 Alexander Sedeke",
			},
			profile: {
				displayName: "Alexander Sedeke",
				firstName: "Alexander",
				middleName: "",
				lastName: "Sedeke",
				title: "Full-stack Developer & Videographer",
				company: "Starcard Studio",
				companyUrl: "https://alexandr.studio",
				avatarUrl: "https://github.com/alexandrstudio.png",
				avatarRounded: "full",
				email: "alexandr@alexandr.codes",
				phone: "+420777123456",
				homePage: "https://alexandr.codes",
				location: "Prague, Czech Republic",
				vcard: true,
				sections: [
					{
						order: 1,
						id: "socials",
						title: "Socials",
						icon: "social",
						items: [
							{
								id: "linkedin",
								icon: "linkedin",
								url: "https://www.linkedin.com/in/alexander-sedeke",
							},
							{
								id: "x",
								icon: "twitter",
								url: "https://x.com/AlexandrCodes",
							},
							{
								id: "github",
								icon: "github",
								url: "https://github.com/alexandrstudio",
							},
							{
								id: "instagram",
								icon: "instagram",
								url: "https://www.instagram.com/alexandr.codes",
							},
							{
								id: "codepen",
								icon: "codepen",
								url: "https://codepen.io/studioalex",
							},
						],
					},
					{
						order: 1,
						id: "presence",
						title: "Presence",
						icon: "starfill",
						items: [
							{
								id: "youtube",
								icon: "youtube",
								url: "https://www.youtube.com/@happilylostinprague",
							},
							{
								id: "substack",
								icon: "substack",
								url: "https://substack.com/@alexandcodes",
							},
						],
					},
					{
						order: 3,
						id: "support",
						title: "Support",
						icon: "coffee",
						items: [
							{
								id: "buymeacoffee",
								icon: "linkedin",
								url: "https://www.linkedin.com/in/alexander-sedeke",
							},
						],
					},
				],
				legal: {
					title: "Legal",
					items: [
						{
							order: 1,
							id: "vatid",
							title: "VAT ID",
							value: "CZ1234567890",
						},
					],
				},
			},
		}),
	],
	experimental: {
		fonts: [
			{
				provider: fontProviders.google(),
				name: "Plus Jakarta Sans",
				cssVariable: "--font-plus-jakarta-sans",
				weights: [200, 300, 400, 500, 600, 700, 800, 900],
			},
		],
	},
});
