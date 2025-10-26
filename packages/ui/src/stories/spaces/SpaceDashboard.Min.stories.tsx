import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SpaceDashboard } from "@/organisms/spaces/space-dashboard";
import { spaceRobotics, roboticsUpcomingEvents, roboticsOnlineMembers } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof SpaceDashboard> = {
  title: "Organisms/Spaces/Space Dashboard/Minimal",
  component: SpaceDashboard,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof SpaceDashboard>;

export const Minimal: Story = {
  args: {
    space: { ...spaceRobotics, isMember: true } as any,
    upcomingEvents: roboticsUpcomingEvents,
    onlineMembers: roboticsOnlineMembers,
    resources: [],
    tools: [],
  },
};

