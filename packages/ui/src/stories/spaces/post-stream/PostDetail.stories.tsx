import type { Meta, StoryObj } from "@storybook/react";
import { PostDetail } from "@/organisms/spaces/post-detail";
import { roboticsPosts } from "@/fixtures/spaces/space-robotics";
import * as React from "react";

const meta: Meta<typeof PostDetail> = {
  title: "Organisms/Spaces/PostDetail",
  component: PostDetail,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    mode: { control: { type: "inline-radio" }, options: ["sheet", "route"] },
  },
};
export default meta;

type Story = StoryObj<typeof PostDetail>;

const sample = roboticsPosts[0] as any;

export const Sheet: Story = {
  args: {
    post: sample,
    open: true,
    mode: "sheet",
  },
};

export const Route: Story = {
  args: {
    post: sample,
    open: true,
    mode: "route",
  },
};

