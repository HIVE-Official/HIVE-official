import type { Meta, StoryObj } from "@storybook/react";
import { NotFound } from "./not-found";

const meta: Meta<typeof NotFound> = {
  title: "Errors/NotFound404",
  component: NotFound,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ctaHref: "/",
  },
};
