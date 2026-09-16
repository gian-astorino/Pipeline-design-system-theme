import fs from "node:fs";
import path from "node:path";

/**
 * In this repo's component set (shadcn's "base" registry + the "luma"
 * style), a component's colors/radius/spacing don't sit directly on the
 * element as Tailwind utility classes — they sit one layer down, behind a
 * `cn-*` class whose real utilities live in an `@apply` rule in
 * app/style-luma.css. `className="cn-button-variant-default"` tells you
 * nothing about `--primary` until you resolve what `.cn-button-variant-default`
 * actually applies.
 *
 * This builds that resolution table once: cn-class name -> the space-joined
 * utility classes every `@apply` inside its rule block contributes (nested
 * selectors included, flattened — a state-specific `@apply` inside a nested
 * block still describes a real condition on this cn-class, just not one we
 * try to keep separate from the unconditional rules here).
 */

let cached: Map<string, string> | null = null;

function findMatchingBrace(css: string, openIndex: number): number {
  let depth = 1;
  let i = openIndex + 1;
  while (depth > 0 && i < css.length) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") depth--;
    i++;
  }
  return i - 1;
}

export function getCnClassMap(): Map<string, string> {
  if (cached) return cached;

  const css = fs.readFileSync(
    path.join(process.cwd(), "app/style-luma.css"),
    "utf-8"
  );

  const map = new Map<string, Set<string>>();
  const ruleRe = /\.cn-([\w-]+)\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = ruleRe.exec(css))) {
    const className = `cn-${m[1]}`;
    const openIndex = m.index + m[0].length - 1;
    const closeIndex = findMatchingBrace(css, openIndex);
    const block = css.slice(openIndex + 1, closeIndex);

    const applyRe = /@apply\s+([^;]+);/g;
    let a: RegExpExecArray | null;
    const utilities = map.get(className) ?? new Set<string>();
    while ((a = applyRe.exec(block))) {
      for (const cls of a[1].trim().split(/\s+/)) utilities.add(cls);
    }
    map.set(className, utilities);

    ruleRe.lastIndex = closeIndex; // skip past this block, including nested rules
  }

  const flat = new Map<string, string>();
  for (const [k, v] of map) flat.set(k, [...v].join(" "));
  cached = flat;
  return flat;
}

const CN_CLASS_RE = /\bcn-[\w-]+\b/g;

/**
 * Rewrites every `cn-*` token found in `source` to itself followed by the
 * utility classes it resolves to, e.g. "cn-button-variant-default" becomes
 * "cn-button-variant-default bg-primary text-primary-foreground ...". Feed
 * the result to the same Tailwind-class extractor used elsewhere — it
 * already ignores anything it doesn't recognize, so the untouched `cn-*`
 * tokens themselves are harmless noise, not a second thing to filter.
 */
export function expandCnClasses(source: string): string {
  const cnMap = getCnClassMap();
  return source.replace(CN_CLASS_RE, (token) => {
    const expansion = cnMap.get(token);
    return expansion ? `${token} ${expansion}` : token;
  });
}
