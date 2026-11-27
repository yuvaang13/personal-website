# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary readers are admissions officers, competition judges, mentors, and program reviewers evaluating a middle-school student developer's work. Secondary readers are collaborators and technical peers who want to understand the projects, the stack, and the direction.

## Product Purpose

A personal portfolio for Yuvaan Gulati that makes a coherent case for the work: AI tools, robotics software, applied math, and STEM education. Success means a reader can understand the projects, the record of competition and teaching, and the person behind them in a few minutes, then find a way to make contact.

## Positioning

The portfolio connects unusually young, unusually applied work across AI, robotics, mathematics, and teaching. Its evidence is specific: named projects, competition placements, a published iOS app, an FTC software stack, a K-8 tutoring platform, and sustained mentoring. The site should read as a working index of that evidence rather than a generic personal-brand page.

## Operating Context

Readers arrive from school applications, competition and program review, GitHub, LinkedIn, and direct sharing. They scan on laptops and phones, often with limited time. The site is static, content-led, and maintained by editing `src/data/profile.ts`. The live site is deployed on Vercel.

## Capabilities and Constraints

- Astro 4 static site with Tailwind CSS and TypeScript.
- All content is local; no CMS, no database, no required environment variables.
- Every project has a title, type, status, summary, details, tags, optional links, and optional image.
- Contact is by email, GitHub, and LinkedIn; there is no contact form backend.
- The site must remain fast, responsive, keyboard-accessible, and readable with reduced motion.
- Existing copy is the source of truth and must be preserved in the redesign.

## Brand Commitments

- Name: Yuvaan Gulati.
- Location: Greater Boston.
- Voice: direct, specific, technically literate, and modest. No inflated claims.
- Existing project names, competition results, roles, and links are factual and must not be changed.
- The site is a personal portfolio, not a company or product landing page.

## Evidence on Hand

- `src/data/profile.ts` — the complete content record: profile, navigation, home links, nine projects, six highlights, eight timeline entries, eight stats, nine roles, twenty-nine skills, six education interests, four contact links, and three contact notes.
- `public/projects/auren.png`, `infinit.png`, `verus.png`, `monkmode.png` — project title plates supplied with the site.
- No portrait photograph, no client testimonials, and no third-party case studies. Future work must not invent them.

## Product Principles

1. Lead with the work and the evidence; the interface should recede behind the projects, results, and writing.
2. Preserve the specificity of the record: names, placements, roles, and links stay exact.
3. Make the whole person legible: builder, competitor, mentor, and student in one coherent story.
4. Keep the reading experience calm, fast, and accessible on every screen.
5. Prefer a durable editorial system over one-off effects; the site should still feel considered after the novelty of a trend has passed.

## Accessibility & Inclusion

Keyboard access to every control, visible focus states, sufficient contrast, semantic headings, descriptive link text, reduced-motion support, and readable body copy at 16px or larger on phones.
