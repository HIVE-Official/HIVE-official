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
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["white", "black", "gold", "chrome", "glass", "neumorphic"],
      description: "Logo color and style variant",
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
    animationType: "pulse",
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
};

export const Chrome: Story = {
  name: "Variant: Chrome",
  args: {
    variant: "chrome",
    size: "2xl",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Glass: Story = {
  name: "Variant: Glassmorphism",
  args: {
    variant: "glass",
    size: "2xl",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Neumorphic: Story = {
  name: "Variant: Neumorphic",
  args: {
    variant: "neumorphic",
    size: "2xl",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const AllStyles: Story = {
  render: (args) => (
    <div className="p-8 bg-neutral-800 rounded-lg">
      <div className="grid grid-cols-3 gap-8 items-center p-4 bg-neutral-900 rounded-lg mb-4">
        <div className="text-center space-y-2">
          <HiveLogo {...args} variant="white" size="xl" />
          <p className="text-sm text-white">White</p>
        </div>
        <div className="text-center space-y-2">
          <HiveLogo {...args} variant="black" size="xl" />
          <p className="text-sm text-white">Black</p>
        </div>
        <div className="text-center space-y-2">
          <HiveLogo {...args} variant="gold" size="xl" />
          <p className="text-sm text-white">Gold</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 items-center p-4 bg-neutral-300 rounded-lg">
        <div className="text-center space-y-2">
          <HiveLogo {...args} variant="chrome" size="xl" />
          <p className="text-sm text-black">Chrome</p>
        </div>
        <div className="text-center space-y-2">
          <HiveLogo {...args} variant="glass" size="xl" />
          <p className="text-sm text-black">Glass</p>
        </div>
        <div className="text-center space-y-2">
          <HiveLogo {...args} variant="neumorphic" size="xl" />
          <p className="text-sm text-black">Neumorphic</p>
        </div>
      </div>
    </div>
  ),
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
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
        <HiveLogo variant="chrome" size="2xl" animationType="spin" />
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
