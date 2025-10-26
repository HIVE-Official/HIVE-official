// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, Progress } from "../index";

const meta: Meta = { title: "Atoms/Spinner/Progress" };
export default meta;
type Story = StoryObj;

export const SpinnerInline: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-body-sm font-body-sm text-muted-foreground">
      <Spinner variant="muted" /> Loading…
    </div>
  )
};

export const ProgressDeterminate: Story = {
  render: () => <Progress value={42} className="w-64" />
};

export const SpinnerSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size={14} variant="muted" />
      <Spinner size={16} variant="default" />
      <Spinner size={20} variant="brand" />
    </div>
  )
};

export const ProgressThickness: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3 w-64">
      <Progress value={25} thickness="sm" />
      <Progress value={50} thickness="md" />
      <Progress value={75} thickness="lg" />
    </div>
  )
};
