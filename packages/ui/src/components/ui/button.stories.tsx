import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Foundation/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["md", "lg", "icon"],
    },
    loading: { control: "boolean" },
    radius: {
      control: "select",
      options: ["default", "pill"],
    },
    width: {
      control: "select",
      options: ["auto", "wide", "full"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Continue",
    variant: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    children: "Continue",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Continue",
    variant: "ghost",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const LinkStyle: Story = {
  args: {
    children: "Learn more",
    variant: "link",
  },
};

export const Loading: Story = {
  args: {
    children: "Processing",
    loading: true,
  },
};

export const IconButton: Story = {
  args: {
    children: "⚡",
    size: "icon",
  },
};
