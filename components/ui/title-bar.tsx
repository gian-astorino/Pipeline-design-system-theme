import * as React from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { CaretLeft, MagnifyingGlass } from "@/components/icons"

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

function TitleBarBackButton({
  className,
  children = "Back",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="link"
      data-slot="title-bar-back-button"
      className={cn("cn-title-bar-back-button", className)}
      {...props}
    >
      <CaretLeft weight="bold" data-icon="inline-start" />
      {children}
    </Button>
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
        className={className}
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
  TitleBarBackButton,
  TitleBarSearchField,
}
