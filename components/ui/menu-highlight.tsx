"use client"

import * as React from "react"
import { cn } from "cn"

const RESET_EVENT = "cn-menu-highlight-reset"

/**
 * Tracks whether the user's last interaction was mouse or keyboard, as a
 * `data-input-modality` attribute on <html>. MenuHighlight only animates
 * for mouse: the instant per-item :focus background (still driven by the
 * component's own CSS) stays as the keyboard-navigation affordance, and
 * app/style-luma.css suppresses that same background specifically while
 * modality is "mouse" so the two don't show at once. Native :focus-visible
 * can't do this alone here because some of these components (Combobox,
 * Command) drive their highlight off `data-highlighted`/`data-selected`,
 * not real DOM focus, so there's no browser heuristic to lean on.
 */
function useInputModalityTracking() {
  React.useEffect(() => {
    const root = document.documentElement
    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "mouse") {
        root.dataset.inputModality = "mouse"
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "Home" ||
        event.key === "End" ||
        event.key === "Tab"
      ) {
        root.dataset.inputModality = "keyboard"
        // Tell every mounted MenuHighlight to hide: without this, a
        // sliding box left over from the last mouse position would sit
        // next to the item keyboard nav just instantly highlighted,
        // showing two "current" rows at once.
        window.dispatchEvent(new Event(RESET_EVENT))
      }
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    // capture: true — base-ui's own arrow-key menu navigation calls
    // stopPropagation() on these keys, which would otherwise stop a
    // bubble-phase listener on window from ever seeing them. Capture
    // fires top-down before that, so it isn't affected.
    window.addEventListener("keydown", onKeyDown, { capture: true })
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("keydown", onKeyDown, { capture: true })
    }
  }, [])
}

/**
 * A single shared "highlight" box that slides to track the cursor across a
 * menu's items, instead of each item popping its own hover background in
 * and out. Drop one as the FIRST child inside a menu's scrollable content
 * element (so later item children paint on top of it), and pass a ref to
 * that same content element as `containerRef` plus a CSS selector matching
 * only ITS OWN items (never a shared/generic selector — other components
 * reuse the same "-item" data-slot suffix and must not be affected).
 */
function MenuHighlight({
  containerRef,
  itemSelector,
  className,
}: {
  containerRef: React.RefObject<HTMLElement | null>
  itemSelector: string
  className?: string
}) {
  useInputModalityTracking()
  const highlightRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const container = containerRef.current
    const highlight = highlightRef.current
    if (!container || !highlight) return

    let activeItem: Element | null = null

    function moveTo(item: Element) {
      const containerRect = container!.getBoundingClientRect()
      const itemRect = item.getBoundingClientRect()
      highlight!.dataset.variant = item.getAttribute("data-variant") ?? "default"
      highlight!.style.opacity = "1"
      highlight!.style.width = `${itemRect.width}px`
      highlight!.style.height = `${itemRect.height}px`
      highlight!.style.transform = `translate(${itemRect.left - containerRect.left}px, ${itemRect.top - containerRect.top}px)`
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return
      const item = (event.target as Element | null)?.closest(itemSelector)
      if (!item || item.hasAttribute("data-disabled") || item === activeItem) {
        return
      }
      activeItem = item
      moveTo(item)
    }

    function onPointerLeave() {
      activeItem = null
      highlight!.style.opacity = "0"
    }

    function onReset() {
      activeItem = null
      highlight!.style.opacity = "0"
    }

    container.addEventListener("pointermove", onPointerMove)
    container.addEventListener("pointerleave", onPointerLeave)
    window.addEventListener(RESET_EVENT, onReset)
    return () => {
      container.removeEventListener("pointermove", onPointerMove)
      container.removeEventListener("pointerleave", onPointerLeave)
      window.removeEventListener(RESET_EVENT, onReset)
    }
  }, [containerRef, itemSelector])

  return (
    <span
      ref={highlightRef}
      aria-hidden="true"
      data-slot="menu-highlight"
      className={cn("cn-menu-highlight", className)}
    />
  )
}

export { MenuHighlight }
