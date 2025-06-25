import type { Meta, StoryObj } from "@storybook/react";
import { AcademicCardStep } from "./AcademicCardStep";

const meta: Meta<typeof AcademicCardStep> = {
  title: "Onboarding/AcademicCardStep",
  component: AcademicCardStep,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onNext: { action: "onNext" },
    onSubmit: { action: "onSubmit" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onNext: () => console.log("Next step"),
    onSubmit: async (data) => {
      console.log("Submitting academic data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const WithMockSubmit: Story = {
  args: {
    onNext: () => console.log("Next step"),
    onSubmit: async (data) => {
      console.log("Mock submission:", data);
      return new Promise((resolve) => setTimeout(resolve, 2000));
    },
  },
};
