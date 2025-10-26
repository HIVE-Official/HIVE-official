// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../index";

const meta: Meta = { title: "States/Textarea" };
export default meta;
type Story = StoryObj;

export const Default: Story = { args: { placeholder: "Share more details..." } };
export const Disabled: Story = { args: { disabled: true, placeholder: "Disabled" } };
