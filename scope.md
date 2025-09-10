# scope.md — Digital Business Card (Astro.js)

> Single-purpose, mobile-first web app that makes a phone behave like a big business card.  
> Owners can quickly **show** or **share** key links via on-screen QR codes. Not more, not less.

---

## 1) Goals (What success looks like)

- **Instant identity view**: On first load, show photo, name, role tagline, phone, email, site, location, and a QR to the site.
- **Full-viewport section paging**: Each section (“Socials”, “Presence”, “Support”, “Legal”, etc.) occupies a full viewport; swipe or arrow tap navigates section-by-section.
- **Share-first link UX**: Tapping a link **slides in a QR popover** for others to scan.
  - Tap/press QR → open link in a new tab.
  - Close button or swipe-down → dismiss popover.
- **Fast and offline-tolerant**: Sub-second TTI on modern phones; minimal JS; optional PWA install.
- **Owner-maintained content**: Links & sections driven by simple structured data in repo.

## 2) Non-Goals

- No complex CMS, comments, auth, or feeds.
- No analytics that fingerprint users or require cookies by default.
- No heavy animations; subtle and performant only.

---

## 3) Primary User Stories

- **Visitor**: “When I open the page, I immediately see who this is and a QR to save the site.”
- **Visitor**: “When I tap a LinkedIn link, I get a large QR to scan. If I tap the QR, the link opens.”
- **Owner**: “I can edit a single JSON/YAML file to add, reorder, or hide links/sections.”
- **Owner**: “My profile looks great on mobile, acceptable on desktop.”

---

## 4) Information Architecture

### Sections (ordered)

1. **Hero**: avatar, name, role, phone, email, website, location, site-QR.
2. **Socials**: e.g., LinkedIn, X/Twitter, YouTube, Behance…
3. **Presence**: other profiles (GitHub, NPM, Dev.to, etc.).
4. **Support / Contact**: “Book a call”, Calendly, Buy Me a Coffee, etc.
5. **Legal**: VAT/ICO, imprint, privacy link.

> Sections are data-driven; empty sections are hidden.

### Data model (owner-editable)

```json
{
	"owner": {
		"name": "Alexander Sedeke",
		"tagline": "Full-stack Developer & Videographer",
		"avatarUrl": "/img/avatar.jpg",
		"phone": "+420 777 123 456",
		"email": "alexandr@alexandr.codes",
		"website": "https://alexandr.codes",
		"location": "Prague, Czech Republic"
	},
	"sections": [
		{
			"id": "socials",
			"title": "Socials",
			"links": [
				{
					"label": "LinkedIn",
					"url": "https://linkedin.com/in/alexander-sedeke",
					"icon": "linkedin"
				},
				{
					"label": "X / Twitter",
					"url": "https://x.com/alexander-x",
					"icon": "x"
				}
			]
		},
		{
			"id": "presence",
			"title": "Presence",
			"links": [
				{
					"label": "GitHub",
					"url": "https://github.com/alexandr-studio",
					"icon": "github"
				}
			]
		},
		{
			"id": "support",
			"title": "Support",
			"links": [
				{
					"label": "Contact",
					"url": "mailto:alexandr@alexandr.codes",
					"icon": "mail"
				}
			]
		},
		{
			"id": "legal",
			"title": "Legal",
			"items": [
				{ "label": "VAT ID", "value": "CZ1234567890" },
				{ "label": "Imprint", "url": "/imprint" }
			]
		}
	]
}
```

## 5) Interaction Design

### Section Paging

• Gesture: Horizontal swipe (touch), or arrow buttons (tap/click).
• Behavior: Snap per viewport. Keep vertical scroll disabled within sections on mobile.
• Accessibility: Keyboard ←/→ to change sections; focus ring visible.

“Share-first” Link Flow (State machine)

States: idle → qr_open → (open_link | dismiss) 1. Tap link in a section
→ create QR for target URL; slide-in popover from bottom (mobile) or side (desktop). 2. In qr_open:
• Tap/press QR → open target URL in a new tab; keep popover for 1.5s, then auto-dismiss.
• Close button or swipe-down → dismiss popover with slide-out. 3. Escape key also dismisses. Outside click dismisses.

### Edge Cases

• If mailto:/tel: link → open directly (no QR), but show a small “Share via QR” option.
• If the device is already sharing screen (e.g., in person), QR popover should prevent background scroll (lock body).
• Fallback if QR generation fails → show copy-to-clipboard button with toast.

⸻

## 6) Visual/UX Notes

    •	Typography: modern sans; readable 16–18px base; consistent leading.
    •	Color: dark background with subtle radial lighting; high contrast for text (WCAG AA+).
    •	Motion: 200–250ms ease for slides/fades; reduced-motion support.
    •	Icons: feather/lucide or custom SVG set; inline SVGs for color-current.

⸻

## 7) Tech Choices (Astro)

    •	Astro (latest) with Islands for interactive parts (pager & QR popover).
    •	Components: SectionPagerIsland, QrPopoverIsland.
    •	QR: lightweight lib (e.g., qrcode or qr-code-styling) rendered into canvas/SVG in the island.
    •	Gestures: minimal JS (Pointer Events); no heavy gesture libs.
    •	Styling: Tailwind or CSS Modules; prefers utility classes, no global leaks.
    •	Optional PWA: service worker via @vite-pwa/astro (install prompt hidden by default).

⸻

## Routes & Files

```
/src
  /components
    SectionPager.astro          ← non-interactive shell
    SectionCard.astro
    LinkRow.astro
    HeroCard.astro
  /islands
    SectionPagerIsland.tsx      ← swipe/keys, snap, active index state
    QrPopoverIsland.tsx         ← portal/popover, QR generation, transitions
  /data
    profile.json                ← owner + sections (see model)
  /styles
    theme.css                   ← tokens (spacing, radii, shadows)
pages/
  index.astro
  imprint.astro (optional)
public/
  img/avatar.jpg
  icons/*.svg
```

## Accessibility

• Landmarks: <header>, <main>, <nav>, <section>, <footer>.
• Each section has an aria-label and is focusable.
• Popover uses role="dialog" with aria-modal="true"; trap focus while open.
• Provide text alternative for every icon; QR has aria-description (“Scan to open …”).

⸻

## Performance Budgets

    • JS (total shipped): ≤ 25 kB gzip on first load.
    • LCP target < 1.5s on 4G mid-tier device.
    • Images pre-optimized; avatar.jpg ≤ 60 kB (responsive srcset).
    • No layout shifts; use fixed heights for hero avatar & headings.

⸻

## AI Onboarding Hints

### When assisting, follow:

    •	Single purpose: Do not add features beyond scope without an explicit “Roadmap” entry.
    •	Minimal JS: Prefer Astro islands; avoid global script bloat.
    •	Share-first UX: Links → QR popover by default, except mailto:/tel:.
    •	Data-driven: Modify /src/data/profile.json; do not hardcode in components.
    •	Testing: Provide Playwright tests for pager and popover.

### Prompts to use with the codebase:

    •	“Generate a QrPopoverIsland.tsx with a11y-compliant focus trap and ESC close.”
    •	“Implement SectionPager with touch swipe (Pointer Events), snap, and keyboard nav.”
    •	“Write Playwright tests: open QR, tap QR to open link (intercept), dismiss via swipe.”

⸻

## Definition of Done (MVP)

    •	Data-driven sections render full-viewport on mobile with smooth snap paging.
    •	Tapping a standard link opens a QR popover; tapping the QR opens the link in a new tab.
    •	Popover can be closed via button, swipe, ESC, or outside click; focus is trapped while open.
    •	Lighthouse mobile ≥ 95; a11y checks pass; JS ≤ 25 kB gzip.
