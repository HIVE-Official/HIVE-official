// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../index";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button Status",
  component: Button,
  args: {
    children: "Deploy"
  }
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Idle: Story = {};

export const Loading: Story = {
  args: {
    status: "loading",
    loadingText: "Deploying"
  }
};

export const Success: Story = {
  args: {
    status: "success",
    statusText: "Deployment complete"
  }
};

export const Error: Story = {
  args: {
    status: "error",
    statusText: "Deployment failed"
  }
};
