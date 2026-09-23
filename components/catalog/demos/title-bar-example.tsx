import { Example, ExampleWrapper } from "@/components/catalog/example"
import { Button } from "@/components/ui/button"
import {
  TitleBar,
  TitleBarBackButton,
  TitleBarLargeTitle,
  TitleBarLeading,
  TitleBarRow,
  TitleBarSearchField,
  TitleBarTitle,
  TitleBarTrailing,
} from "@/components/ui/title-bar"
import { Bell, GearSix, Share } from "@/components/icons"

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border">
      {children}
      <div className="h-24 bg-muted/30" />
    </div>
  )
}

export default function TitleBarExample() {
  return (
    <ExampleWrapper>
      <TitleBarBasic />
      <TitleBarWithBackButton />
      <TitleBarModal />
      <TitleBarLargeTitleExample />
      <TitleBarLargeTitleWithSearch />
      <TitleBarSearchActive />
    </ExampleWrapper>
  )
}

function TitleBarBasic() {
  return (
    <Example title="Basic">
      <Frame>
        <TitleBar>
          <TitleBarRow>
            <TitleBarLeading />
            <TitleBarTitle>Settings</TitleBarTitle>
            <TitleBarTrailing />
          </TitleBarRow>
        </TitleBar>
      </Frame>
    </Example>
  )
}

function TitleBarWithBackButton() {
  return (
    <Example title="Back Button + Trailing Icon">
      <Frame>
        <TitleBar>
          <TitleBarRow>
            <TitleBarLeading>
              <TitleBarBackButton>Back</TitleBarBackButton>
            </TitleBarLeading>
            <TitleBarTitle>Details</TitleBarTitle>
            <TitleBarTrailing>
              <Button variant="ghost" size="icon-sm" aria-label="Share">
                <Share />
              </Button>
            </TitleBarTrailing>
          </TitleBarRow>
        </TitleBar>
      </Frame>
    </Example>
  )
}

function TitleBarModal() {
  return (
    <Example title="Cancel / Done">
      <Frame>
        <TitleBar>
          <TitleBarRow>
            <TitleBarLeading>
              <Button variant="link">Cancel</Button>
            </TitleBarLeading>
            <TitleBarTitle>New Event</TitleBarTitle>
            <TitleBarTrailing>
              <Button variant="link" className="font-semibold">
                Add
              </Button>
            </TitleBarTrailing>
          </TitleBarRow>
        </TitleBar>
      </Frame>
    </Example>
  )
}

function TitleBarLargeTitleExample() {
  return (
    <Example title="Large Title">
      <Frame>
        <TitleBar>
          <TitleBarRow>
            <TitleBarLeading>
              <Button variant="ghost" size="icon-sm" aria-label="Notifications">
                <Bell />
              </Button>
            </TitleBarLeading>
            <TitleBarTitle />
            <TitleBarTrailing>
              <Button variant="ghost" size="icon-sm" aria-label="Settings">
                <GearSix />
              </Button>
            </TitleBarTrailing>
          </TitleBarRow>
          <TitleBarLargeTitle>Messages</TitleBarLargeTitle>
        </TitleBar>
      </Frame>
    </Example>
  )
}

function TitleBarLargeTitleWithSearch() {
  return (
    <Example title="Large Title + Search">
      <Frame>
        <TitleBar>
          <TitleBarRow>
            <TitleBarLeading />
            <TitleBarTitle />
            <TitleBarTrailing>
              <Button variant="ghost" size="icon-sm" aria-label="Settings">
                <GearSix />
              </Button>
            </TitleBarTrailing>
          </TitleBarRow>
          <TitleBarLargeTitle>Library</TitleBarLargeTitle>
          <div className="px-3 pb-3">
            <TitleBarSearchField />
          </div>
        </TitleBar>
      </Frame>
    </Example>
  )
}

function TitleBarSearchActive() {
  return (
    <Example title="Search (Active, with Cancel)">
      <Frame>
        <TitleBar>
          <TitleBarRow className="px-3">
            <TitleBarSearchField />
            <Button variant="link" className="shrink-0">
              Cancel
            </Button>
          </TitleBarRow>
        </TitleBar>
      </Frame>
    </Example>
  )
}
