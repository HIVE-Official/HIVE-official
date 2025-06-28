/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck

import type { Meta, StoryObj } from "@storybook/react-vite";
import { HiveLogo } from "../components/HiveLogo";
import React from "react";

const meta: Meta<typeof HiveLogo> = {
  title: "Brand/HiveLogo",
  component: HiveLogo,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0A0A0A" },
        { name: "light", value: "#F0F0F0" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["white", "black", "gold"],
      description: "Logo color variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl", "3xl"],
      description: "Logo size",
    },
    animationType: {
      control: { type: "select" },
      options: ["none", "pulse", "spin", "gentle-float"],
      description: "Animation style for the logo",
    },
  },
};

export default meta;

type Story = StoryObj<typeof HiveLogo>;

export const Default: Story = {
  args: {
    variant: "white",
    size: "xl",
    animationType: "none",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const White: Story = {
  args: {
    variant: "white",
    size: "xl",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Black: Story = {
  args: {
    variant: "black",
    size: "xl",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const Gold: Story = {
  args: {
    variant: "gold",
    size: "xl",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="p-8 bg-neutral-800 rounded-lg">
      <div className="grid grid-cols-3 gap-8 items-center p-4 bg-neutral-900 rounded-lg mb-4">
        <div className="text-center space-y-2">
          <HiveLogo {...args} variant="white" size="xl" />
          <p className="text-sm text-white">White</p>
        </div>
        <div className="text-center space-y-2">
          <div className="bg-white p-4 rounded">
            <HiveLogo {...args} variant="black" size="xl" />
          </div>
          <p className="text-sm text-white">Black</p>
        </div>
        <div className="text-center space-y-2">
          <HiveLogo {...args} variant="gold" size="xl" />
          <p className="text-sm text-white">Gold</p>
        </div>
      </div>
    </div>
  ),
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8 p-8 bg-neutral-900 rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="sm" />
        <p className="text-white text-xs">sm</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="md" />
        <p className="text-white text-xs">md</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="lg" />
        <p className="text-white text-xs">lg</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="xl" />
        <p className="text-white text-xs">xl</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="2xl" />
        <p className="text-white text-xs">2xl</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size="3xl" />
        <p className="text-white text-xs">3xl</p>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Animations: Story = {
  render: () => (
    <div className="grid grid-cols-2 grid-rows-2 gap-16 p-8 bg-neutral-900 rounded-lg">
      <div className="flex flex-col items-center justify-center gap-4">
        <HiveLogo variant="white" size="2xl" animationType="pulse" />
        <p className="text-white">Pulse</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <HiveLogo variant="white" size="2xl" animationType="gentle-float" />
        <p className="text-white">Gentle Float</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <HiveLogo variant="gold" size="2xl" animationType="spin" />
        <p className="text-white">Spin</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <HiveLogo variant="gold" size="2xl" animationType="gentle-float" />
        <p className="text-white">Gold Float</p>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};
