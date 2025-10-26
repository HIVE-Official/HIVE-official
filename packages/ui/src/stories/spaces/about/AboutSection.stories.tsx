import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AboutSection } from "@/organisms/spaces/about-section";
import type { SpaceMember, Space } from "@/organisms/spaces/types";
import { spaceRobotics, roboticsOnlineMembers } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof AboutSection> = {
  title: "Organisms/Spaces/About/Section",
  component: AboutSection,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof AboutSection>;

const leaders: SpaceMember[] = [
  { ...roboticsOnlineMembers[0], role: "leader" },
  { ...roboticsOnlineMembers[1], role: "moderator" },
];

const baseSpace: Space = {
  ...spaceRobotics,
  description:
    "Build autonomous bots, prep for competitions, and share hardware knowledge. We meet Tuesdays and Thursdays; newcomers welcome.",
  tags: ["engineering", "hardware", "ai", "competitions"],
  featuredLinks: [
    { label: "Resources doc", url: "https://ub.edu/robotics/resources" },
    { label: "Parts request form", url: "https://forms.gle/parts-request" },
  ],
};

export const ViewMode: Story = {
  args: {
    space: baseSpace,
    leaders,
    isLeader: false,
  },
};

export const LeaderCanEdit: Story = {
  args: {
    space: baseSpace,
    leaders,
    isLeader: true,
  },
};

export const EmptyState: Story = {
  args: {
    space: {
      ...baseSpace,
      description: "",
      tags: [],
      featuredLinks: [],
    },
    leaders,
    isLeader: false,
  },
};

export const WithSaveHandler: Story = {
  render: (args) => {
    const [space, setSpace] = React.useState(args.space);
    return (
      <AboutSection
        {...args}
        space={space}
        isLeader
        onSave={(updates) => setSpace({ ...space, ...updates })}
      />
    );
  },
  args: {
    space: baseSpace,
    leaders,
  },
};

