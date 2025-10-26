// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Switch, Label } from "../index";

const meta: Meta = { title: "Atoms/Switch.States" };
export default meta;
type Story = StoryObj;

export const States: Story = {
  render: () => (
    <div className="grid gap-4">
      <label className="flex items-center gap-2">
        <Switch id="sw-1" />
        <Label htmlFor="sw-1">Default</Label>
      </label>
      <label className="flex items-center gap-2">
        <Switch id="sw-2" defaultChecked />
        <Label htmlFor="sw-2">Checked</Label>
      </label>
      <label className="flex items-center gap-2">
        <Switch id="sw-3" disabled />
        <Label htmlFor="sw-3">Disabled</Label>
      </label>
      <label className="flex items-center gap-2">
        <Switch id="sw-4" defaultChecked disabled />
        <Label htmlFor="sw-4">Checked + Disabled</Label>
      </label>
    </div>
  )
};

