import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { CaretLeft, MagnifyingGlass } from "@phosphor-icons/react"

function TitleBar({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="title-bar"
      className={cn("cn-title-bar flex flex-col", className)}
      {...props}
    />
  )
}

function TitleBarRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="title-bar-row"
      className={cn("cn-title-bar-row relative flex items-center justify-between", className)}
      {...props}
    />
  )
}

function TitleBarLeading({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="title-bar-leading"
      className={cn("cn-title-bar-leading flex items-center", className)}
      {...props}
    />
  )
}

function TitleBarTrailing({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="title-bar-trailing"
      className={cn("cn-title-bar-trailing flex items-center", className)}
      {...props}
    />
  )
}

function TitleBarTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="title-bar-title"
      className={cn(
        "cn-title-bar-title pointer-events-none absolute flex justify-center",
        className
      )}
      {...props}
    />
  )
}

function TitleBarLargeTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="title-bar-large-title"
      className={cn("cn-title-bar-large-title", className)}
      {...props}
    />
  )
}

const titleBarButtonVariants = cva(
  "cn-title-bar-button inline-flex shrink-0 items-center justify-center outline-none active:opacity-50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        text: "cn-title-bar-button-variant-text",
        icon: "cn-title-bar-button-variant-icon",
      },
    },
    defaultVariants: {
      variant: "text",
    },
  }
)

function TitleBarButton({
  className,
  variant = "text",
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof titleBarButtonVariants>) {
  return (
    <button
      type="button"
      data-slot="title-bar-button"
      className={cn(titleBarButtonVariants({ variant }), className)}
      {...props}
    />
  )
}

function TitleBarBackButton({
  className,
  children = "Back",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <TitleBarButton className={cn("cn-title-bar-back-button", className)} {...props}>
      <CaretLeft weight="bold" />
      {children}
    </TitleBarButton>
  )
}

function TitleBarSearchField({
  className,
  placeholder = "Search",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <InputGroup className="cn-title-bar-search-field">
      <InputGroupAddon>
        <MagnifyingGlass />
      </InputGroupAddon>
      <InputGroupInput
        data-slot="title-bar-search-input"
        placeholder={placeholder}
        className={cn("cn-title-bar-search-input", className)}
        {...props}
      />
    </InputGroup>
  )
}

export {
  TitleBar,
  TitleBarRow,
  TitleBarLeading,
  TitleBarTrailing,
  TitleBarTitle,
  TitleBarLargeTitle,
  TitleBarButton,
  TitleBarBackButton,
  TitleBarSearchField,
  titleBarButtonVariants,
}
