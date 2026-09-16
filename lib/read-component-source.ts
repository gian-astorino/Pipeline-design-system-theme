import fs from "node:fs";
import path from "node:path";

import { expandCnClasses } from "@/lib/cn-classes";

/** Reads a component's real source and expands every cn-* class it uses
 *  into the utility classes app/style-luma.css resolves it to — see
 *  lib/cn-classes.ts for why that step exists here and didn't in
 *  Pipelean's version of this same function. */
export function readComponentSourceForTokens(file: string): string {
  const source = fs.readFileSync(
    path.join(process.cwd(), "components/ui", file),
    "utf-8"
  );
  return expandCnClasses(source);
}
