import type { Meta, StoryObj } from "@storybook/react";
import { DisplayNameStep } from "./DisplayNameStep";
import { logger } from "@hive/core";

const meta: Meta<typeof DisplayNameStep> = {
  title: "Onboarding/DisplayNameStep",
  component: DisplayNameStep,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    email: { control: "text" },
    onNext: { action: "onNext" },
    onHandleCheck: { action: "onHandleCheck" },
  },
};

export default meta;
type Story = StoryObj<typeof DisplayNameStep>;

// Mock handle check function that simulates API delay
const mockHandleCheck = async (handle: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return !["admin", "test", "root"].includes(handle);
};

export const Default: Story = {
  args: {
    email: "john.doe@buffalo.edu",
    onNext: (step: number) => logger.debug("Next step:", step),
    onHandleCheck: mockHandleCheck,
  },
};

export const EmptyState: Story = {
  args: {
    onNext: (step: number) => logger.debug("Next step:", step),
    onHandleCheck: mockHandleCheck,
  },
};

export const WithTakenHandle: Story = {
  args: {
    email: "admin@buffalo.edu",
    onNext: (step: number) => logger.debug("Next step:", step),
    onHandleCheck: async () => false,
  },
};
