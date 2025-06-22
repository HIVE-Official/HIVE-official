import type { Meta, StoryObj } from "@storybook/react";
import { HiveLogo } from "../components/brand/hive-logo";

const meta: Meta<typeof HiveLogo> = {
  title: "Brand/HIVE Logo",
  component: HiveLogo,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0A0A0A" },
        { name: "light", value: "#FFFFFF" },
        { name: "gray", value: "#6B7280" },
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["black", "white", "gold"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HiveLogo>;

export const WhiteDefault: Story = {
  args: {
    variant: "white",
    size: "xl",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const BlackVariant: Story = {
  args: {
    variant: "black",
    size: "xl",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const GoldVariant: Story = {
  args: {
    variant: "gold",
    size: "xl",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const ExtraLarge2xl: Story = {
  args: {
    variant: "white",
    size: "2xl",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const SmallSize: Story = {
  args: {
    variant: "white",
    size: "sm",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// Showcase all variants side by side
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="xl" />
        <span className="text-white text-sm">White</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="black" size="xl" />
        <span className="text-white text-sm">Black</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="gold" size="xl" />
        <span className="text-white text-sm">Gold</span>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// Test transparency on different backgrounds
export const TransparencyTest: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-8">
      <div className="bg-[#0A0A0A] p-4 rounded flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="xl" />
        <span className="text-white text-xs">Dark Background</span>
      </div>
      <div className="bg-white p-4 rounded flex flex-col items-center gap-2">
        <HiveLogo variant="black" size="xl" />
        <span className="text-black text-xs">Light Background</span>
      </div>
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-4 rounded flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="xl" />
        <span className="text-white text-xs">Gradient Background</span>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "gray" },
  },
};
