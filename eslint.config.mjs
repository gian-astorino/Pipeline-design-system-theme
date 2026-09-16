import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // hooks/use-mobile.ts and components/ui/carousel.tsx are copied
    // verbatim from shadcn-ui/ui's "base" registry (registry/bases/base),
    // not authored here. Both call setState synchronously inside a plain
    // (non-layout) effect to read an initial value — a real, working
    // pattern, just stricter than react-hooks/set-state-in-effect (new in
    // this eslint-config-next release) allows. Downgrading it to a warning
    // keeps `lint` actionable without hand-editing upstream component
    // source to satisfy a newer rule than it was written against.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
