import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Foundation/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  argTypes: {
    shape: { control: "select", options: ["rounded", "circle"] },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Rectangular: Story = {
  args: {
    shape: "rounded",
    className: "w-48 h-6",
  },
};

export const Avatar: Story = {
  args: {
    shape: "circle",
    className: "w-16 h-16",
  },
};
