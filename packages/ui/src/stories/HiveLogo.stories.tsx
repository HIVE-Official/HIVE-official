/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck

import type { Meta, StoryObj } from "@storybook/react-vite";
import { HiveLogo } from "../components/HiveLogo";

const meta: Meta<typeof HiveLogo> = {
  title: "Brand/HiveLogo",
  component: HiveLogo,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0A0A0A" },
        { name: "light", value: "#FFFFFF" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["white", "black"],
      description: "Logo color variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Logo size",
    },
  },
};

export default meta;

type Story = StoryObj<typeof HiveLogo>;

export const Default: Story = {
  args: {
    variant: "white",
    size: "md",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const BlackOnLight: Story = {
  args: {
    variant: "black",
    size: "md",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <HiveLogo variant="white" size="sm" />
        <p className="mt-2 text-xs text-muted-foreground">Small</p>
      </div>
      <div className="text-center">
        <HiveLogo variant="white" size="md" />
        <p className="mt-2 text-xs text-muted-foreground">Medium</p>
      </div>
      <div className="text-center">
        <HiveLogo variant="white" size="lg" />
        <p className="mt-2 text-xs text-muted-foreground">Large</p>
      </div>
      <div className="text-center">
        <HiveLogo variant="white" size="xl" />
        <p className="mt-2 text-xs text-muted-foreground">Extra Large</p>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const BrandShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Dark Background */}
      <div className="bg-[#0A0A0A] p-8 rounded-lg">
        <div className="flex items-center gap-4">
          <HiveLogo variant="white" size="lg" />
          <div>
            <h2 className="text-2xl font-bold text-white font-display">HIVE</h2>
            <p className="text-[#FFD700] font-medium">Your Campus OS</p>
          </div>
        </div>
      </div>

      {/* Light Background */}
      <div className="bg-white p-8 rounded-lg border">
        <div className="flex items-center gap-4">
          <HiveLogo variant="black" size="lg" />
          <div>
            <h2 className="text-2xl font-bold text-black font-display">HIVE</h2>
            <p className="text-[#C4A500] font-medium">Your Campus OS</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "light" },
  },
};
