// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../index";

const meta: Meta = { title: "Atoms/Checkbox.States" };
export default meta;
type Story = StoryObj;

export const States: Story = {
  render: () => (
    <div className="grid gap-4">
      <Checkbox label="Default" />
      <Checkbox defaultChecked label="Checked" />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox disabled label="Disabled" description="Unavailable right now" />
      <Checkbox defaultChecked disabled label="Checked + Disabled" />
    </div>
  )
};
