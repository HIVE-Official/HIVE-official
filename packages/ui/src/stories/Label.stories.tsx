// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Label, Input } from "../index";

const meta: Meta = { title: "Atoms/Label", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="student@buffalo.edu" />
    </div>
  )
};

export const Required: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="handle" requiredMark>
        Handle
      </Label>
      <Input id="handle" placeholder="@yourname" />
    </div>
  )
};
