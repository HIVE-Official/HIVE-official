// Bounded Context Owner: Identity & Access Management Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/atoms/button";
import { ProfilePrivacyBanner } from "../organisms/profile/profile-privacy-banner";

const meta: Meta<typeof ProfilePrivacyBanner> = {
  title: "Organisms/Profile/PrivacyBanner",
  component: ProfilePrivacyBanner,
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

type Story = StoryObj<typeof ProfilePrivacyBanner>;

export const CampusVisibility: Story = {
  args: {
    visibility: "campus",
    children: <Button size="sm" variant="outline">Adjust visibility</Button>,
  },
};

export const GhostMode: Story = {
  args: {
    visibility: "public",
    ghostMode: true,
  },
};

export const ConnectionsOnly: Story = {
  args: {
    visibility: "connections",
  },
};
