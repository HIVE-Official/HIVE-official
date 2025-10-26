import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SpaceLayout } from "@/organisms/spaces/space-layout";
import { RightRailClear } from "@/organisms/spaces/right-rail-clear";
import { EventSheet } from "@/organisms/spaces/event-sheet";
import {
  spaceRobotics,
  roboticsPosts,
  roboticsUpcomingEvents,
  roboticsOnlineMembers,
} from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof SpaceLayout> = {
  title: "Organisms/Spaces/Layout/Chatboard With Right Dock",
  component: SpaceLayout,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SpaceLayout>;

const demoResources = [
  { id: "r1", type: "link", title: "Parts request", url: "https://forms.gle/parts-request" },
];
const demoTools: any[] = [];

export const ChatboardWithDock: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState<any | null>(null);
    return (
      <>
        <SpaceLayout
          {...args}
          rightRail={
            <RightRailClear
              space={spaceRobotics as any}
              events={roboticsUpcomingEvents as any}
              onlineMembers={roboticsOnlineMembers as any}
              onOpenCalendar={() => console.log("open_calendar")}
              onViewRoster={() => console.log("view_roster")}
              onTopicClick={(t) => console.log("topic", t)}
              onEventClick={(id) => {
                const evt = (roboticsUpcomingEvents as any).find((e: any) => e.id === id) || (roboticsUpcomingEvents as any)[0];
                setActive(evt);
                setOpen(true);
              }}
            />
          }
        />
        {active && <EventSheet open={open} onOpenChange={setOpen} event={active} blurExperimental />}
      </>
    );
  },
  args: {
    space: spaceRobotics as any,
    isMember: true,
    focusMode: false,
    posts: roboticsPosts as any,
    upcomingEvents: roboticsUpcomingEvents as any,
    onlineMembers: roboticsOnlineMembers as any,
    resources: demoResources as any,
    tools: demoTools as any,
    chatMode: true,
    layoutRatio: "65-35",
  },
};
