// Bounded Context Owner: Identity & Access Management Guild
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileRecommendationsPanel, type ProfileRecommendationsPanelProps } from "../organisms/profile/profile-recommendations-panel";

const meta: Meta<typeof ProfileRecommendationsPanel> = {
  title: "Organisms/Profile/RecommendationsPanel",
  component: ProfileRecommendationsPanel,
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

type Story = StoryObj<typeof ProfileRecommendationsPanel>;

const recommendations: ProfileRecommendationsPanelProps["recommendations"] = [
  {
    id: "rec-1",
    name: "Systems Thinking Studio",
    reason: "Your robotics automation ritual pairs well with this space.",
    joinUrl: "#",
    memberCount: 286,
    signal: "interest_match",
    previewImage: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format&fit=crop",
    previewAlt: "Abstract projection mapping on a campus wall"
  },
  {
    id: "rec-2",
    name: "Campus Coordination Council",
    reason: "4 mutual connections guiding planning cycles here.",
    joinUrl: "#",
    memberCount: 142,
    signal: "mutual_connection",
    previewImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop",
    previewAlt: "Students collaborating with notebooks"
  },
  {
    id: "rec-3",
    name: "HiveLab Builders",
    reason: "Trending this week for high-impact experiments.",
    signal: "trending",
    previewImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop",
    previewAlt: "Workshop table with prototypes and tools"
  },
];

export const Default: Story = {
  args: {
    recommendations,
    size: "default"
  },
};

export const Empty: Story = {
  args: {
    recommendations: [],
    size: "default"
  },
};

export const Compact: Story = {
  args: {
    recommendations: recommendations.slice(0, 2),
    size: "compact"
  },
};
