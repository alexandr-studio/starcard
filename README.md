# Starcard

An Astro template for personal identity cards

Starcard is a reusable Astro template for a minimalist personal identity card with QR contact sharing and vCard support. It is configured via your Astro config, similar to Starlight.

## Use this template

Create a new project directly from this GitHub repository:

```sh
npm create astro@latest -- --template alexandr-studio/starcard
# or explicitly with a GitHub prefix
npm create astro@latest -- --template github:alexandr-studio/starcard
```

Alternatively, click "Use this template" on GitHub to generate your own repository and clone it locally.

## Quick start (develop this repo)

```sh
pnpm install
pnpm dev
```

## Requirements

- Node.js 18.17+ (Node 20+ recommended)
- pnpm (recommended) or npm/yarn

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
				company: "Your Company",
				companyUrl: "https://company.example",
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

## Icons (Iconify Simple Icons)

Starcard renders brand icons via Iconify’s Simple Icons set. Set `icon` on your sections/items to a Simple Icons name (lowercase). A few aliases are supported (e.g., `twitter` → `x`).

- Browse the set: [Iconify – Simple Icons](https://icon-sets.iconify.design/simple-icons/)
- Examples: `github`, `linkedin`, `x`, `bluesky`, `substack`, `mastodon`

Example configuration:

```ts
sections: [
	{
		order: 1,
		id: "socials",
		title: "Socials",
		icon: "social", // section icon, also uses Iconify
		items: [
			{ id: "github", icon: "github", url: "https://github.com/you" },
			{ id: "bluesky", icon: "bluesky", url: "https://bsky.app/profile/you" },
			{ id: "x", icon: "x", url: "https://x.com/you" },
			{ id: "substack", icon: "substack", url: "https://you.substack.com" },
		],
	},
];
```

## Features & benefits

- **Fast setup**: Scaffold, edit `astro.config.*`, and you’re ready
- **Mobile‑first sharing**: Touch devices open a QR dialog for any link
- **Desktop‑friendly**: Links open in a new tab; modifier‑click shows QR
- **vCard support**: Optional QR for quick “Add to Contacts”
- **Clean design**: Minimal, focused single‑page layout
- **SEO ready**: Title, description, keywords, canonical, OG/Twitter
- **Type‑safe config**: Zod‑validated options with a virtual module
- **Tailwind CSS v4**: Utility‑first styling and easy customization
- **Iconify icons**: Use any Simple Icons name via Iconify
- **Orderable sections**: Control section and item order with `order`

## License

MIT
