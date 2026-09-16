/**
 * Adapted from the Pipelean Design System Playground for this repo's
 * actual token set — stock shadcn "base"/"luma" roles (app/globals.css),
 * not Pipelean's custom additions. No success/warning/info: this preset
 * never added pipeline-run status roles, so there are none to document.
 */

export type SemanticToken = {
  name: string;
  cssVar: string;
  foregroundVar?: string;
  mapsTo: string;
  description: string;
};

export type SemanticGroup = {
  category: string;
  tokens: SemanticToken[];
};

export const semanticGroups: SemanticGroup[] = [
  {
    category: "Surfaces",
    tokens: [
      { name: "background", cssVar: "--background", foregroundVar: "--foreground", mapsTo: "neutral-50 / neutral-950", description: "Tela di fondo della pagina." },
      { name: "card", cssVar: "--card", foregroundVar: "--card-foreground", mapsTo: "neutral-50 / neutral-900", description: "Superficie rialzata (contenitori)." },
      { name: "popover", cssVar: "--popover", foregroundVar: "--popover-foreground", mapsTo: "neutral-50 / neutral-900", description: "Superficie flottante (menu, popover)." },
    ],
  },
  {
    category: "Actions",
    tokens: [
      { name: "primary", cssVar: "--primary", foregroundVar: "--primary-foreground", mapsTo: "blue-600 / blue-800", description: "Azione principale (call to action)." },
      { name: "secondary", cssVar: "--secondary", foregroundVar: "--secondary-foreground", mapsTo: "neutral-100 / neutral-800", description: "Azione secondaria." },
      { name: "accent", cssVar: "--accent", foregroundVar: "--accent-foreground", mapsTo: "neutral-100 / neutral-800", description: "Stato hover / evidenziato." },
      { name: "muted", cssVar: "--muted", foregroundVar: "--muted-foreground", mapsTo: "neutral-100 / neutral-800", description: "Contenuto de-enfatizzato." },
    ],
  },
  {
    category: "Status",
    tokens: [
      { name: "destructive", cssVar: "--destructive", mapsTo: "red-600 / red-500", description: "Stato distruttivo / errore. Senza foreground abbinato: il testo su fondo destructive è deciso dal componente, non da un secondo token." },
    ],
  },
  {
    category: "Structure",
    tokens: [
      { name: "border", cssVar: "--border", mapsTo: "neutral-200 / white 10%", description: "Colore di bordo di default." },
      { name: "input", cssVar: "--input", mapsTo: "neutral-200 / white 15%", description: "Bordo dei controlli form." },
      { name: "ring", cssVar: "--ring", mapsTo: "neutral-400 / neutral-600", description: "Colore dell'anello di focus." },
    ],
  },
  {
    category: "Sidebar",
    tokens: [
      { name: "sidebar", cssVar: "--sidebar", foregroundVar: "--sidebar-foreground", mapsTo: "neutral-50 / neutral-900", description: "Superficie dell'app shell / navigazione." },
      { name: "sidebar-primary", cssVar: "--sidebar-primary", foregroundVar: "--sidebar-primary-foreground", mapsTo: "blue-700 / blue-500", description: "Voce di nav attiva/selezionata." },
      { name: "sidebar-accent", cssVar: "--sidebar-accent", foregroundVar: "--sidebar-accent-foreground", mapsTo: "neutral-100 / neutral-800", description: "Stato hover sulle voci di nav." },
      { name: "sidebar-border", cssVar: "--sidebar-border", mapsTo: "neutral-200 / white 10%", description: "Divisore tra sidebar e contenuto." },
      { name: "sidebar-ring", cssVar: "--sidebar-ring", mapsTo: "neutral-400 / neutral-600", description: "Anello di focus dentro la sidebar." },
    ],
  },
  {
    category: "Charts",
    tokens: [
      { name: "chart-1", cssVar: "--chart-1", mapsTo: "blue-300", description: "Serie grafico 1." },
      { name: "chart-2", cssVar: "--chart-2", mapsTo: "blue-500", description: "Serie grafico 2." },
      { name: "chart-3", cssVar: "--chart-3", mapsTo: "blue-600", description: "Serie grafico 3." },
      { name: "chart-4", cssVar: "--chart-4", mapsTo: "blue-700", description: "Serie grafico 4." },
      { name: "chart-5", cssVar: "--chart-5", mapsTo: "blue-800", description: "Serie grafico 5." },
    ],
  },
];

const SEMANTIC_TOKEN_GROUP: Record<string, string> = Object.fromEntries(
  semanticGroups.flatMap((group) =>
    group.tokens.flatMap((token) => [
      [token.cssVar, group.category],
      ...(token.foregroundVar ? [[token.foregroundVar, group.category]] : []),
    ])
  )
);

export function semanticTokenGroup(cssVar: string): string | undefined {
  return SEMANTIC_TOKEN_GROUP[cssVar];
}

/* =====================================================================
 * SCALE TOKENS — spacing, radius, shadow, typography. Same mechanism as
 * Pipelean: each row is measured live off a real element using the
 * actual utility class, so this always reflects what's really in
 * app/globals.css, not a value copied by hand.
 * ===================================================================== */

export type ScaleRow = {
  name: string;
  className: string;
  cssVar?: string;
  prop: "width" | "borderRadius" | "boxShadow" | "fontSize" | "fontWeight" | "letterSpacing" | "lineHeight";
  note?: string;
};

export const spacingScale: ScaleRow[] = [
  { name: "0", className: "size-0", prop: "width" },
  { name: "px", className: "size-px", prop: "width", note: "fisso a 1px, non deriva da --spacing" },
  { name: "0.5", className: "size-0.5", prop: "width" },
  { name: "1", className: "size-1", prop: "width" },
  { name: "2", className: "size-2", prop: "width" },
  { name: "3", className: "size-3", prop: "width" },
  { name: "4", className: "size-4", prop: "width" },
  { name: "5", className: "size-5", prop: "width" },
  { name: "6", className: "size-6", prop: "width" },
  { name: "8", className: "size-8", prop: "width" },
  { name: "10", className: "size-10", prop: "width" },
  { name: "12", className: "size-12", prop: "width" },
  { name: "16", className: "size-16", prop: "width" },
  { name: "20", className: "size-20", prop: "width" },
  { name: "24", className: "size-24", prop: "width" },
  { name: "32", className: "size-32", prop: "width" },
];

export const radiusScale: ScaleRow[] = [
  { name: "sm", className: "rounded-sm", cssVar: "--radius-sm", prop: "borderRadius", note: "calc(var(--radius) * 0.6)" },
  { name: "md", className: "rounded-md", cssVar: "--radius-md", prop: "borderRadius", note: "calc(var(--radius) * 0.8)" },
  { name: "lg", className: "rounded-lg", cssVar: "--radius-lg", prop: "borderRadius", note: "= var(--radius)" },
  { name: "xl", className: "rounded-xl", cssVar: "--radius-xl", prop: "borderRadius", note: "calc(var(--radius) * 1.4)" },
  { name: "2xl", className: "rounded-2xl", cssVar: "--radius-2xl", prop: "borderRadius", note: "calc(var(--radius) * 1.8)" },
  { name: "3xl", className: "rounded-3xl", cssVar: "--radius-3xl", prop: "borderRadius", note: "calc(var(--radius) * 2.2)" },
  { name: "4xl", className: "rounded-4xl", cssVar: "--radius-4xl", prop: "borderRadius", note: "calc(var(--radius) * 2.6)" },
  { name: "full", className: "rounded-full", prop: "borderRadius", note: "utility statica, calc(infinity × 1px)" },
];

export const shadowScale: ScaleRow[] = [
  { name: "2xs", className: "shadow-2xs", cssVar: "--shadow-2xs", prop: "boxShadow" },
  { name: "xs", className: "shadow-xs", cssVar: "--shadow-xs", prop: "boxShadow" },
  { name: "sm", className: "shadow-sm", cssVar: "--shadow-sm", prop: "boxShadow" },
  { name: "md", className: "shadow-md", cssVar: "--shadow-md", prop: "boxShadow" },
  { name: "lg", className: "shadow-lg", cssVar: "--shadow-lg", prop: "boxShadow" },
  { name: "xl", className: "shadow-xl", cssVar: "--shadow-xl", prop: "boxShadow" },
  { name: "2xl", className: "shadow-2xl", cssVar: "--shadow-2xl", prop: "boxShadow" },
];

export const fontSizeScale: ScaleRow[] = [
  { name: "xs", className: "text-xs", cssVar: "--text-xs", prop: "fontSize" },
  { name: "sm", className: "text-sm", cssVar: "--text-sm", prop: "fontSize", note: "testo di default nei componenti" },
  { name: "base", className: "text-base", cssVar: "--text-base", prop: "fontSize" },
  { name: "lg", className: "text-lg", cssVar: "--text-lg", prop: "fontSize" },
  { name: "xl", className: "text-xl", cssVar: "--text-xl", prop: "fontSize" },
  { name: "2xl", className: "text-2xl", cssVar: "--text-2xl", prop: "fontSize" },
  { name: "3xl", className: "text-3xl", cssVar: "--text-3xl", prop: "fontSize" },
  { name: "4xl", className: "text-4xl", cssVar: "--text-4xl", prop: "fontSize" },
  { name: "5xl", className: "text-5xl", cssVar: "--text-5xl", prop: "fontSize" },
  { name: "6xl", className: "text-6xl", cssVar: "--text-6xl", prop: "fontSize" },
];

export const fontWeightScale: ScaleRow[] = [
  { name: "thin", className: "font-thin", cssVar: "--font-weight-thin", prop: "fontWeight" },
  { name: "extralight", className: "font-extralight", cssVar: "--font-weight-extralight", prop: "fontWeight" },
  { name: "light", className: "font-light", cssVar: "--font-weight-light", prop: "fontWeight" },
  { name: "normal", className: "font-normal", cssVar: "--font-weight-normal", prop: "fontWeight" },
  { name: "medium", className: "font-medium", cssVar: "--font-weight-medium", prop: "fontWeight" },
  { name: "semibold", className: "font-semibold", cssVar: "--font-weight-semibold", prop: "fontWeight" },
  { name: "bold", className: "font-bold", cssVar: "--font-weight-bold", prop: "fontWeight" },
  { name: "extrabold", className: "font-extrabold", cssVar: "--font-weight-extrabold", prop: "fontWeight" },
  { name: "black", className: "font-black", cssVar: "--font-weight-black", prop: "fontWeight" },
];

export const trackingScale: ScaleRow[] = [
  { name: "tighter", className: "tracking-tighter", cssVar: "--tracking-tighter", prop: "letterSpacing" },
  { name: "tight", className: "tracking-tight", cssVar: "--tracking-tight", prop: "letterSpacing" },
  { name: "normal", className: "tracking-normal", cssVar: "--tracking-normal", prop: "letterSpacing" },
  { name: "wide", className: "tracking-wide", cssVar: "--tracking-wide", prop: "letterSpacing" },
  { name: "wider", className: "tracking-wider", cssVar: "--tracking-wider", prop: "letterSpacing" },
  { name: "widest", className: "tracking-widest", cssVar: "--tracking-widest", prop: "letterSpacing" },
];

export const leadingScale: ScaleRow[] = [
  { name: "none", className: "leading-none", prop: "lineHeight", note: "utility statica (1), nessuna var" },
  { name: "tight", className: "leading-tight", cssVar: "--leading-tight", prop: "lineHeight" },
  { name: "snug", className: "leading-snug", cssVar: "--leading-snug", prop: "lineHeight" },
  { name: "normal", className: "leading-normal", cssVar: "--leading-normal", prop: "lineHeight" },
  { name: "relaxed", className: "leading-relaxed", cssVar: "--leading-relaxed", prop: "lineHeight" },
  { name: "loose", className: "leading-loose", cssVar: "--leading-loose", prop: "lineHeight" },
];
