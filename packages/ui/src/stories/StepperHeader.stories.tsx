// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import type { StepperHeaderProps } from "../index";
import { StepperHeader, Button } from "../index";

const steps = [
  { id: "personal", title: "Personal details", description: "Name, pronouns, bio" },
  { id: "academic", title: "Academic info", description: "Majors & grad year" },
  { id: "interests", title: "Interests", description: "Select community signals" },
  { id: "review", title: "Review", description: "Confirm and launch" }
] as const;

const meta: Meta<StepperHeaderProps> = {
  title: "Organisms/StepperHeader",
  component: StepperHeader,
  args: {
    steps,
    activeStepId: "academic",
    completedStepIds: ["personal"],
    accent: "primary"
  }
};

export default meta;
type Story = StoryObj<StepperHeaderProps>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    renderAction: (step) => (
      <Button variant="ghost" size="sm">
        {step.id === "review" ? "Preview" : "Edit"}
      </Button>
    )
  }
};

export const GoldAccent: Story = {
  args: { accent: "gold" }
};
