/**
 * Vocabulary used to recognize design tokens inside a component's source
 * and turn them into a readable table row. Keep in sync with the token
 * names actually defined in app/globals.css.
 *
 * Adapted from the Pipelean Design System Playground's token-dictionary.ts
 * for this repo's different token set (no success/warning/info roles, no
 * destructive-foreground — this is stock shadcn "base"/"luma", not
 * Pipelean's custom additions) and its different modifier vocabulary
 * (shadcn/tailwind.css defines bare custom variants like data-checked:,
 * data-open: — not the data-[state=checked]: bracket form Pipelean used).
 */

export const SEMANTIC_COLOR_NAMES = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
] as const;

export const RADIUS_NAMES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"] as const;
export const SHADOW_NAMES = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
export const FONT_SIZE_NAMES = [
  "xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl",
] as const;
export const FONT_WEIGHT_NAMES = [
  "thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black",
] as const;
export const TRACKING_NAMES = ["tighter", "tight", "normal", "wide", "wider", "widest"] as const;
export const LEADING_NAMES = ["none", "tight", "snug", "normal", "relaxed", "loose"] as const;

export type TokenCategory =
  | "color"
  | "radius"
  | "shadow"
  | "font-size"
  | "font-weight"
  | "tracking"
  | "leading"
  | "padding"
  | "size";

export type TokenMatch = {
  className: string;
  category: TokenCategory;
  cssVar: string;
  /** Which visual part of the component this class controls (sfondo,
   *  bordo, testo, ...), in Italian to match the rest of the UI. */
  part: string;
  /** Which state this class only applies under (hover, dark, focus, ...),
   *  or null when it's unconditional. */
  state: string | null;
};

const COLOR_PREFIXES = ["ring-offset", "bg", "text", "border", "ring", "outline", "decoration", "divide", "placeholder", "caret", "fill", "stroke"];

const COLOR_PREFIX_PARTS: Record<string, string> = {
  bg: "Sfondo",
  text: "Testo",
  border: "Bordo",
  ring: "Anello di focus",
  "ring-offset": "Offset dell'anello di focus",
  outline: "Contorno",
  decoration: "Decorazione testo",
  divide: "Separatore tra elementi",
  placeholder: "Testo placeholder",
  caret: "Cursore di testo",
  fill: "Icona (fill)",
  stroke: "Icona (stroke)",
};

function matchedColorPrefix(className: string): string | undefined {
  return [...COLOR_PREFIXES]
    .sort((a, b) => b.length - a.length)
    .find((p) => className.startsWith(`${p}-`));
}

function partForColorClass(className: string): string {
  const prefix = matchedColorPrefix(className) ?? className.split("-")[0];
  return COLOR_PREFIX_PARTS[prefix] ?? prefix;
}

const PART_LABELS: Record<Exclude<TokenCategory, "color" | "padding" | "size">, string> = {
  radius: "Raggio degli angoli",
  shadow: "Ombra",
  "font-size": "Dimensione testo",
  "font-weight": "Peso testo",
  tracking: "Spaziatura lettere",
  leading: "Interlinea",
};

const PADDING_PREFIX_PARTS: Record<string, string> = {
  p: "Padding",
  px: "Padding orizzontale",
  py: "Padding verticale",
  pt: "Padding superiore",
  pr: "Padding destro",
  pb: "Padding inferiore",
  pl: "Padding sinistro",
  ps: "Padding iniziale",
  pe: "Padding finale",
};

const SIZE_PREFIX_PARTS: Record<string, string> = {
  w: "Larghezza",
  h: "Altezza",
  size: "Dimensione (larghezza e altezza)",
};

const MODIFIER_SEGMENT = String.raw`[\w-]+(?:\[[^\]]*\])?(?:/[\w-]+)?`;
const MODIFIER_CHAIN = `((?:${MODIFIER_SEGMENT}:)*)`;

function buildRegexes() {
  const colorAlt = [...SEMANTIC_COLOR_NAMES].sort((a, b) => b.length - a.length).join("|");
  const prefixAlt = COLOR_PREFIXES.join("|");
  return {
    color: new RegExp(`${MODIFIER_CHAIN}\\b(?:${prefixAlt})-(?:${colorAlt})(?:/\\d{1,3})?\\b`, "g"),
    radius: new RegExp(`${MODIFIER_CHAIN}\\brounded(?:-(?:${RADIUS_NAMES.join("|")}))?\\b(?!-)`, "g"),
    shadow: new RegExp(`${MODIFIER_CHAIN}\\bshadow-(?:${SHADOW_NAMES.join("|")})\\b`, "g"),
    fontSize: new RegExp(`${MODIFIER_CHAIN}\\btext-(?:${FONT_SIZE_NAMES.join("|")})\\b`, "g"),
    fontWeight: new RegExp(`${MODIFIER_CHAIN}\\bfont-(?:${FONT_WEIGHT_NAMES.join("|")})\\b`, "g"),
    tracking: new RegExp(`${MODIFIER_CHAIN}\\btracking-(?:${TRACKING_NAMES.join("|")})\\b`, "g"),
    leading: new RegExp(`${MODIFIER_CHAIN}\\bleading-(?:${LEADING_NAMES.join("|")})\\b`, "g"),
    padding: new RegExp(`${MODIFIER_CHAIN}\\bp(?:[xytrblse])?-\\d+(?:\\.\\d+)?\\b`, "g"),
    size: new RegExp(`${MODIFIER_CHAIN}\\b(?:size|w|h)-\\d+(?:\\.\\d+)?\\b`, "g"),
  };
}

const REGEXES = buildRegexes();

/** Friendly Italian label for a single recognized modifier keyword. */
const MODIFIER_LABELS: Record<string, string> = {
  hover: "hover",
  "group-hover": "hover",
  "peer-hover": "hover",
  focus: "focus",
  "focus-visible": "focus",
  "focus-within": "focus",
  "group-focus": "focus",
  "peer-focus": "focus",
  active: "attivo",
  disabled: "disabilitato",
  dark: "dark",
  "aria-invalid": "invalido",
  "aria-selected": "selezionato",
  "aria-checked": "selezionato",
  "aria-disabled": "disabilitato",
  first: "primo elemento",
  last: "ultimo elemento",
  sm: "da 640px",
  md: "da 768px",
  lg: "da 1024px",
  xl: "da 1280px",
  "2xl": "da 1536px",
  file: "bottone file",
  placeholder: "placeholder",
  selection: "testo selezionato",
  before: "::before",
  after: "::after",
  marker: "marcatore",
  backdrop: "backdrop",
  // shadcn/tailwind.css's own bare custom variants (@custom-variant
  // data-checked, data-open, ...) — a different, unbracketed vocabulary
  // from data-[state=checked]:, and how this "base"/"luma" component set
  // actually expresses these states in its @apply rules.
  "data-open": "aperto",
  "data-closed": "chiuso",
  "data-checked": "selezionato",
  "data-unchecked": "deselezionato",
  "data-selected": "selezionato",
  "data-disabled": "disabilitato",
  "data-active": "attivo",
  "data-horizontal": "orizzontale",
  "data-vertical": "verticale",
};

const DATA_STATE_LABELS: Record<string, string> = {
  on: "attivo",
  off: "inattivo",
  active: "attivo",
  inactive: "inattivo",
  open: "aperto",
  closed: "chiuso",
  checked: "selezionato",
  unchecked: "deselezionato",
  true: "attivo",
  false: "inattivo",
  top: "lato superiore",
  right: "lato destro",
  bottom: "lato inferiore",
  left: "lato sinistro",
  horizontal: "orizzontale",
  vertical: "verticale",
};

function labelForDataState(segment: string): string | null {
  const m = segment.match(/^(?:group-|peer-)?data-\[state=([\w-]+)\]$/);
  return m ? (DATA_STATE_LABELS[m[1]] ?? null) : null;
}

function labelForAnyAttr(segment: string): string | null {
  const hasDescendant = /^(?:group-|peer-)?has-/.test(segment);
  const base = segment.replace(/^(?:group-|peer-)?(?:has-)?/, "");
  const m = base.match(/^(?:data|aria)-\[([\w-]+)(?:=([\w-]+))?\]$/);
  if (!m) return null;
  const [, key, value] = m;
  const label = value ? `${key}: ${DATA_STATE_LABELS[value] ?? value}` : key;
  return hasDescendant ? `se contiene ${label}` : label;
}

/** Turns a captured modifier chain like "dark:focus-visible:" into a
 *  short label like "dark, focus" for the Parte column, or null when the
 *  class is unconditional. A leading "not-" (Tailwind's generic negation
 *  modifier, e.g. "not-dark:", "not-data-checked:") is peeled off and
 *  reported as "non <label>" rather than swallowed — it inverts the
 *  condition, so dropping it would misreport when the class applies. */
function describeModifiers(chain: string): string | null {
  const labels: string[] = [];
  for (const raw of chain.split(":").filter(Boolean)) {
    const segment = raw.replace(/\/[\w-]+$/, "");
    const negated = segment.startsWith("not-");
    const base = negated ? segment.slice(4) : segment;
    const label = MODIFIER_LABELS[base] ?? labelForDataState(base) ?? labelForAnyAttr(base);
    if (!label) continue;
    const finalLabel = negated ? `non ${label}` : label;
    if (!labels.includes(finalLabel)) labels.push(finalLabel);
  }
  return labels.length ? labels.join(", ") : null;
}

function cssVarForColorClass(className: string): string {
  const prefix = matchedColorPrefix(className);
  const rest = prefix ? className.slice(prefix.length + 1) : className.split("-").slice(1).join("-");
  const name = rest.replace(/\/\d{1,3}$/, "");
  return `--${name}`;
}

function partForPaddingClass(className: string): string {
  const prefix = className.split("-")[0];
  return PADDING_PREFIX_PARTS[prefix] ?? prefix;
}

function partForSizeClass(className: string): string {
  const prefix = className.split("-")[0];
  return SIZE_PREFIX_PARTS[prefix] ?? prefix;
}

function* findUtilities(source: string, regex: RegExp): Generator<[string, string | null]> {
  for (const match of source.matchAll(regex)) {
    const chain = match[1];
    yield [match[0].slice(chain.length), describeModifiers(chain)];
  }
}

/** Scans component source text for every recognized token-bearing
 *  utility class and returns deduplicated, categorized matches. Callers
 *  in this repo should run the source through expandCnClasses() first —
 *  see lib/cn-classes.ts — since this function only looks at literal
 *  Tailwind utility classes, and most of them live behind a cn-* class
 *  here, not directly on the element. */
export function extractTokenMatches(source: string): TokenMatch[] {
  const seen = new Map<string, TokenMatch>();

  const add = (
    className: string,
    category: TokenCategory,
    cssVar: string,
    part: string,
    state: string | null
  ) => {
    if (!seen.has(className)) seen.set(className, { className, category, cssVar, part, state });
  };

  for (const [m, state] of findUtilities(source, REGEXES.color)) {
    add(m, "color", cssVarForColorClass(m), partForColorClass(m), state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.radius)) {
    const suffix = m.includes("-") ? m.split("-").slice(1).join("-") : "sm";
    add(m, "radius", `--radius-${suffix}`, PART_LABELS.radius, state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.shadow)) {
    add(m, "shadow", `--shadow-${m.split("-").slice(1).join("-")}`, PART_LABELS.shadow, state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.fontSize)) {
    add(m, "font-size", `--text-${m.split("-").slice(1).join("-")}`, PART_LABELS["font-size"], state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.fontWeight)) {
    add(m, "font-weight", `--font-weight-${m.split("-").slice(1).join("-")}`, PART_LABELS["font-weight"], state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.tracking)) {
    add(m, "tracking", `--tracking-${m.split("-").slice(1).join("-")}`, PART_LABELS.tracking, state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.leading)) {
    add(m, "leading", `--leading-${m.split("-").slice(1).join("-")}`, PART_LABELS.leading, state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.padding)) {
    add(m, "padding", "--spacing", partForPaddingClass(m), state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.size)) {
    add(m, "size", "--spacing", partForSizeClass(m), state);
  }

  return [...seen.values()].sort((a, b) =>
    a.category === b.category ? a.className.localeCompare(b.className) : a.category.localeCompare(b.category)
  );
}

export const CATEGORY_LABELS: Record<TokenCategory, string> = {
  color: "Colore (semantico)",
  radius: "Radius",
  shadow: "Ombra",
  "font-size": "Font size",
  "font-weight": "Font weight",
  tracking: "Tracking",
  leading: "Leading",
  padding: "Padding",
  size: "Size",
};
