import type { Meta, StoryObj } from "@storybook/react";
import { AvatarUploadStep } from "./AvatarUploadStep";
import { logger } from "@hive/core";

const meta: Meta<typeof AvatarUploadStep> = {
  title: "Onboarding/AvatarUploadStep",
  component: AvatarUploadStep,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onNext: { action: "onNext" },
    onSubmit: { action: "onSubmit" },
    onSkip: { action: "onSkip" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onNext: () => logger.debug("Next step"),
    onSubmit: async (file) => {
      logger.debug("Uploading file:", file);
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    onSkip: () => logger.debug("Skipped avatar upload"),
  },
};

export const WithSlowUpload: Story = {
  args: {
    onNext: () => logger.debug("Next step"),
    onSubmit: async (file) => {
      logger.debug("Slow upload simulation:", file);
      // Simulate slow upload
      await new Promise((resolve) => setTimeout(resolve, 5000));
    },
    onSkip: () => logger.debug("Skipped avatar upload"),
  },
};
