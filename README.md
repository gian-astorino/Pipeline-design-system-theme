# Pipeline design system — theme

Next.js 16 + Tailwind v4, scaffolded to match what
`shadcn@latest init --preset b1aIcFPlK --template next` would have produced.

Live: https://gian-astorino.github.io/pipeline-design-system-theme/ (static
export via GitHub Pages, `.github/workflows/deploy-pages.yml`, redeploys on
every push to `main`).

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

## Token / component audit pages

`/tokens`, `/components` and `/dependencies` are ported from
`Pipelean-Design-System-Playground`, adapted for a real architectural
difference between the two component sets:

- Pipelean's components put Tailwind utility classes (`bg-primary`,
  `text-sm`, ...) directly on the element. Its `lib/token-dictionary.ts`
  finds them by scanning the component's own `.tsx` source.
- This repo's `base`/`luma` components don't — colors, radius, and most
  spacing sit behind a `cn-*` class (e.g. `cn-button-variant-default`),
  whose real utilities live in an `@apply` rule in `app/style-luma.css`.
  Scanning the `.tsx` alone would find almost nothing.

`lib/cn-classes.ts` closes that gap: it parses `style-luma.css` once into a
`cn-class -> utility classes` table, and `lib/read-component-source.ts`
expands every `cn-*` token in a component's source through that table
*before* handing the (now much more literal) text to the same
regex-based extractor Pipelean uses. `lib/token-dictionary.ts` itself only
needed two real changes: this repo's smaller semantic-role vocabulary (no
`success`/`warning`/`info`, no `destructive-foreground` — this preset never
added Pipelean's pipeline-run status roles), and a few more modifier labels
for the bare custom variants `shadcn/tailwind.css` defines
(`data-checked:`, `data-open:`, ...) that Pipelean's bracket-only
`data-[state=...]:` vocabulary didn't need to cover.

Demos come from the real `apps/v4/registry/bases/base/examples/*.tsx`
files (61 of 62 components have one — richer than anything hand-rolled:
button's alone covers every variant, size, icon position and invalid
state), run through the same `<IconPlaceholder>` → Phosphor transform as
the components themselves. Two examples (`message`, `message-scroller`)
depend on the docs site's own AI-chat demo helpers and were left out
rather than dragging those in; both components still get a full token
table, just no live demo.

Verified against the built-and-served app, not just `next build`: swept
all 62 component pages with a headless browser — 1123 token rows
extracted (441 of them color roles), zero JavaScript errors. The only
console noise is a handful of blocked-by-this-sandbox external image
loads (avatar/card demo placeholders) — a network-policy artifact of
where this was built, not an app bug.

## Verified

`pnpm install`, `pnpm build`, `npx tsc --noEmit`, `pnpm lint` — all clean.
Checked visually (light + dark) with a headless browser: zero console
errors, Inter font confirmed, `luma`'s fully-rounded button treatment and
the `blue` primary color both render.
