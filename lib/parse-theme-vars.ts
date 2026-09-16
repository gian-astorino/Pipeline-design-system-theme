import fs from "node:fs";
import path from "node:path";

export type ThemeVarMapping = Record<string, { light: string | null; dark: string | null }>;

function parseBlock(css: string, selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return {};
  const bodyStart = css.indexOf("{", start) + 1;
  let depth = 1;
  let i = bodyStart;
  while (depth > 0 && i < css.length) {
    if (css[i] === "{") depth++;
    if (css[i] === "}") depth--;
    i++;
  }
  const body = css.slice(bodyStart, i - 1);

  const vars: Record<string, string> = {};
  const declRe = /--([\w-]+):\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = declRe.exec(body))) {
    vars[`--${m[1]}`] = m[2].trim();
  }
  return vars;
}

let cached: ThemeVarMapping | null = null;

/** Reads app/globals.css and maps every semantic token (`--primary`,
 *  `--accent-foreground`, ...) to its resolved value in light and dark
 *  mode. Unlike Pipelean's globals.css, roles here are set as literal
 *  oklch() values directly — there's no "--color-brand-600" primitive
 *  layer to name, so the value itself is the most useful thing to show. */
export function getThemeVarValues(): ThemeVarMapping {
  if (cached) return cached;

  const css = fs.readFileSync(
    path.join(process.cwd(), "app/globals.css"),
    "utf-8"
  );
  const light = parseBlock(css, ":root");
  const dark = parseBlock(css, ".dark");

  const mapping: ThemeVarMapping = {};
  for (const name of new Set([...Object.keys(light), ...Object.keys(dark)])) {
    mapping[name] = {
      light: light[name] ?? null,
      dark: name in dark ? dark[name] : (light[name] ?? null),
    };
  }
  cached = mapping;
  return mapping;
}
