// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { HiveLogo } from "../index";

const meta: Meta<typeof HiveLogo> = {
  title: "Brand/HiveLogo",
  component: HiveLogo,
  args: { variant: "gold", size: 32 }
};

export default meta;

type Story = StoryObj<typeof HiveLogo>;

export const Gold: Story = {};
export const White: Story = { args: { variant: "white" } };
export const Black: Story = { args: { variant: "black" } };
export const Gradient: Story = { args: { variant: "gradient" } };
export const WithWordmark: Story = { args: { showText: true } };
