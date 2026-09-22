import { Example, ExampleWrapper } from "@/components/catalog/example"
import {
  TitleBar,
  TitleBarBackButton,
  TitleBarButton,
  TitleBarLargeTitle,
  TitleBarLeading,
  TitleBarRow,
  TitleBarSearchField,
  TitleBarTitle,
  TitleBarTrailing,
} from "@/components/ui/title-bar"
import { Bell, GearSix, Share } from "@phosphor-icons/react"

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
              <TitleBarButton variant="icon" aria-label="Share">
                <Share />
              </TitleBarButton>
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
              <TitleBarButton>Cancel</TitleBarButton>
            </TitleBarLeading>
            <TitleBarTitle>New Event</TitleBarTitle>
            <TitleBarTrailing>
              <TitleBarButton className="font-semibold">Add</TitleBarButton>
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
              <TitleBarButton variant="icon" aria-label="Notifications">
                <Bell />
              </TitleBarButton>
            </TitleBarLeading>
            <TitleBarTitle />
            <TitleBarTrailing>
              <TitleBarButton variant="icon" aria-label="Settings">
                <GearSix />
              </TitleBarButton>
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
              <TitleBarButton variant="icon" aria-label="Settings">
                <GearSix />
              </TitleBarButton>
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
          <TitleBarRow className="gap-2 px-3">
            <TitleBarSearchField />
            <TitleBarButton className="shrink-0">Cancel</TitleBarButton>
          </TitleBarRow>
        </TitleBar>
      </Frame>
    </Example>
  )
}
