"use client";

import * as React from "react";

import { CATEGORY_LABELS, type TokenMatch } from "@/lib/token-dictionary";
import type { ThemeVarMapping } from "@/lib/parse-theme-vars";
import { semanticTokenGroup } from "@/lib/design-tokens";
import { TokenValueCell } from "@/components/catalog/token-value";

/**
 * Adapted from the Pipelean Design System Playground's auto-token-table.tsx.
 * One real difference: Pipelean's globals.css points every semantic role at
 * a *named* primitive (`--primary: var(--color-brand-600)`), so its "Token
 * primitivo" column could show that name. This repo's globals.css (stock
 * shadcn "base"/"luma") sets roles to literal oklch() values directly —
 * there's no primitive layer to name — so the column instead shows the raw
 * declared value for light/dark, straight from app/globals.css.
 */

function ThemeValue({ values }: { values: { light: string | null; dark: string | null } }) {
  if (!values.light && !values.dark) return <span>—</span>;
  if (values.light === values.dark) {
    return <span title={values.light ?? ""}>{values.light}</span>;
  }
  return (
    <div className="flex flex-col gap-0.5">
      <span className="truncate" title={values.light ?? ""}>☀ {values.light ?? "—"}</span>
      <span className="truncate" title={values.dark ?? ""}>☾ {values.dark ?? "—"}</span>
    </div>
  );
}

export function AutoTokenTable({
  matches,
  file,
  themeVars,
}: {
  matches: TokenMatch[];
  file: string;
  themeVars: ThemeVarMapping;
}) {
  if (matches.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nessun token rilevato automaticamente in{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">{file}</code>.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border [contain:layout]">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
            <th className="px-3 py-2 font-medium">Parte</th>
            <th className="px-3 py-2 font-medium">Classe Tailwind</th>
            <th className="px-3 py-2 font-medium">Gruppo</th>
            <th className="px-3 py-2 font-medium">Valore dichiarato</th>
            <th className="px-3 py-2 font-medium">Valore risolto</th>
            <th className="px-3 py-2 font-medium">Categoria</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => {
            const entry = m.category === "color" ? themeVars[m.cssVar] : undefined;
            return (
              <tr key={m.className} className="border-b border-border last:border-0">
                <td className="whitespace-nowrap px-3 py-2 font-medium text-foreground">
                  {m.part}
                  {m.state ? <span className="font-normal text-muted-foreground"> ({m.state})</span> : null}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-foreground">
                  {m.className}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground">
                  {semanticTokenGroup(m.cssVar) ?? "—"}
                </td>
                <td className="max-w-[200px] px-3 py-2 font-mono text-xs text-muted-foreground">
                  {entry ? <ThemeValue values={entry} /> : "—"}
                </td>
                <td className="px-3 py-2">
                  <TokenValueCell match={m} />
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground">
                  {CATEGORY_LABELS[m.category]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
