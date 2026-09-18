"use client"

import * as React from "react"
import { ArrowUp } from "@phosphor-icons/react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

/** Floating message composer — a rounded, elevated form (matches how
 *  Popover/DropdownMenu content surfaces this system already uses:
 *  bg-popover + ring-foreground/5 + shadow-lg) meant to sit pinned at
 *  the bottom of a chat. Compose it from ChatInputTextarea and a
 *  ChatInputToolbar the way Card composes from CardHeader/CardContent. */
function ChatInput({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form
      data-slot="chat-input"
      className={cn(
        "flex w-full flex-col gap-1 rounded-2xl bg-popover p-2 text-popover-foreground shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10",
        className
      )}
      {...props}
    />
  )
}

function ChatInputTextarea({
  className,
  onKeyDown,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="chat-input-textarea"
      rows={1}
      className={cn(
        "min-h-9 resize-none border-none bg-transparent px-2 py-1.5 shadow-none focus-visible:ring-0",
        className
      )}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.key === "Enter" && !event.shiftKey && !event.defaultPrevented) {
          event.preventDefault()
          event.currentTarget.form?.requestSubmit()
        }
      }}
      {...props}
    />
  )
}

function ChatInputToolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-input-toolbar"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/** Left- or right-hand button cluster. The left cluster grows
 *  (flex-1) so it anchors to the toolbar's start while the right
 *  cluster stays put — same split Figma's own layout uses to keep
 *  extra actions on the left and mic/send pinned to the right. */
function ChatInputActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-input-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ChatInputSendButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="submit"
      size="icon-sm"
      aria-label="Invia messaggio"
      data-slot="chat-input-send"
      className={cn(className)}
      {...props}
    >
      {children ?? <ArrowUp />}
    </Button>
  )
}

export {
  ChatInput,
  ChatInputTextarea,
  ChatInputToolbar,
  ChatInputActions,
  ChatInputSendButton,
}
