# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based website project for alexandr.codes. The codebase follows Astro's standard project structure with TypeScript support, Tailwind CSS v4, and SEO optimizations.

## Development Commands

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm install`      | Install dependencies                       |
| `pnpm dev`          | Start development server at localhost:4321 |
| `pnpm build`        | Build production site to ./dist/           |
| `pnpm preview`      | Preview built site locally                 |
| `pnpm astro check`  | Run Astro's built-in type checking         |
| `pnpm format`       | Format code with Prettier                  |
| `pnpm format:check` | Check code formatting with Prettier        |

## Architecture

- **Framework**: Astro v5+ with TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 via Vite plugin
- **Code Formatting**: Prettier with astro plugin support
- **SEO**: astro-seo for meta tags and OpenGraph
- **Sitemap**: @astrojs/sitemap integration
- **Robots**: astro-robots-txt for SEO crawling
- **Package Manager**: pnpm
- **Build Output**: Static files to `dist/` directory
- **Site URL**: https://alexandr.codes

### Project Structure

```
src/
├── assets/          # Static assets (SVGs, images)
├── components/      # Reusable Astro components
├── layouts/         # Layout components
├── pages/           # File-based routing pages
└── styles/          # Global CSS files
```

### Key Files

- `src/pages/index.astro` - Homepage using Layout wrapper and Welcome component
- `src/layouts/Layout.astro` - Base HTML layout with SEO components and global styles
- `src/styles/global.css` - Global CSS imported in Layout
- `astro.config.mjs` - Configured with Tailwind, sitemap, and robots.txt
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` → `src/*`)

### Configuration Details

**Path Aliases**: Use `@/` to import from `src/` directory (e.g., `import Component from '@/components/Component.astro'`)

**SEO Setup**: Layout includes astro-seo with OpenGraph and Twitter meta tags. Update the placeholder values in Layout.astro for production.

**Tailwind**: Integrated via Vite plugin using Tailwind CSS v4. No separate config file needed.

**Integrations**:

- Sitemap generation for https://alexandr.codes
- Robots.txt configured for alexandr.studio domain
- SEO meta tags and social media cards

## Development Notes

- Uses Astro's file-based routing system
- Components are written in `.astro` format
- TypeScript configured in strict mode with path aliases
- Tailwind CSS v4 available throughout the project
- SEO components configured but contain placeholder content that needs updating
- Prettier handles code formatting with format-on-save enabled in VS Code
- Prettier supports .astro files via prettier-plugin-astro
