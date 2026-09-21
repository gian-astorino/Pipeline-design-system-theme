"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "cn-switch peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* No transition-transform here: .cn-switch-thumb in
       * style-luma.css sets its own explicit `transition` covering
       * both the checked/unchecked slide (translate) and the press
       * animation (scale) — a utilities-layer class like
       * transition-transform would win over that base-layer rule
       * regardless of source order, same cascade-layer trap fixed
       * for Button's press animation. */}
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="cn-switch-thumb pointer-events-none block ring-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
