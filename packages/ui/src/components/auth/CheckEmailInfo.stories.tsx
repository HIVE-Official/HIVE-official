import type { Meta, StoryObj } from "@storybook/react";
import { CheckEmailInfo } from "./CheckEmailInfo";

const meta: Meta<typeof CheckEmailInfo> = {
  title: "Auth/CheckEmailInfo",
  component: CheckEmailInfo,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    email: { control: "text" },
    backLinkHref: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CheckEmailInfo>;

export const Default: Story = {
  args: {
    email: "rhine.labs@buffalo.edu",
    backLinkHref: "/auth",
  },
};

export const NoEmail: Story = {
  args: {
    email: null,
    backLinkHref: "/auth",
  },
};
