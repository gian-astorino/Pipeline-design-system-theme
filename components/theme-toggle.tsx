"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "@/components/icons"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Cambia tema chiaro/scuro"
      title="Cambia tema (scorciatoia: d)"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50"
    >
      {/* CSS-driven, not state-driven: next-themes applies the .dark
          class before hydration, so switching icons with dark: avoids
          the mount-guard dance (and its light->dark flash) that a
          resolvedTheme-based conditional would need. */}
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  )
}
