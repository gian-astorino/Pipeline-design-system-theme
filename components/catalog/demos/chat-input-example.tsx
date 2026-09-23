"use client"

import * as React from "react"
import { Microphone, Plus } from "@/components/icons"

import { Example, ExampleWrapper } from "@/components/catalog/example"
import { Bubble, BubbleGroup } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  ChatInput,
  ChatInputActions,
  ChatInputSendButton,
  ChatInputTextarea,
  ChatInputToolbar,
} from "@/components/ui/chat-input"

export default function ChatInputExample() {
  return (
    <ExampleWrapper>
      <ChatInputBasic />
      <ChatInputInConversation />
      <ChatInputDisabled />
    </ExampleWrapper>
  )
}

function ChatInputBasic() {
  const [value, setValue] = React.useState("")

  return (
    <Example title="Basic">
      <ChatInput
        className="max-w-md"
        onSubmit={(event) => {
          event.preventDefault()
          setValue("")
        }}
      >
        <ChatInputTextarea
          placeholder="Scrivi qui..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <ChatInputToolbar>
          <ChatInputActions className="flex-1">
            <Button variant="secondary" size="icon-sm">
              <Plus />
            </Button>
          </ChatInputActions>
          <ChatInputActions>
            <Button variant="secondary" size="icon-sm">
              <Microphone />
            </Button>
            <ChatInputSendButton disabled={value.trim().length === 0} />
          </ChatInputActions>
        </ChatInputToolbar>
      </ChatInput>
    </Example>
  )
}

function ChatInputInConversation() {
  return (
    <Example
      title="In Conversazione"
      containerClassName="lg:col-span-full 2xl:col-span-full"
    >
      <div className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl bg-muted p-4">
        <BubbleGroup className="gap-2">
          <Bubble align="end">Ciao! Puoi controllare lo stato del deploy?</Bubble>
          <Bubble variant="secondary">
            Certo, il deploy di produzione è completato senza errori 2 minuti fa.
          </Bubble>
        </BubbleGroup>
        <ChatInput onSubmit={(event) => event.preventDefault()}>
          <ChatInputTextarea placeholder="Scrivi qui..." />
          <ChatInputToolbar>
            <ChatInputActions className="flex-1">
              <Button variant="secondary" size="icon-sm">
                <Plus />
              </Button>
            </ChatInputActions>
            <ChatInputActions>
              <Button variant="secondary" size="icon-sm">
                <Microphone />
              </Button>
              <ChatInputSendButton />
            </ChatInputActions>
          </ChatInputToolbar>
        </ChatInput>
      </div>
    </Example>
  )
}

function ChatInputDisabled() {
  return (
    <Example title="Disabled">
      <ChatInput className="max-w-md">
        <ChatInputTextarea placeholder="Scrivi qui..." disabled />
        <ChatInputToolbar>
          <ChatInputActions className="flex-1">
            <Button variant="secondary" size="icon-sm" disabled>
              <Plus />
            </Button>
          </ChatInputActions>
          <ChatInputActions>
            <Button variant="secondary" size="icon-sm" disabled>
              <Microphone />
            </Button>
            <ChatInputSendButton disabled />
          </ChatInputActions>
        </ChatInputToolbar>
      </ChatInput>
    </Example>
  )
}
