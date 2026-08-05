# CLAUDE.md — Personal Website (Yuvaan Gulati)

## Project Overview

**Personal portfolio website** for Yuvaan Gulati — a student developer focused on AI, applied mathematics, robotics, STEM education, and computer engineering.

- **Live URL**: https://iamyuvaangulati.vercel.app/
- **Repo**: `yuvaang13/personal_website` (main branch)
- **Deploy**: Vercel (auto-deploys from `main`)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 (strict) |
| Styling | Tailwind CSS 3.4 + PostCSS |
| Fonts | Inter (sans), Styrene A (serif/mono — loaded via `@font-face` from onlinewebfonts.com) |
| UI Icons | lucide-react 0.468 |
| Dev Tools | ESLint 9 (next config), TypeScript strict mode |

**Key config files:**
- `next.config.mjs` — Turbopack root configured
- `tailwind.config.ts` — Custom animations (`fade-up`, `soft-pulse`), font stacks
- `tsconfig.json` — Path alias `@/*` → `./*`

---

## Project Structure

```
app/
├── layout.tsx          # Root layout, metadata, global font setup
├── page.tsx            # Home page — hero + AsciiMesh neural field + footer note
├── globals.css         # @font-face for Styrene A, base styles, noise-mask, focus-ring
├── about/page.tsx      # About page — highlights, interests, skills, education
├── projects/page.tsx   # Projects grid from profile.ts
├── experience/page.tsx # Stats, timeline, roles
└── contact/page.tsx    # Contact links (email, GitHub, location)

components/
├── PageShell.tsx       # Layout wrapper: Navbar + children + footer
├── NavBar.tsx          # Fixed header with nav links (dev-style: ~/ projects/ about_me etc.)
└── AsciiMesh.tsx       # Interactive canvas neural network visualization (client)

lib/
└── profile.ts          # ALL content data: profile, navItems, projects, highlights, timeline, skills, educationInterests
```

---

## Data Architecture

**Single source of truth**: `lib/profile.ts` exports all content as typed constants.

- `profile` — name, location, email, github, website, headline, shortIntro
- `navItems` — navigation labels/URLs (dev-style: `~/`, `projects/`, `about_me`, etc.)
- `homeLinks` — CTA buttons on home page
- `projects[]` — 7 projects with title, type, status, summary, details, tags, links
- `highlights[]` — 6 featured areas with icons, labels, titles, body text
- `timeline[]` — 8 chronological entries (year, title, body)
- `skills[]` — 23 technology strings
- `educationInterests[]` — 6 interest areas

**To update content**: Edit `lib/profile.ts` only. All pages consume from here.

---

## Design System

### Colors (Tailwind zinc-based dark theme)
- Background: `#000` (black)
- Text primary: `#d4d4d8` (zinc-400)
- Text muted: `#71717a` (zinc-500)
- Borders: `rgb(39 39 42)` (zinc-800)
- Accent: white (`#fff`) for active states, headings

### Typography
- **Sans**: Inter → Geist → system-ui
- **Serif/Mono**: Styrene A (loaded via `@font-face` in globals.css, weights 400/500/700)
- **Display headings**: `font-serif text-5xl..8xl leading-[0.95]`
- **Eyebrow labels**: `text-xs uppercase tracking-[0.28em] text-zinc-600`

### Animations
- `fade-up`: 900ms cubic-bezier entrance (used on home hero sections)
- `soft-pulse`: 5s infinite opacity pulse (used on "Connected" status badge)

### Custom Utilities (globals.css)
- `.noise-mask` — subtle grid noise overlay with fade mask
- `.focus-ring` — accessible focus states (2px white ring + 6px rgba glow)
- `.section-shell` — top border divider

---

## Key Components

### `PageShell` (`components/PageShell.tsx`)
Wrapper used by all pages. Provides:
- `<NavBar />` (fixed, backdrop-blur)
- `{children}` main content
- Footer with name, GitHub, Email, Location links

Also exports `PageHeader` — consistent section header with eyebrow, title, body.

### `NavBar` (`components/NavBar.tsx`)
Fixed header (`h-16`, `z-50`), backdrop blur, border.
- Logo: `yuvaan_gulati` (links to `/`)
- Nav items from `navItems` with active-state highlighting
- Dev-terminal aesthetic labels

### `AsciiMesh` (`components/AsciiMesh.tsx`)
Interactive canvas neural network visualization (client component).
- 8 anchor nodes with labels (Infinit AI, next-gen-reCAPTCHA, FTC, MATHCOUNTS, ClearEye, MonkMode, RAG+APIs, NHSEE)
- ~60+ filler nodes with glyphs (AI, ML, RAG, ∑, π, 01, FTC, K-8, CS)
- Physics-based animation: float, drift, spring connections
- Mouse parallax interaction
- Noise mask overlay, grid lines, dev-style corner labels

---

## Commands

```bash
# Development
npm run dev        # Next.js dev server (Turbopack)

# Build & Deploy
npm run build      # Production build
npm run start      # Start production server

# Linting
npm run lint       # ESLint with next/config
```

---

## Conventions & Patterns

### File Naming
- Pages: `page.tsx` in route folders (`app/about/page.tsx`)
- Components: PascalCase (`PageShell.tsx`, `AsciiMesh.tsx`)
- Data: camelCase exports in `lib/profile.ts`

### Component Patterns
- All pages use `PageShell` wrapper
- Page content wrapped in `<section>` with consistent spacing
- Grid layouts: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` responsive
- Cards: `border border-zinc-800` with `hover:bg-white/[0.035]` transition
- Interactive elements: `.focus-ring` for accessibility

### Styling Approach
- Tailwind utility classes exclusively
- No CSS Modules, no styled-components
- Custom animations via `tailwind.config.ts` keyframes
- Dark mode only (`color-scheme: dark` in `:root`)

### TypeScript
- Strict mode enabled
- Path alias `@/*` for imports
- Component props typed inline or with `type` exports
- `"use client"` directive for client components (NavBar, AsciiMesh, PageShell)

---

## Content Updates

**All copy/content lives in `lib/profile.ts`**. To modify:

| What | Where |
|------|-------|
| Name, bio, contact | `profile` object |
| Navigation labels/urls | `navItems` array |
| Home CTA buttons | `homeLinks` array |
| Project cards | `projects` array |
| Highlight cards (About) | `highlights` array |
| Timeline entries | `timeline` array |
| Skills tags | `skills` array |
| Education interests | `educationInterests` array |

---

## Deployment

- **Platform**: Vercel
- **Branch**: `main` (auto-deploy)
- **Build command**: `npm run build`
- **Output**: `.next/` (standard Next.js)
- **Env vars**: None required (all content is static)

---

## Notes for Future Work

- **Fonts**: Styrene A loads from onlinewebfonts.com — consider self-hosting for production reliability
- **AsciiMesh**: Canvas animation runs on every home page visit; lightweight but could be optimized with `requestIdleCallback` or reduced node count on mobile
- **Content scaling**: `profile.ts` is growing — consider splitting into `projects.ts`, `highlights.ts`, etc. if it expands further
- **Images**: Currently no local images; all external links. Add `next.config.mjs` image domains if adding local assets
- **Analytics**: Not yet integrated — consider Vercel Analytics or Plausible