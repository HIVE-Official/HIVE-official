// Bounded Context Owner: Identity & Access Management Guild
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileActivityTimeline, type ProfileActivityTimelineProps } from "../organisms/profile/profile-activity-timeline";

const meta: Meta<typeof ProfileActivityTimeline> = {
  title: "Organisms/Profile/ActivityTimeline",
  component: ProfileActivityTimeline,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" }
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-4xl bg-background p-6 sm:p-8 text-foreground">
        <Story />
      </div>
    )
  ],
};

export default meta;

type Story = StoryObj<typeof ProfileActivityTimeline>;

const sampleItems: ProfileActivityTimelineProps["items"] = [
  {
    id: "timeline-1",
    type: "tool_published",
    occurredAt: "Today · 08:40 AM",
    description: "Launched the Robotics Lab onboarding ritual",
    metadata: "Automatically notified Robotics Lab and Campus Ops.",
  },
  {
    id: "timeline-2",
    type: "space_joined",
    occurredAt: "Yesterday · 09:15 PM",
    description: "Joined the HiveLab Research Fellows space",
  },
  {
    id: "timeline-3",
    type: "connection_made",
    occurredAt: "Mon · 03:20 PM",
    description: "Connected with @priya via Sustainability Coalition",
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
  },
};
