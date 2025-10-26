import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SpaceDashboard } from "@/organisms/spaces/space-dashboard";
import { spaceRobotics, roboticsUpcomingEvents, roboticsOnlineMembers } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof SpaceDashboard> = {
  title: "Organisms/Spaces/Space Dashboard Basic",
  component: SpaceDashboard,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof SpaceDashboard>;

export const Basic: Story = {
  args: {
    space: { ...spaceRobotics } as any,
    upcomingEvents: roboticsUpcomingEvents,
    onlineMembers: roboticsOnlineMembers,
    resources: [],
    tools: [],
  },
};

