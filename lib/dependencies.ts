import fs from "node:fs";
import path from "node:path";

export type DependencyInfo = {
  name: string;
  description: string;
  usedBy?: string;
};

export type DependencyGroup = {
  category: string;
  description: string;
  items: (DependencyInfo & { version: string })[];
};

const DEPENDENCY_INFO: Record<string, DependencyInfo> = {
  "@base-ui/react": { name: "@base-ui/react", description: "Primitive UI accessibili e senza stile — la base di tutti i 62 componenti (preset base=base)." },
  cn: { name: "cn", description: "Merge di classi Tailwind, drop-in replacement di clsx + tailwind-merge." },
  "class-variance-authority": { name: "class-variance-authority", description: "Definizione delle varianti (variant/size) dei componenti." },
  "tw-animate-css": { name: "tw-animate-css", description: "Utility di animazione per Tailwind v4 (accordion, collapsible, ...)." },
  shadcn: { name: "shadcn", description: "CLI shadcn — usata qui solo per il layer di utility condivise (shadcn/tailwind.css)." },
  cmdk: { name: "cmdk", description: "Command palette.", usedBy: "Command" },
  "embla-carousel-react": { name: "embla-carousel-react", description: "Motore dello slider: drag, snap, autoplay.", usedBy: "Carousel" },
  "input-otp": { name: "input-otp", description: "Input per codici one-time.", usedBy: "Input OTP" },
  "react-day-picker": { name: "react-day-picker", description: "Motore del calendario: navigazione mesi, selezione.", usedBy: "Calendar" },
  "date-fns": { name: "date-fns", description: "Formattazione e calcolo date.", usedBy: "Calendar" },
  "react-resizable-panels": { name: "react-resizable-panels", description: "Pannelli ridimensionabili via drag.", usedBy: "Resizable" },
  recharts: { name: "recharts", description: "Libreria di grafici basata su D3.", usedBy: "Chart" },
  sonner: { name: "sonner", description: "Toast notifications.", usedBy: "Sonner" },
  "@shadcn/react": { name: "@shadcn/react", description: "Pacchetto ufficiale shadcn per i componenti più recenti del registry.", usedBy: "Message Scroller, Questionnaire" },
  "@phosphor-icons/react": { name: "@phosphor-icons/react", description: "Icon pack (preset: iconLibrary=phosphor)." },
  "next-themes": { name: "next-themes", description: "Toggle chiaro/scuro." },
};

const GROUPS: { category: string; description: string; names: string[] }[] = [
  {
    category: "Primitive UI",
    description: "La base non stilizzata di ogni componente.",
    names: ["@base-ui/react", "cn", "class-variance-authority", "tw-animate-css", "shadcn"],
  },
  {
    category: "Librerie per componente specifico",
    description: "Comportamento complesso che un solo componente non può implementare da solo.",
    names: ["cmdk", "embla-carousel-react", "input-otp", "react-day-picker", "date-fns", "react-resizable-panels", "recharts", "sonner", "@shadcn/react"],
  },
  {
    category: "Infrastruttura trasversale",
    description: "Font, icone, tema — non vivono nel sistema di token ma sono scelte a livello di codice.",
    names: ["@phosphor-icons/react", "next-themes"],
  },
];

let cached: DependencyGroup[] | null = null;

export function getDependencyGroups(): DependencyGroup[] {
  if (cached) return cached;
  const pkg = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8")
  );
  const allDeps: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies };

  cached = GROUPS.map((g) => ({
    category: g.category,
    description: g.description,
    items: g.names.map((name) => ({
      ...(DEPENDENCY_INFO[name] ?? { name, description: "" }),
      version: allDeps[name] ?? "?",
    })),
  }));
  return cached;
}
