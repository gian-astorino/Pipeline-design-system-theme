import Link from "next/link";

import { allEntries, categories } from "@/lib/components-catalog";

export default function ComponentsIndexPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold">Libreria componenti</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          I 62 componenti della variante <code className="rounded bg-muted px-1 py-0.5 text-xs">base</code>{" "}
          (Base UI) vendorizzati in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">components/ui</code>, con lo stile{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">luma</code> applicato. Scegline uno
          dalla barra laterale per vedere la demo dal vivo e la tabella dei token che ne determinano
          l&apos;aspetto.
        </p>
      </div>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category} className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">{category}</h3>
            <ul className="flex flex-col gap-1">
              {allEntries
                .filter((e) => e.category === category)
                .map((item) => (
                  <li key={item.slug}>
                    <Link href={`/components/${item.slug}/`} className="text-sm hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
