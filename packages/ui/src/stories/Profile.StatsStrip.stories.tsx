// Bounded Context Owner: Identity & Access Management Guild
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileStatsStrip, type ProfileStatsStripProps } from "../organisms/profile/profile-stats-strip";

const meta: Meta<typeof ProfileStatsStrip> = {
  title: "Organisms/Profile/StatsStrip",
  component: ProfileStatsStrip,
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

type Story = StoryObj<typeof ProfileStatsStrip>;

const sampleStats: ProfileStatsStripProps["stats"] = [
  { label: "Profile completion", value: "92%", helperText: "Add your leadership blurb to wrap it up." },
  { label: "Spaces joined", value: "14", helperText: "Momentum trending upward this month." },
  { label: "Signals shipped", value: "8", helperText: "Keep publishing rituals for your teams." },
  { label: "HiveLab streak", value: "6 days", accent: "success", helperText: "Campus ops loves your cadence." },
];

export const Default: Story = {
  args: {
    stats: sampleStats,
    size: "default"
  },
};

export const WithAlerts: Story = {
  args: {
    stats: [
      { label: "Profile completion", value: "48%", helperText: "Add campus affiliation to unlock recs.", accent: "warning" },
      { label: "Spaces joined", value: "2", helperText: "Join at least three to complete onboarding.", accent: "danger" },
      { label: "Signals shipped", value: "0", helperText: "Share your first ritual with your cohort." },
      { label: "HiveLab streak", value: "1 day", accent: "default" },
    ],
    size: "compact"
  },
};
