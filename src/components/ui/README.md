# UI primitives

This folder is the project's equivalent of shadcn's default `components/ui`
directory. The TypeScript path alias in `tsconfig.json` maps `@/* → ./src/*`,
so an import of `@/components/ui/glass-folder-cards` resolves here — not to the
legacy top-level `components/ui/` folder left over from the old Next.js build.

## Glass folders

- `GlassFolder.astro` — the live component. It is a faithful, dependency-free
  port of the supplied `glass-folder-cards.tsx`: the same three real layers
  (back panel → file sheets → frosted front panel), the same hinge/fan/add/menu
  interactions, keyboard support, and the same entrance choreography.
- `glassArt.ts` — the generated-artwork engine (domain-warped fBm noise shaded
  as brushed metal), with one shared `requestAnimationFrame` paint queue so
  several folders never jank the page. No network requests, no image assets.
  The `graphite` / `copper` / `steel` presets are the site palette: near-black
  bases with one restrained metal accent, narrow value ranges, low warp and
  almost no veining so the surfaces never read as colourful pigment.

The original React component is intentionally **not** vendored as dead code:
this is an Astro site with no React runtime, and the npm registry is unreachable
in this environment. The Astro port keeps the static-output/Core-Web-Vitals
character of the site while preserving the component's behaviour.

### Props of interest

`label`, `meta`, `tone` (`light`/`dark`), `art` (preset or `none`), `seed`,
`image` (optional custom URL — deliberately unused by the site; generated art
is the only artwork in use), `files`
(`{ name, meta?, art?, image?, href? }[]`), `action` (`add`/`more`/`none`),
`menu`, `labelPlacement`, `width`, `defaultOpen`, `appear`, `appearDelay`.

### Adding React / shadcn later (when the registry is reachable)

```bash
npx astro add react          # installs @astrojs/react, react, react-dom
# or: npm i @astrojs/react react react-dom

npx shadcn@latest init       # shifts the project to a React/shadcn setup
npx shadcn@latest add button # components land in src/components/ui
```

Then the supplied `glass-folder-cards.tsx` can be dropped in here as-is and
rendered as an Astro island with `client:visible`. Keep the `gf-*` class names
scoped to that island so the two implementations cannot collide.
