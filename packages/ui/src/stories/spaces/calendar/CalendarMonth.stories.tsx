import type { Meta, StoryObj } from "@storybook/react";
import { CalendarMonth } from "@/organisms/spaces/calendar-month";
import { roboticsUpcomingEvents } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof CalendarMonth> = {
  title: "Organisms/Spaces/Calendar/Month",
  component: CalendarMonth,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof CalendarMonth>;

export const Basic: Story = {
  args: {
    events: roboticsUpcomingEvents as any,
    canCreateEvents: true,
  },
};

