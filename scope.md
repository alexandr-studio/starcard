# Scope — Starcard (Astro identity card template)

Starcard is a reusable Astro template/integration that renders a minimalist personal identity card with QR-powered link sharing and vCard support. It is configured via your Astro config and exposed through a virtual module at `virtual:starcard/config`.

## Purpose

- **One‑page identity card** with profile, contact, sections, and optional legal info
- **Frictionless sharing**: touch devices show a QR dialog; desktop opens links in a new tab
- **Contact save**: optional vCard QR for quick "Add to Contacts"

## In scope

- Astro 5 project using Tailwind CSS v4 via `@tailwindcss/vite`
- Integration‑driven configuration (validated with Zod) in `astro.config.*`
- Virtual config module: `virtual:starcard/config`
- Components: `Persona`, `Info`, `Section`, `Field`, `TouchLink`, `LinkDialog`, `QRcode`, `LegalSection`
- Icon set for common platforms (GitHub, YouTube, LinkedIn, etc.)
- SEO meta: title, description, keywords, canonical, Open Graph, Twitter
- Theming via CSS variables in `src/styles/theme.css` and experimental Google Fonts

## Out of scope / non‑goals

- Backend services, databases, or user authentication
- Dynamic user content editing (CMS)
- Analytics or tracking by default
- Payment processing or gated content
- i18n system (single‑language markup; content is configurable)
- Service worker/offline features (not implemented at present)

## Tech stack

- Astro 5, TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Zod for configuration validation
- `qrcode` for QR generation with custom "gold" styling
- `libphonenumber-js` for phone formatting

## Configuration model

All content comes from your Astro config using the Starcard integration. Example:

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
				description: "Short bio",
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
			},
		],
	},
});
```

This config is validated at build time; the parsed object is available to components as `site` from `virtual:starcard/config`.

## Data model (overview)

- `profile.displayName` (required), `firstName`, `lastName`
- Optional: `title`, `company`, `companyUrl`, `avatarUrl`, `avatarRounded`
- Contact: `email`, `phone`, `homePage`, `location`
- `vcard: boolean` to enable the vCard QR button
- `sections[]` with `order`, `title`, `icon`, `items[]: { icon, url }`
- `legal: { title, items[]: { order, id, title, value } }`

See `src/schemas/profile.ts` for exact Zod schema.

## Behavior summary

- **Touch devices**: Tapping a `TouchLink` opens a centered QR dialog (scan → Open). Close via button or tapping backdrop.
- **Desktop**: Clicking opens the link in a new tab. Modified click (Cmd/Ctrl/Alt/Shift) shows the QR dialog instead.
- **vCard**: If enabled, the vCard button shows a QR containing a vCard 3.0 payload built from profile data.
- **Ordering**: Sections and items are rendered by ascending `order`.

## Theming

- Colors and typography are driven by CSS variables in `src/styles/theme.css`.
- Fonts are configured via Astro experimental fonts in `astro.config.*` and loaded in `Layout.astro`.

## Deliverables

- Reusable Astro template/integration named "Starcard"
- NPM package publication planned; until then, use this repository as a template

## Notes

- Keep JavaScript minimal and accessible
- Aim for WCAG AA contrast; keyboard operable dialogs
- Prefer static rendering and zero client‑side routing
