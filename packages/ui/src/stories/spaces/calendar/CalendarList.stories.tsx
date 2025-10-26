import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CalendarList } from "@/organisms/spaces/calendar-list";
import { roboticsUpcomingEvents } from "@/fixtures/spaces/space-robotics";
import { useToast } from "@/hooks/use-toast";

const meta: Meta<typeof CalendarList> = {
  title: "Organisms/Spaces/Calendar/List",
  component: CalendarList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof CalendarList>;

export const Basic: Story = {
  args: {
    events: roboticsUpcomingEvents as any,
    canCreateEvents: true,
  },
};

export const WithRSVP: Story = {
  render: (args) => {
    const { toast } = useToast();
    const [events, setEvents] = React.useState<any[]>(args.events as any);
    return (
      <CalendarList
        {...args}
        events={events}
        onRSVP={(id, status) => {
          setEvents((list) => list.map((e) => (e.id === id ? { ...e, userRsvp: status } : e)));
          toast({ title: "RSVP", description: `Updated to ${status}` });
        }}
      />
    );
  },
  args: {
    events: roboticsUpcomingEvents as any,
    canCreateEvents: true,
  },
};

