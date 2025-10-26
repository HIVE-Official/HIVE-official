import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SpaceDashboard } from "@/organisms/spaces/space-dashboard";
import { spaceRobotics, roboticsUpcomingEvents, roboticsOnlineMembers } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof SpaceDashboard> = {
  title: "Organisms/Spaces/Space Dashboard",
  component: SpaceDashboard,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SpaceDashboard>;

// Minimal resource/tool fixtures to render widgets
const demoResources = [
  { id: "r1", type: "file", title: "Competition checklist", url: "https://ub.edu/robotics/resources", description: "What to pack and timing" },
  { id: "r2", type: "link", title: "Parts request form", url: "https://forms.gle/parts-request", description: "Submit by Wed 6pm" },
];

const demoTools: any[] = [];

export const CleanDashboard: Story = {
  args: {
    space: { ...spaceRobotics } as any,
    upcomingEvents: roboticsUpcomingEvents,
    onlineMembers: roboticsOnlineMembers,
    resources: demoResources as any,
    tools: demoTools as any,
  },
};

