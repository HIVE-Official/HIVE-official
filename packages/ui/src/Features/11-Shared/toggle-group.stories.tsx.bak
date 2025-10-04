import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "../../atomic/atoms/toggle-group";

const meta = {
  title: "11-Shared/ToggleGroup",
  component: ToggleGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">U</ToggleGroupItem>
    </ToggleGroup>
  ),
};
