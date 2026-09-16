# Pipeline design system — theme

Next.js 16 + Tailwind v4, scaffolded to match what
`shadcn@latest init --preset b1aIcFPlK --template next` would have produced.

## Why it's hand-assembled instead of CLI-generated

The environment this was built in blocks `ui.shadcn.com`, and `shadcn init`
resolves a preset by calling `ui.shadcn.com/init?...` — there's no offline
path through the CLI. Every piece here was instead sourced directly from
[shadcn-ui/ui](https://github.com/shadcn-ui/ui) (the CLI's own npm package,
plus the `apps/v4` registry source) and assembled by hand:

- **Theme** (`app/globals.css`): `neutral` (baseColor) merged with `blue`
  (theme + chartColor) exactly the way `registry/config.ts`'s
  `buildRegistryTheme()` does — baseColor's keys first, theme's overriding
  on top. Values are copied verbatim from `apps/v4/registry/themes.ts`.
- **Style** (`app/style-luma.css`): the real `luma` stylesheet from
  `apps/v4/registry/styles/style-luma.css`, unmodified. It only takes effect
  because `<body>` carries the `style-luma` class (`app/layout.tsx`) — that's
  how the real app resolves which style is active, confirmed from
  `design-system-provider.tsx` in the shadcn-ui/ui source.
- **Components** (`components/ui/*.tsx`): the `base` flavor (Base UI
  primitives, not Radix) from `apps/v4/registry/bases/base/ui/*.tsx`, copied
  verbatim except for two mechanical rewrites:
  - import paths (`@/registry/bases/base/...` → `@/components/ui/...` /
    `@/hooks/...`)
  - every `<IconPlaceholder lucide="..." phosphor="XyzIcon" .../>` (a
    docs-site-only component that swaps icon libraries live for the
    interactive customizer) replaced with the real Phosphor icon it
    resolves to for this preset (`iconLibrary=phosphor`), e.g.
    `<CaretDown .../>` from `@phosphor-icons/react`. Verified against the
    package's actual export list, not guessed.
- **Font**: Inter via `next/font/google`, `--font-sans` (matches
  `registry/fonts.ts`'s `inter` entry).
- **Icons**: `@phosphor-icons/react` (matches `iconLibrary=phosphor`).
- **menuAccent=subtle / menuColor=default-translucent**: both are already
  what the copied component files produce unconditionally (`subtle` is the
  config's own no-op default; `default-translucent` is the
  `cn-menu-translucent` class already present, statically, in
  `dropdown-menu.tsx`/`select.tsx`/etc.) — no extra wiring needed. See
  `registry/config.ts`'s `buildRegistryTheme()` for where `menuAccent=bold`
  *would* have required repointing `--accent` to `--primary`; it doesn't
  apply here.

Full resolved config:
`base=base style=luma baseColor=neutral theme=blue chartColor=blue font=inter iconLibrary=phosphor radius=default menuAccent=subtle menuColor=default-translucent rtl=false`.

## Two deviations from a real `init` output, both load-bearing

1. **`app/shadcn-tailwind.css`** is a vendored copy of
   `node_modules/shadcn/dist/tailwind.css`, imported by relative path
   instead of `@import "shadcn/tailwind.css"`. Turbopack's CSS resolver
   doesn't follow that package's `exports` map for the `./tailwind.css`
   subpath (plain `require.resolve` finds it fine from Node — this is a
   Turbopack-specific gap), and the unresolved import fails `next build`.
   If a future Next.js/Turbopack release fixes that resolution, switching
   back to the package import is a one-line change back in `globals.css`.
2. **`eslint.config.mjs`** downgrades `react-hooks/set-state-in-effect` to
   a warning. It fires on `hooks/use-mobile.ts` and
   `components/ui/carousel.tsx` — both copied verbatim from shadcn-ui/ui —
   because that rule (new in this `eslint-config-next` release) is stricter
   than the pattern those files use (a synchronous `setState` inside a
   plain effect to read an initial value). The source wasn't edited to
   satisfy a rule it predates; the config just stops treating it as fatal.

Everything else — dependency versions, `tsconfig.json`, `postcss.config.mjs`
— comes straight from `shadcn-ui/ui`'s own `templates/next-app` and
`apps/v4/package.json`.

## What's here vs. what isn't

`app/page.tsx` is a small hand-built sanity page (buttons, card, form
controls) to confirm the theme actually renders — not a component catalog.
All 62 `base` components are installed in `components/ui/` and ready to use,
but only a handful are wired into a demo. Porting the token/component audit
tooling from `Pipelean-Design-System-Playground` (the auto-extracted
"Token collegati" tables, the `/tokens` and `/components` pages) onto this
new component set is a separate, not-yet-started piece of work.

## Verified

`pnpm install`, `pnpm build`, `npx tsc --noEmit`, `pnpm lint` — all clean.
Checked visually (light + dark) with a headless browser: zero console
errors, Inter font confirmed, `luma`'s fully-rounded button treatment and
the `blue` primary color both render.
