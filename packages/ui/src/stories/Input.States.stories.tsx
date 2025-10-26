// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../index";

const meta: Meta = { title: "States/Input" };
export default meta;
type Story = StoryObj;

export const Default: Story = { args: { placeholder: "Type here" } };
export const Focus: Story = { render: (args) => <Input {...args} autoFocus placeholder="Focus here" /> };
export const Disabled: Story = { args: { disabled: true, placeholder: "Disabled" } };
export const WithValue: Story = { args: { defaultValue: "Hello" } };
