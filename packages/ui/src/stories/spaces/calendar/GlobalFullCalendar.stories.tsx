import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SpaceCalendarView } from "@/organisms/spaces/space-calendar-view";
import { roboticsUpcomingEvents } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof SpaceCalendarView> = {
  title: "Organisms/Spaces/Calendar/Full Calendar (Global)",
  component: SpaceCalendarView,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof SpaceCalendarView>;

export const MonthAndAgenda: Story = {
  render: (args) => (
    <div className="p-6">
      <h2 className="mb-2 text-h4 font-h4">Full Calendar</h2>
      <p className="mb-4 text-caption text-muted-foreground">Day/Week coming via engine adapter; Month/Agenda shown now. Use the in‑Space widget "Open full calendar" to land here.</p>
      <SpaceCalendarView {...args} />
    </div>
  ),
  args: {
    events: roboticsUpcomingEvents as any,
    viewerIsLeader: true,
    defaultScope: "my",
    defaultView: "month",
    showOpenFullCalendarLink: false,
    showSourcesToggle: true,
  },
};

