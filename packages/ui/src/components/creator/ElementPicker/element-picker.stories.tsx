import type { Meta, StoryObj } from "@storybook/react";
import { ElementPicker } from "./element-picker";
import { logger } from "@hive/core";

const meta = {
  title: "Creator/ElementPicker",
  component: ElementPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ElementPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    elements: defaultElements,
    onElementSelect: (elementId: string) =>
      logger.debug("Selected element:", elementId),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onElementSelect: (elementId: string) =>
      logger.debug("Selected element:", elementId),
  },
};

export const WithCustomClass: Story = {
  args: {
    className: "border-2 border-yellow-400",
    onElementSelect: (elementId: string) =>
      logger.debug("Selected element:", elementId),
  },
};

export const Interactive: Story = {
  args: {
    onElementSelect: (elementId: string) => {
      alert(`You selected: ${elementId}`);
    },
  },
};

export const WithCategories: Story = {
  args: {
    elements: categorizedElements,
    onElementSelect: (elementId: string) =>
      logger.debug("Selected element:", elementId),
  },
};

export const WithSearch: Story = {
  args: {
    elements: searchableElements,
    onElementSelect: (elementId: string) =>
      logger.debug("Selected element:", elementId),
  },
};
