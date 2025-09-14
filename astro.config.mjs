// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import starcard from "./src/integrations/starcard.js";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	build: {
		inlineStylesheets: "always",
	},
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
				title: "Your Name",
				description: "Short bio or tagline",
				keywords: ["astro-template", "profile", "vcard", "portfolio"],
				favicon: "/favicon.svg",
			},
			footer: {
				text: "© 2025 Your Name",
			},
			profile: {
				displayName: "Your Name",
				firstName: "Your",
				middleName: "",
				lastName: "Name",
				title: "Full‑stack Developer",
				company: "Your Company",
				companyUrl: "https://company.example",
				avatarUrl: "https://github.com/your-avatar.png",
				avatarRounded: "full",
				email: "you@example.com",
				phone: "+123456789",
				homePage: "https://example.com",
				location: "City, Country",
				vcard: true,
				sections: [
					{
						order: 1,
						id: "socials",
						title: "Socials",
						icon: "chatbot",
						items: [
							{
								id: "github",
								icon: "linkedin",
								url: "https://github.com/you",
							},
						],
					},
					{
						order: 1,
						id: "presence",
						title: "Presence",
						icon: "chromewebstore",
						items: [
							{
								id: "youtube",
								icon: "youtube",
								url: "https://www.youtube.com/@your-channel",
							},
						],
					},
					{
						order: 3,
						id: "support",
						title: "Support",
						icon: "buymeacoffee",
						items: [
							{
								id: "buymeacoffee",
								icon: "buymeacoffee",
								url: "https://buymeacoffee.com/you",
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
