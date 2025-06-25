import type { Meta, StoryObj } from "@storybook/react";
import { InterestsStep } from "./InterestsStep";

const meta: Meta<typeof InterestsStep> = {
  title: "Onboarding/InterestsStep",
  component: InterestsStep,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onNext: { action: "onNext" },
    onSubmit: { action: "onSubmit" },
    onSkip: { action: "onSkip" },
    maxInterests: {
      control: { type: "number", min: 1, max: 10 },
      description: "Maximum number of interests that can be selected",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxInterests: 6,
    onNext: () => console.log("Next step"),
    onSubmit: async (interests) => {
      console.log("Selected interests:", interests);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
    },
    onSkip: () => console.log("Skipped interests selection"),
  },
};

export const WithLowerLimit: Story = {
  args: {
    maxInterests: 3,
    onNext: () => console.log("Next step"),
    onSubmit: async (interests) => {
      console.log("Selected interests (max 3):", interests);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSkip: () => console.log("Skipped interests selection"),
  },
};

export const WithHigherLimit: Story = {
  args: {
    maxInterests: 10,
    onNext: () => console.log("Next step"),
    onSubmit: async (interests) => {
      console.log("Selected interests (max 10):", interests);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    onSkip: () => console.log("Skipped interests selection"),
  },
};
