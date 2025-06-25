import type { Meta, StoryObj } from "@storybook/react";
import { LeaderQuestionStep } from "./LeaderQuestionStep";
import { logger } from "@hive/core/utils/logger";

const meta: Meta<typeof LeaderQuestionStep> = {
  title: "Onboarding/LeaderQuestionStep",
  component: LeaderQuestionStep,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onNext: { action: "onNext" },
    onAnswer: { action: "onAnswer" },
  },
};

export default meta;
type Story = StoryObj<typeof LeaderQuestionStep>;

export const Default: Story = {
  args: {
    onNext: (step: number) => logger.debug("Next step:", step),
    onAnswer: (isLeader: boolean) => logger.debug("Is leader:", isLeader),
  },
};

// The component is stateful, so we don't need additional stories for selected states
// as they are handled internally through user interaction
