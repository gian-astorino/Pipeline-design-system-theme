import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/ssr";

import {
  semanticGroups,
  spacingScale,
  radiusScale,
  shadowScale,
  fontSizeScale,
  fontWeightScale,
  trackingScale,
  leadingScale,
} from "@/lib/design-tokens";
import { ColorProbes, SemanticColorTable } from "@/components/color-token-table";
import { ScaleTable } from "@/components/scale-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sections = [
  { href: "#semantici", label: "1. Token semantici" },
  { href: "#spacing", label: "2. Spacing & sizing" },
  { href: "#radius", label: "3. Radius" },
  { href: "#ombre", label: "4. Ombre" },
  { href: "#tipografia", label: "5. Tipografia" },
];

export default function TokensPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10">
      <ColorProbes />
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Button render={<Link href="/" />} variant="ghost" size="xs" className="-ml-2 w-fit">
            <ArrowLeft className="size-4" />
            Home
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Token</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Preset <code className="rounded bg-muted px-1 py-0.5 text-xs">b1aIcFPlK</code> (base=base,
            style=luma, theme=blue, baseColor=neutral). A differenza di un sistema con una rampa
            primitiva nominata, qui ogni ruolo punta direttamente a un valore{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">oklch()</code> letterale — non c&apos;è
            un secondo livello da mostrare, il valore qui sotto è la fonte, non un puntatore.
          </p>
        </div>
      </header>

      <nav className="flex flex-wrap gap-x-4 gap-y-1 border-y border-border py-2 text-sm text-muted-foreground">
        {sections.map((s) => (
          <a key={s.href} href={s.href} className="hover:text-foreground">
            {s.label}
          </a>
        ))}
      </nav>

      <section id="semantici" className="flex scroll-mt-6 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">1. Token semantici (ruoli)</h2>
          <p className="text-sm text-muted-foreground">
            {semanticGroups.reduce((n, g) => n + g.tokens.length, 0)} ruoli in{" "}
            {semanticGroups.length} gruppi. Nessun gruppo &quot;Status&quot; di stati custom (success /
            warning / info): questo preset non li aggiunge, a differenza di Pipelean.
          </p>
        </div>
        {semanticGroups.map((group) => (
          <SemanticColorTable key={group.category} category={group.category} tokens={group.tokens} />
        ))}
      </section>

      <Separator />

      <section id="spacing" className="flex scroll-mt-6 flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">2. Spacing &amp; sizing</h2>
          <p className="text-sm text-muted-foreground">
            Ogni passo è <code className="rounded bg-muted px-1 py-0.5 text-xs">calc(var(--spacing) * N)</code>{" "}
            — una singola primitiva condivisa, come in Tailwind v4 stock.
          </p>
        </div>
        <ScaleTable title="Spacing scale" description="Misurata dal vivo con size-N." rows={spacingScale} />
      </section>

      <Separator />

      <section id="radius" className="flex scroll-mt-6 flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">3. Radius</h2>
          <p className="text-sm text-muted-foreground">
            Scala custom a passi fissi (4 · 8 · 12 · 16 · 22 · 28 · 36px), non
            moltiplicatori di{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">--radius</code>.
            36px (<code className="rounded bg-muted px-1 py-0.5 text-xs">--radius-4xl</code>)
            è il radius più grande del sistema.
          </p>
        </div>
        <ScaleTable title="Radius scale" description="Misurata dal vivo con rounded-N." rows={radiusScale} />
      </section>

      <Separator />

      <section id="ombre" className="flex scroll-mt-6 flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">4. Ombre</h2>
          <p className="text-sm text-muted-foreground">
            Scala stock di Tailwind v4 — questo preset non la sovrascrive.
          </p>
        </div>
        <ScaleTable title="Shadow scale" description="Misurata dal vivo con shadow-N." rows={shadowScale} />
      </section>

      <Separator />

      <section id="tipografia" className="flex scroll-mt-6 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">5. Tipografia</h2>
          <p className="text-sm text-muted-foreground">
            Font <code className="rounded bg-muted px-1 py-0.5 text-xs">Inter</code> via next/font/google
            (preset: font=inter). Scale stock di Tailwind v4.
          </p>
        </div>
        <ScaleTable title="Font size" description="" rows={fontSizeScale} />
        <ScaleTable title="Font weight" description="" rows={fontWeightScale} />
        <ScaleTable title="Letter spacing (tracking)" description="" rows={trackingScale} />
        <ScaleTable title="Line height (leading)" description="" rows={leadingScale} />
      </section>
    </div>
  );
}
