// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": "/src",
			},
		},
	},
	site: "https://alexandr.codes",
	integrations: [
		sitemap(),
		robotsTxt({
			host: "alexandr.studio",
			sitemap: "https://alexandr.studio/sitemap.xml",
			policy: [
				{
					userAgent: "*",
					allow: ["/"],
				},
			],
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
