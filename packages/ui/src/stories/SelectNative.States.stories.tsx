// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { SelectNative } from "../index";

const meta: Meta = { title: "Atoms/SelectNative.States", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4">
      <SelectNative defaultValue="one">
        <option value="one">Framed (default)</option>
        <option value="two">Two</option>
      </SelectNative>
      <SelectNative variant="underline" defaultValue="one">
        <option value="one">Underline</option>
        <option value="two">Two</option>
      </SelectNative>
      <SelectNative variant="compact" defaultValue="one">
        <option value="one">Compact</option>
        <option value="two">Two</option>
      </SelectNative>
    </div>
  )
};

export const SizesDisabled: Story = {
  render: () => (
    <div className="grid gap-4">
      <SelectNative size="sm" defaultValue="one" disabled>
        <option value="one">Small disabled</option>
      </SelectNative>
      <SelectNative size="md" defaultValue="one">
        <option value="one">Medium</option>
      </SelectNative>
      <SelectNative size="lg" defaultValue="one">
        <option value="one">Large</option>
      </SelectNative>
    </div>
  )
};

