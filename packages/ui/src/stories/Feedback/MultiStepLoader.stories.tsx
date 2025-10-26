import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const meta: Meta<typeof MultiStepLoader> = {
  title: "Feedback/MultiStepLoader",
  component: MultiStepLoader,
  parameters: {
    layout: "centered"
  }
};

export default meta;
type Story = StoryObj<typeof MultiStepLoader>;

export const Default: Story = {
  args: {
    steps: ["Preparing", "Syncing", "Finishing"],
    size: "md",
    current: 1
  }
};

export const ManySteps: Story = {
  args: {
    steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
    size: "lg",
    current: 2
  }
};

