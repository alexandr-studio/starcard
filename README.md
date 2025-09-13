# Starcard – an Astro template for personal identity cards

Starcard is a reusable Astro template for a minimalist personal identity card with QR contact sharing and vCard support. It is configured via your Astro config, similar to Starlight.

## Quick start

```sh
pnpm install
pnpm dev
```

## Configure via astro.config

Add the Starcard integration and provide your site meta, footer text, and profile. You can keep everything in one place in `astro.config.mjs` (or `.ts`).

```ts
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import starcard from "./src/integrations/starcard.js";

export default defineConfig({
	site: "https://example.com",
	integrations: [
		sitemap(),
		starcard({
			meta: {
				title: "Your Name",
				description: "Short bio or tagline",
				keywords: ["profile", "vcard", "portfolio"],
				favicon: "/favicon.svg",
			},
			footer: { text: "© 2025 Your Name" },
			profile: {
				displayName: "Your Name",
				firstName: "Your",
				lastName: "Name",
				title: "Full‑stack Developer",
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
						icon: "social",
						items: [
							{ id: "github", icon: "github", url: "https://github.com/you" },
						],
					},
				],
				legal: {
					title: "Legal",
					items: [{ order: 1, id: "vatid", title: "VAT ID", value: "CZ..." }],
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
```

## How it works

- The integration validates your configuration with Zod and exposes a virtual module: `virtual:starcard/config`.
- Components and pages import from that module to render your profile and metadata.
- `Layout.astro` sets `<title>`, description, keywords, canonical, Open Graph, and Twitter tags using your meta config. Favicon is also configurable.
- `index.astro` renders your profile (Persona, Info, sections, legal). Sections and items are rendered in ascending `order`.

## Customization

- Replace `public/favicon.svg` or set `meta.favicon` in config.
- Add or edit icons in `src/components/icons/` and refer to them by filename (lowercase) in your profile items.
- Update colors via CSS variables in `src/styles/theme.css` or extend Tailwind.

## Deploy

```sh
pnpm build
pnpm preview
```

Deploy the `dist/` folder to your host (e.g., Netlify, Vercel, GitHub Pages). Ensure `site` is set in `astro.config` for correct sitemap and canonical URLs.

## License

MIT
