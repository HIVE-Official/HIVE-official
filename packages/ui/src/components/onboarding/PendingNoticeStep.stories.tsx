import type { Meta, StoryObj } from "@storybook/react";
import { PendingNoticeStep } from "./PendingNoticeStep";

const meta: Meta<typeof PendingNoticeStep> = {
  title: "Onboarding/PendingNoticeStep",
  component: PendingNoticeStep,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onNext: { action: "onNext" },
  },
};

export default meta;
type Story = StoryObj<typeof PendingNoticeStep>;

export const Default: Story = {
  args: {
    spaceName: "Computer Science Club",
    onNext: (step: number) => console.log("Next step:", step),
  },
};

export const LongSpaceName: Story = {
  args: {
    spaceName: "The Really Long Name Of A Student Organization That Might Wrap",
    onNext: (step: number) => console.log("Next step:", step),
  },
};
