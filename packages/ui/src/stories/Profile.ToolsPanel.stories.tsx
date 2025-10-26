// Bounded Context Owner: Identity & Access Management Guild
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileToolsPanel } from "../organisms/profile/profile-tools-panel";

const meta: Meta<typeof ProfileToolsPanel> = {
  title: "Organisms/Profile/ToolsPanel",
  component: ProfileToolsPanel,
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
  ]
};

export default meta;

type Story = StoryObj<typeof ProfileToolsPanel>;

export const Default: Story = {};

export const SlowCycle: Story = {
  args: {
    cycleIntervalMs: 8000
  }
};
