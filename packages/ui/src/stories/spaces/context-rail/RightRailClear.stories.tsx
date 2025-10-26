import type { Meta, StoryObj } from "@storybook/react";
import { RightRailClear } from "@/organisms/spaces/right-rail-clear";
import { spaceRobotics, roboticsUpcomingEvents, roboticsOnlineMembers } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof RightRailClear> = {
  title: "Organisms/Spaces/Dock/Right Dock (Clear)",
  component: RightRailClear,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    onOpenCalendar: { action: "open-calendar" },
    onEventClick: { action: "event-click" },
    onRsvp: { action: "rsvp" },
    onTopicClick: { action: "topic-click" },
    onViewRoster: { action: "view-roster" },
  },
};
export default meta;

type Story = StoryObj<typeof RightRailClear>;

export const Basic: Story = {
  args: {
    space: spaceRobotics as any,
    events: roboticsUpcomingEvents as any,
    onlineMembers: roboticsOnlineMembers as any,
  },
};
