import type { Meta, StoryObj } from "@storybook/react";
import { WaitlistForm } from "./waitlist-form";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof WaitlistForm> = {
  title: "Features/Waitlist/WaitlistForm",
  component: WaitlistForm,
  tags: ["autodocs"],
  argTypes: {
    onSubmit: { action: "submitted" },
  },
};

export default meta;
type Story = StoryObj<typeof WaitlistForm>;

export const Default: Story = {
  args: {
    onSubmit: async (email) => {
      action("submitted")(email);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
    },
  },
};

export const ErrorState: Story = {
  args: {
    onSubmit: async (email) => {
      action("submitted")(email);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      throw new Error("Failed to submit");
    },
  },
};
