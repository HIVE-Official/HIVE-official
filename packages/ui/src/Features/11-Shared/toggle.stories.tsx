import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "../../atomic/atoms/toggle";

const meta = {
  title: "11-Shared/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Toggle aria-label="Toggle italic"><svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg></Toggle>,
};

export const WithText: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">B</Toggle>
      <Toggle aria-label="Toggle italic">I</Toggle>
      <Toggle aria-label="Toggle underline">U</Toggle>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle variant="default" aria-label="Default">Default</Toggle>
      <Toggle variant="outline" aria-label="Outline">Outline</Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Small">Sm</Toggle>
      <Toggle size="default" aria-label="Default">Default</Toggle>
      <Toggle size="lg" aria-label="Large">Lg</Toggle>
    </div>
  ),
};
