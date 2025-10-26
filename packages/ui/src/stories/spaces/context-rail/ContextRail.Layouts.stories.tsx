import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Dialog, DialogContent, DialogOverlay, DialogTrigger, Separator } from "@/index";
import { ContextRail } from "@/organisms/spaces/context-rail";
import { spaceRobotics, roboticsUpcomingEvents, roboticsOnlineMembers } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof ContextRail> = {
  title: "Organisms/Spaces/Dock/Layouts",
  component: ContextRail,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ContextRail>;

const baseProps = {
  calendar: {
    events: roboticsUpcomingEvents,
    canCreateEvents: true,
  },
  members: {
    members: [
      ...roboticsOnlineMembers,
      { userId: "p3", spaceId: "space-robotics", role: "member", joinedAt: new Date(), lastActiveAt: new Date(), fullName: "Nia Brooks", handle: "nia", avatarUrl: "https://i.pravatar.cc/80?img=32" },
      { userId: "p4", spaceId: "space-robotics", role: "member", joinedAt: new Date(), lastActiveAt: new Date(), fullName: "Omar Khan", handle: "omar", avatarUrl: "https://i.pravatar.cc/80?img=13" },
      { userId: "p5", spaceId: "space-robotics", role: "member", joinedAt: new Date(), lastActiveAt: new Date(), fullName: "Maya Chen", handle: "maya", avatarUrl: "https://i.pravatar.cc/80?img=5" },
      { userId: "p6", spaceId: "space-robotics", role: "member", joinedAt: new Date(), lastActiveAt: new Date(), fullName: "Leo Park", handle: "leo", avatarUrl: "https://i.pravatar.cc/80?img=56" },
    ],
    totalCount: 24,
  },
  about: {
    description: spaceRobotics.description,
    tags: spaceRobotics.tags,
    featuredLinks: spaceRobotics.featuredLinks,
    isVerified: spaceRobotics.isVerified,
    spaceType: "Student Organization",
  },
};

// Simple two-column scaffold to demonstrate sticky vs scroll behaviour
const TwoCol: React.FC<{ children: React.ReactNode; right: React.ReactNode }>
  = ({ children, right }) => (
  <div className="min-h-screen bg-background">
    <div className="mx-auto w-full max-w-6xl px-6 py-6 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_320px] gap-6">
      <div className="min-w-0">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2>Feed placeholder</h2>
          <p>
            This left column stands in for the main feed. Scroll to see how the Dock (right-side)
            behaves when sticky and when content exceeds the viewport.
          </p>
          {[...Array(12)].map((_, i) => (
            <p key={i} className="text-sm text-muted-foreground">
              Filler content line {i + 1}. Keep scrolling to test stickiness.
            </p>
          ))}
        </div>
      </div>
      <div className="min-w-0">{right}</div>
    </div>
  </div>
);

export const StandardSticky: Story = {
  render: () => (
    <TwoCol
      right={
        <div className="sticky" style={{ top: 16 }}>
          <ContextRail {...baseProps} />
        </div>
      }
    >
      <></>
    </TwoCol>
  ),
};

export const CompactNoScroll: Story = {
  name: "Compact (non-scrollable)",
  render: () => (
    <TwoCol
      right={
        <div className="space-y-3">
          <ContextRail
            calendar={{ events: baseProps.calendar.events.slice(0, 2), canCreateEvents: false }}
            members={{ members: baseProps.members.members.slice(0, 4), totalCount: baseProps.members.totalCount }}
            about={{ ...baseProps.about, tags: baseProps.about.tags.slice(0, 3) }}
          />
        </div>
      }
    >
      <></>
    </TwoCol>
  ),
};

export const MobileDrawer: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Mobile Drawer demo</h2>
        <p className="text-sm text-muted-foreground mb-4">
          On mobile we expose the rail from a drawer/sheet instead of stacking below the feed.
        </p>
        <Separator className="my-4" />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Context Drawer</Button>
          </DialogTrigger>
          <DialogOverlay className="bg-black/40" />
          <DialogContent className="p-0 w-[min(96vw,420px)]">
            <div className="p-3">
              <ContextRail {...baseProps} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ),
};
