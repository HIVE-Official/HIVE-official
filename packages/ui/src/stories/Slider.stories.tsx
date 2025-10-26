// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../index";

const meta: Meta = { title: "Atoms/Slider", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  )
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <Slider defaultValue={[30]} max={100} step={1} disabled />
    </div>
  )
};

