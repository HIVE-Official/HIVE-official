// Bounded Context Owner: Identity & Access Management Guild
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileOverview, type ProfileOverviewProps } from "../organisms/profile/profile-overview";

const meta: Meta<typeof ProfileOverview> = {
  title: "Organisms/Profile/Overview",
  component: ProfileOverview,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "dark" }
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-6xl bg-background p-6 sm:p-8 text-foreground">
        <Story />
      </div>
    )
  ],
};

export default meta;

type Story = StoryObj<typeof ProfileOverview>;

const baseProps: ProfileOverviewProps = {
  identity: {
    fullName: "Ada Lovelace",
    handle: "ada",
    pronouns: "she/her",
    bio: "Builder of HiveLab automations and campus-wide coordination rituals.",
    campus: "State University",
    userType: "Faculty Advisor",
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=500&auto=format&fit=crop",
  },
  interests: ["Coordination", "Design Systems", "Community Ops", "Robotics"],
  stats: [
    { label: "Profile completion", value: "82%", helperText: "Add your program details to reach 100%." },
    { label: "Spaces joined", value: "12", helperText: "Explore 3 new campus spaces recommended below." },
    { label: "Projects active", value: "4", helperText: "Two wrap this sprint – share the outcomes." },
  ],
  connections: [
    {
      name: "Miles Carter",
      handle: "@miles",
      mutualSpaces: 6,
      mutualConnections: 12,
      lastActive: "2h ago",
    },
    {
      name: "Priya Desai",
      handle: "@priya",
      mutualSpaces: 3,
      mutualConnections: 7,
      lastActive: "1d ago",
    },
  ],
  activity: [
    {
      id: "a-1",
      occurredAt: "Today · 10:12 AM",
      description: "Published the HiveLab onboarding ritual",
      metadata: "Now visible to Robotics Society and Campus Coordinators.",
    },
    {
      id: "a-2",
      occurredAt: "Yesterday · 5:02 PM",
      description: "Joined the Sustainability Coalition space",
    },
  ],
  recommendedSpaces: [
    {
      name: "Systems Thinking Studio",
      reason: "Matches your coordination track and robotics interest.",
      joinUrl: "#",
      previewImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop",
      previewAlt: "Warm collaborative studio with sticky notes"
    },
    {
      name: "Campus Community Ops",
      reason: "4 mutual connections already collaborating here.",
      previewImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop",
      previewAlt: "Team syncing around laptops with campus skyline"
    },
  ],
};

export const Default: Story = {
  args: baseProps,
};

export const MinimalSignals: Story = {
  args: {
    ...baseProps,
    activity: [],
    connections: [],
    interests: ["Coordination"],
    recommendedSpaces: [],
    stats: [
      { label: "Profile completion", value: "56%", helperText: "Add a bio and campus interests next." },
    ],
  },
};
