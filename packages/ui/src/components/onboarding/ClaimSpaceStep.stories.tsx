import type { Meta, StoryObj } from "@storybook/react";
import { ClaimSpaceStep } from "./ClaimSpaceStep";
import { logger } from "@hive/core";

const meta: Meta<typeof ClaimSpaceStep> = {
  title: "Onboarding/ClaimSpaceStep",
  component: ClaimSpaceStep,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onNext: { action: "onNext" },
    onClaim: { action: "onClaim" },
  },
};

export default meta;
type Story = StoryObj<typeof ClaimSpaceStep>;

const mockSpaces = [
  { id: "1", name: "Computer Science Club", description: "For CS enthusiasts" },
  { id: "2", name: "Engineering Society", description: "For future engineers" },
  { id: "3", name: "Math Club", description: "For math lovers" },
];

export const Default: Story = {
  args: {
    existingSpaces: mockSpaces,
    onNext: (step: number) => logger.debug("Next step:", step),
    onClaim: (spaceId: string | null, newSpaceName?: string) =>
      logger.debug("Claimed:", { spaceId, newSpaceName }),
  },
};

export const NoExistingSpaces: Story = {
  args: {
    existingSpaces: [],
    onNext: (step: number) => logger.debug("Next step:", step),
    onClaim: (spaceId: string | null, newSpaceName?: string) =>
      logger.debug("Claimed:", { spaceId, newSpaceName }),
  },
};
