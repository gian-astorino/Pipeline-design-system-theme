"use client";

import * as React from "react";

import type { SemanticToken } from "@/lib/design-tokens";

/** Two hidden, always-mounted probe elements — a plain `.dark` class
 *  resolves the dark-mode value via ordinary CSS variable inheritance
 *  from anywhere in the document, no theme switch required. Same trick
 *  Pipelean's own /tokens page uses. */
export function ColorProbes() {
  return (
    <>
      <div id="token-probe-light" className="hidden" />
      <div id="token-probe-dark" className="dark hidden" />
    </>
  );
}

function useComputedVarBothModes(cssVar: string) {
  const [values, setValues] = React.useState({ light: "", dark: "" });

  React.useEffect(() => {
    const read = () => {
      const light = document.getElementById("token-probe-light");
      const dark = document.getElementById("token-probe-dark");
      setValues({
        light: light ? getComputedStyle(light).getPropertyValue(cssVar).trim() : "",
        dark: dark ? getComputedStyle(dark).getPropertyValue(cssVar).trim() : "",
      });
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });
    return () => observer.disconnect();
  }, [cssVar]);

  return values;
}

function useComputedVar(cssVar: string) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const read = () =>
      setValue(getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim());
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [cssVar]);

  return value;
}

function TableShell({
  title,
  description,
  headers,
  children,
}: {
  title: string;
  description: string;
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border [contain:layout]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
              {headers.map((h) => (
                <th key={h} className="px-3 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function ModeValue({ values }: { values: { light: string; dark: string } }) {
  return (
    <div className="flex flex-col gap-0.5">
      <code className="whitespace-nowrap font-mono text-xs text-muted-foreground" title={values.light}>
        ☀ {values.light || "…"}
      </code>
      <code className="whitespace-nowrap font-mono text-xs text-muted-foreground" title={values.dark}>
        ☾ {values.dark || "…"}
      </code>
    </div>
  );
}

function SemanticColorRow({
  token,
  showForegroundColumn,
}: {
  token: SemanticToken;
  showForegroundColumn: boolean;
}) {
  const values = useComputedVarBothModes(token.cssVar);
  const fgValues = useComputedVarBothModes(token.foregroundVar ?? token.cssVar);
  const liveValue = useComputedVar(token.cssVar);
  const liveFg = useComputedVar(token.foregroundVar ?? token.cssVar);

  return (
    <tr className="border-b border-border last:border-0">
      <td className="whitespace-nowrap px-3 py-2 font-mono text-sm font-medium text-foreground">
        {token.name}
      </td>
      <td className="px-3 py-2">
        <div
          className="flex h-8 w-16 items-center justify-center rounded-md border border-border text-xs font-medium"
          style={{
            background: liveValue ? `var(${token.cssVar})` : undefined,
            color: token.foregroundVar && liveFg ? `var(${token.foregroundVar})` : undefined,
          }}
        >
          Aa
        </div>
      </td>
      <td className="px-3 py-2">
        <span className="font-mono text-xs text-muted-foreground">{token.cssVar}</span>
      </td>
      <td className="px-3 py-2">
        <ModeValue values={values} />
      </td>
      {showForegroundColumn && (
        <td className="px-3 py-2">
          {token.foregroundVar ? (
            <ModeValue values={fgValues} />
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
        </td>
      )}
      <td className="px-3 py-2 text-xs text-muted-foreground">{token.description}</td>
    </tr>
  );
}

export function SemanticColorTable({
  category,
  tokens,
}: {
  category: string;
  tokens: SemanticToken[];
}) {
  const hasForeground = tokens.some((t) => t.foregroundVar);
  return (
    <TableShell
      title={category}
      description="Valore risolto in tema chiaro (☀) e scuro (☾), letto dal vivo senza dover cambiare tema."
      headers={[
        "Token",
        "Anteprima",
        "CSS var",
        "Valore",
        ...(hasForeground ? ["Foreground"] : []),
        "Descrizione",
      ]}
    >
      {tokens.map((token) => (
        <SemanticColorRow key={token.name} token={token} showForegroundColumn={hasForeground} />
      ))}
    </TableShell>
  );
}
