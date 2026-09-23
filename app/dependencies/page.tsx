import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

import { getDependencyGroups } from "@/lib/dependencies";
import { Button } from "@/components/ui/button";

function TableShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
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
              <th className="px-3 py-2 font-medium">Pacchetto</th>
              <th className="px-3 py-2 font-medium">Versione</th>
              <th className="px-3 py-2 font-medium">Usato da</th>
              <th className="px-3 py-2 font-medium">Descrizione</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default function DependenciesPage() {
  const groups = getDependencyGroups();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10">
      <header className="flex flex-col gap-1">
        <Button render={<Link href="/" />} variant="ghost" size="xs" className="-ml-2 w-fit">
          <ArrowLeft className="size-4" />
          Home
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">Dipendenze esterne</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Versione letta dal vivo da{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">package.json</code>, così non va mai
          fuori sincrono con quella davvero installata.
        </p>
      </header>

      {groups.map((group) => (
        <TableShell key={group.category} title={group.category} description={group.description}>
          {group.items.map((item) => (
            <tr key={item.name} className="border-b border-border last:border-0">
              <td className="whitespace-nowrap px-3 py-2 font-mono text-sm font-medium text-foreground">
                {item.name}
              </td>
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-muted-foreground">
                {item.version}
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground">
                {item.usedBy ?? "—"}
              </td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{item.description}</td>
            </tr>
          ))}
        </TableShell>
      ))}
    </div>
  );
}
