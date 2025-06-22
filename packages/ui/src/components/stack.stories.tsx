import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./stack";
import { Box } from "./box";

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "col"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around"],
    },
    gap: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const content = (
  <>
    <Box className="p-4 bg-muted text-muted-foreground rounded-lg">Item 1</Box>
    <Box className="p-4 bg-muted text-muted-foreground rounded-lg">Item 2</Box>
    <Box className="p-4 bg-muted text-muted-foreground rounded-lg">Item 3</Box>
  </>
);

export const Default: Story = {
  name: "Interactive Demo",
  args: {
    direction: "row",
    gap: 4,
    align: "center",
    justify: "start",
    children: content,
    className:
      "w-[400px] h-[200px] bg-background p-4 rounded-lg border-2 border-dashed",
  },
};

export const Vertical: Story = {
  args: {
    direction: "col",
    gap: 2,
    children: content,
  },
};

export const Horizontal: Story = {
  args: {
    direction: "row",
    gap: 2,
    children: content,
  },
};

export const JustifyBetween: Story = {
  args: {
    direction: "row",
    gap: 2,
    justify: "between",
    children: content,
    className: "w-[400px]",
  },
};
