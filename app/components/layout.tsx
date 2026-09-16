import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/ssr";

import { CatalogNav } from "@/components/catalog/catalog-nav";
import { Button } from "@/components/ui/button";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full min-h-svh max-w-7xl flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div className="flex flex-col gap-1">
          <Button render={<Link href="/" />} variant="ghost" size="xs" className="w-fit -ml-2">
            <ArrowLeft className="size-4" />
            Home
          </Button>
          <h1 className="text-xl font-semibold tracking-tight">Componenti</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-8 px-6 py-8 md:flex-row">
        <aside className="shrink-0 md:w-56">
          <CatalogNav />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
