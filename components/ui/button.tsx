import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  // No transition-all here: .cn-button in style-luma.css sets its own
  // explicit `transition` (a Tailwind utilities-layer class like
  // transition-all would win over anything set in that base-layer rule
  // regardless of source order — the same cascade-layer trap fixed
  // earlier for ButtonGroup — so the press animation's spring easing
  // has to be the only thing driving this element's transitions).
  "cn-button group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cn-button-variant-default",
        outline: "cn-button-variant-outline",
        secondary: "cn-button-variant-secondary",
        ghost: "cn-button-variant-ghost",
        destructive: "cn-button-variant-destructive",
        link: "cn-button-variant-link",
      },
      size: {
        default: "cn-button-size-default",
        xs: "cn-button-size-xs",
        sm: "cn-button-size-sm",
        lg: "cn-button-size-lg",
        icon: "cn-button-size-icon",
        "icon-xs": "cn-button-size-icon-xs",
        "icon-sm": "cn-button-size-icon-sm",
        "icon-lg": "cn-button-size-icon-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {/* Press scales the button itself down slightly (.cn-button's
       * active:scale-*); this inner wrapper carries the inverse scale
       * so the shrink reads on the container only, not on the label
       * or icon — see .cn-button-content in style-luma.css. */}
      <span data-slot="button-content" className="cn-button-content">
        {children}
      </span>
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
