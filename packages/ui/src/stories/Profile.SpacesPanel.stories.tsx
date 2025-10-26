// Bounded Context Owner: Identity & Access Management Guild
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileSpacesPanel, type ProfileSpacesPanelProps } from "../organisms/profile/profile-spaces-panel";

const meta: Meta<typeof ProfileSpacesPanel> = {
  title: "Organisms/Profile/SpacesPanel",
  component: ProfileSpacesPanel,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" }
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["default", "compact"]
    }
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-5xl bg-background p-6 sm:p-8 text-foreground">
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof ProfileSpacesPanel>;

const baseSpaces: ProfileSpacesPanelProps = {
  explore: [
    {
      id: "explore-1",
      name: "Systems Thinking Studio",
      description: "Cross-discipline deep dives into campus strategy.",
      badge: "Recommended",
      memberCount: 312,
      joinUrl: "#",
      previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop",
      previewAlt: "Students collaborating with sticky notes"
    },
    {
      id: "explore-2",
      name: "HiveLab Automation Cohort",
      description: "Prototype rituals, share scripts, iterate weekly.",
      badge: "Trending",
      memberCount: 98,
      joinUrl: "#"
    }
  ],
  mine: [
    {
      id: "mine-1",
      name: "Robotics Society",
      description: "Sprint sync Mondays · 7:00 PM",
      badge: "Active",
      memberCount: 96,
      joinUrl: "#"
    },
    {
      id: "mine-2",
      name: "Campus Ops Council",
      description: "Operations leads and launch captains.",
      memberCount: 128,
      badge: "Core team",
      joinUrl: "#"
    }
  ]
};

export const Default: Story = {
  args: {
    explore: baseSpaces.explore,
    mine: baseSpaces.mine,
    size: "default"
  }
};

export const Empty: Story = {
  args: {
    explore: [],
    mine: [],
    size: "default"
  }
};

export const Compact: Story = {
  args: {
    explore: baseSpaces.explore,
    mine: baseSpaces.mine,
    size: "compact"
  }
};
