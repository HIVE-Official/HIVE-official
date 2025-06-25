import type { Meta, StoryObj } from "@storybook/react";
import { AcademicCardStep } from "./AcademicCardStep";
import { logger } from "@hive/core";

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
    onNext: () => logger.debug("Next step"),
    onSubmit: async (data) => {
      logger.debug("Submitting academic data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const WithMockSubmit: Story = {
  args: {
    onNext: () => logger.debug("Next step"),
    onSubmit: async (data) => {
      logger.debug("Mock submission:", data);
      return new Promise((resolve) => setTimeout(resolve, 2000));
    },
  },
};
