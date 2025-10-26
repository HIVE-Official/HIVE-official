import type { Meta, StoryObj } from "@storybook/react";
import { CalendarPreview } from "@/organisms/spaces/context-rail";
import { roboticsUpcomingEvents } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof CalendarPreview> = {
  title: "Organisms/Spaces/Context Rail/Calendar Preview",
  component: CalendarPreview,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    onCreateEvent: { action: "create-event" },
    onViewAll: { action: "view-all-events" },
  },
};
export default meta;

type Story = StoryObj<typeof CalendarPreview>;

export const Basic: Story = {
  args: {
    events: roboticsUpcomingEvents,
    canCreateEvents: true,
  },
};

export const EmptyState: Story = {
  args: {
    events: [],
    canCreateEvents: false,
  },
};

