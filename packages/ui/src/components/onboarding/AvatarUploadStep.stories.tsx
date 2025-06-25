import type { Meta, StoryObj } from "@storybook/react";
import { AvatarUploadStep } from "./AvatarUploadStep";

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
    onNext: () => console.log("Next step"),
    onSubmit: async (file) => {
      console.log("Uploading file:", file);
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    onSkip: () => console.log("Skipped avatar upload"),
  },
};

export const WithSlowUpload: Story = {
  args: {
    onNext: () => console.log("Next step"),
    onSubmit: async (file) => {
      console.log("Slow upload simulation:", file);
      // Simulate slow upload
      await new Promise((resolve) => setTimeout(resolve, 5000));
    },
    onSkip: () => console.log("Skipped avatar upload"),
  },
};
