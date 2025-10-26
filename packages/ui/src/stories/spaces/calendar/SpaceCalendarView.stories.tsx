import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SpaceCalendarView } from "@/organisms/spaces/space-calendar-view";
import { roboticsUpcomingEvents } from "@/fixtures/spaces/space-robotics";
import { EventSheet } from "@/organisms/spaces/event-sheet";

const meta: Meta<typeof SpaceCalendarView> = {
  title: "Organisms/Spaces/Calendar/SpaceCalendarView",
  component: SpaceCalendarView,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof SpaceCalendarView>;

export const InSpaceWidget_Leader: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState<any | null>(null);
    return (
      <div className="space-y-3">
        <h3 className="text-body font-semibold">Robotics Guild — Calendar</h3>
        <p className="text-caption text-muted-foreground">Widget embedded in Space (compact split layout). Day/Week/Month/List supported.</p>
        <SpaceCalendarView
          {...args}
          onOpenFullCalendar={() => console.log('open_full_calendar')}
          onEventClick={(evt) => { setActive(evt); setOpen(true); }}
        />
        {active && (
          <EventSheet open={open} onOpenChange={setOpen} event={active} blurExperimental />
        )}
      </div>
    );
  },
  args: {
    events: roboticsUpcomingEvents as any,
    viewerIsLeader: true,
    defaultView: "week" as any,
    defaultScope: "spaces",
    showOpenFullCalendarLink: true,
    showSourcesToggle: true,
    showSubscribe: true,
    icsFeedUrl: "https://calendar.hive.example/feeds/ub-buffalo/space-robotics.ics?token=demo",
    lockScopeToSpace: true,
    compact: true,
    splitLayout: true,
  },
};

export const InSpaceWidget_MemberMySchedule: Story = {
  args: {
    events: (roboticsUpcomingEvents as any).map((e: any, i: number) => ({ ...e, userRsvp: i % 2 ? "going" : undefined })),
    viewerIsLeader: false,
    defaultView: "list",
    defaultScope: "my",
    showOpenFullCalendarLink: true,
    showSourcesToggle: false,
    showSubscribe: true,
    icsFeedUrl: "https://calendar.hive.example/feeds/ub-buffalo/my.ics?token=demo",
  },
};
