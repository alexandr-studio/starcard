// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
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
});
