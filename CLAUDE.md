# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based digital business card website for alexandr.codes. The project creates a personal profile page with social links, QR code generation, and professional contact information. Built with Astro v5, TypeScript, Tailwind CSS v4, and includes comprehensive SEO optimizations.

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
- **Validation**: Zod for data validation and type safety
- **Utilities**: clsx and tailwind-merge for conditional styling
- **QR Codes**: qrcode library for generating contact QR codes
- **Phone Handling**: libphonenumber-js for phone number validation/formatting
- **Code Formatting**: Prettier with astro plugin support
- **SEO**: astro-seo for meta tags and OpenGraph
- **Sitemap**: @astrojs/sitemap integration
- **Robots**: astro-robots-txt for SEO crawling
- **Package Manager**: pnpm
- **Build Output**: Static files to `dist/` directory
- **Site URL**: https://alexandr.codes

### Core Data Architecture

**Profile Data System**: The website is driven by a JSON configuration in `src/data/profile.json` that defines:
- Personal information (name, title, contact details)
- Social media and professional links organized in sections
- Legal information (VAT ID, etc.)
- Avatar configuration with rounded corner options

**Validation Layer**: Profile data is validated using Zod schemas defined in `src/schemas/profile.ts`:
- Ensures data integrity and type safety
- Provides runtime validation for profile configurations
- Exports TypeScript types for compile-time checking

**Component Architecture**: Modular component system with:
- Icon components for 50+ social platforms and services (`src/components/icons/`)
- Reusable UI components (Field, Section, Persona, etc.)
- QR code generation component with golden ratio styling
- Two layout systems: main Layout and CardLayout for different presentations

### Project Structure

```
src/
├── assets/          # Static SVG assets and background graphics
├── components/      # Reusable Astro components
│   └── icons/       # 50+ social platform icon components
├── data/           # Profile configuration (profile.json)
├── layouts/        # Layout components (Layout.astro, CardLayout.astro)
├── lib/            # Utility functions (validation, phone, QR, styling)
├── pages/          # File-based routing pages
├── schemas/        # Zod validation schemas
└── styles/         # Global CSS and theme files
```

### Key Files

- `src/data/profile.json` - Central configuration for all profile data
- `src/schemas/profile.ts` - Zod schema for profile data validation
- `src/pages/index.astro` - Main homepage with complete profile display
- `src/layouts/Layout.astro` - Base HTML layout with SEO and font loading
- `src/layouts/CardLayout.astro` - Alternative card-style layout
- `src/components/qrcode.astro` - QR code generator with golden ratio styling
- `src/lib/validateProfile.ts` - Profile validation utilities
- `src/lib/qrcode-gold.ts` - QR code styling with golden ratio calculations
- `src/lib/phone.ts` - Phone number formatting utilities
- `src/lib/cn.ts` - Tailwind class merging utility
- `astro.config.mjs` - Configured with Tailwind, fonts, sitemap, and robots.txt

### Configuration Details

**Path Aliases**: Use `@/` to import from `src/` directory (e.g., `import Component from '@/components/Component.astro'`)

**Font System**: Plus Jakarta Sans font loaded via Astro's experimental font provider with weights 200-900

**SEO Setup**: Layout includes astro-seo with OpenGraph and Twitter meta tags. Currently contains placeholder content in `src/layouts/Layout.astro:21-48` that should be updated for production.

**Tailwind**: Integrated via Vite plugin using Tailwind CSS v4. No separate config file needed. Theme variables defined in `src/styles/theme.css`.

**QR Code Generation**: Custom implementation using the qrcode library with golden ratio-based sizing and styling

**Icon System**: Comprehensive icon library with 50+ social platform components, all following consistent naming and styling patterns

**Integrations**:
- Sitemap generation for https://alexandr.codes
- Robots.txt configured for alexandr.studio domain (note: domain mismatch)
- SEO meta tags and social media cards
- Google Fonts integration via Astro experimental fonts

## Development Notes

- Profile data changes require updating `src/data/profile.json` and ensuring validation passes
- New social platforms require adding corresponding icon components in `src/components/icons/`
- QR codes are generated server-side and styled using golden ratio calculations
- Phone numbers are validated and formatted using libphonenumber-js
- All profile data is validated at build time using Zod schemas
- SEO meta tags in Layout.astro contain placeholder content and need production updates
- Robots.txt domain configuration (alexandr.studio) doesn't match site URL (alexandr.codes)
- Uses Astro's file-based routing system with TypeScript strict mode
- Tailwind CSS v4 with custom theme variables and utility classes
- Prettier handles code formatting for .astro, .ts, and .json files

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
