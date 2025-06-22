import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "../components/landing/hero";

const meta: Meta<typeof Hero> = {
  title: "Landing/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    onCtaClick: () => console.log("CTA clicked"),
  },
};
