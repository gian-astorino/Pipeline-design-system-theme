"use client";

import type { TokenMatch } from "@/lib/token-dictionary";
import type { ThemeVarMapping } from "@/lib/parse-theme-vars";
import { AutoTokenTable } from "@/components/catalog/auto-token-table";
import { demoRegistry } from "@/components/catalog/demo-registry";

export function ComponentDemo({
  slug,
  file,
  matches,
  themeVars,
}: {
  slug: string;
  file: string;
  matches: TokenMatch[];
  themeVars: ThemeVarMapping;
}) {
  const Demo = demoRegistry[slug];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Demo</h3>
        {Demo ? (
          <div className="overflow-x-auto rounded-lg border border-border [contain:layout]">
            <Demo />
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            Nessuna demo disponibile per questo componente.
          </p>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Token collegati</h3>
        <AutoTokenTable matches={matches} file={file} themeVars={themeVars} />
      </div>
    </div>
  );
}
