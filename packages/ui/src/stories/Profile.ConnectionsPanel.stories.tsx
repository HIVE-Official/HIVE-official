// Bounded Context Owner: Identity & Access Management Guild
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileConnectionsPanel, type ProfileConnectionsPanelProps } from "../organisms/profile/profile-connections-panel";

const meta: Meta<typeof ProfileConnectionsPanel> = {
  title: "Organisms/Profile/ConnectionsPanel",
  component: ProfileConnectionsPanel,
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
  ],
};

export default meta;

type Story = StoryObj<typeof ProfileConnectionsPanel>;

const connections: ProfileConnectionsPanelProps["connections"] = [
  {
    id: "conn-1",
    name: "Miles Carter",
    handle: "@miles",
    mutualSpaces: 6,
    mutualConnections: 12,
    lastActive: "2h ago",
    avatarUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&auto=format&fit=crop"
  },
  {
    id: "conn-2",
    name: "Priya Desai",
    handle: "@priya",
    mutualSpaces: 3,
    mutualConnections: 7,
    lastActive: "1d ago",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop"
  },
  {
    id: "conn-3",
    name: "Jonah Park",
    handle: "@jonah",
    mutualSpaces: 4,
    mutualConnections: 5,
    lastActive: "4d ago",
    avatarUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&auto=format&fit=crop"
  },
];

export const Default: Story = {
  args: {
    connections,
    size: "default"
  },
};

export const Empty: Story = {
  args: {
    connections: [],
    size: "default"
  },
};

export const CompactCarousel: Story = {
  args: {
    connections,
    size: "compact"
  },
};
