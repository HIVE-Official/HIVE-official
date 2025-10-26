// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../index";

const meta: Meta = { title: "States/Select", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Pick one" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
        <SelectItem value="c">Option C</SelectItem>
      </SelectContent>
    </Select>
  )
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">A</SelectItem>
      </SelectContent>
    </Select>
  )
};

export const WidthConstrained: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Narrow" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Short</SelectItem>
        <SelectItem value="2">A bit longer option</SelectItem>
      </SelectContent>
    </Select>
  )
};
