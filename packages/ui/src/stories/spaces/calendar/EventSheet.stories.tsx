import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { EventSheet } from "@/organisms/spaces/event-sheet";
import { roboticsUpcomingEvents } from "@/fixtures/spaces/space-robotics";
import { useToast } from "@/hooks/use-toast";

const meta: Meta<typeof EventSheet> = {
  title: "Organisms/Spaces/Calendar/EventSheet",
  component: EventSheet,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    blurExperimental: { control: { type: "boolean" } },
  }
};
export default meta;

type Story = StoryObj<typeof EventSheet>;

const sample = (roboticsUpcomingEvents as any)[0];

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(true);
    const { toast } = useToast();
    return (
      <EventSheet
        {...args}
        open={open}
        onOpenChange={setOpen}
        onRSVP={(status) => toast({ title: "RSVP", description: `Updated to ${status}` })}
        onAddToCalendar={() => toast({ title: "Calendar", description: "Added to calendar" })}
        onShare={() => toast({ title: "Shared", description: "Link copied to clipboard" })}
        onCopyLink={() => toast({ title: "Copied", description: "Event link copied" })}
        onCreateSpace={() => toast({ title: "Space created", description: "Draft space created for leaders" })}
      />
    );
  },
  args: {
    event: sample,
    blurExperimental: true,
  },
};
