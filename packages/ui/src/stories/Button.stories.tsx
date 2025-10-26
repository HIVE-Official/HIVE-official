// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "../index";
import { ArrowRight, Check } from "lucide-react";

const meta: Meta<ButtonProps> = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "gold", "secondary", "destructive", "outline", "ghost", "link"]
    },
    size: {
      control: "inline-radio",
      options: ["sm", "default", "lg", "icon"]
    },
    asChild: { control: "boolean" }
  },
  args: { children: "Sign in", variant: "default", size: "default" }
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {};
export const Gold: Story = { args: { variant: "gold", children: "Get Started" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Delete" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Continue" } };
export const Outline: Story = { args: { variant: "outline", children: "Learn more" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost" } };
export const Link: Story = { args: { variant: "link", children: "Open docs" } };
export const IconOnly: Story = { args: { size: "icon", children: <Check className="h-4 w-4" />, "aria-label": "Confirm" } };
export const WithRightIcon: Story = {
  render: (args) => (
    <Button {...args}>
      Continue <ArrowRight className="h-4 w-4" />
    </Button>
  )
};

export const WithLeftIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Check className="h-4 w-4" /> Saved
    </Button>
  )
};

export const AsChildLink: Story = {
  args: {
    asChild: true,
    children: (
      <a href="#" onClick={(e) => e.preventDefault()}>
        Learn more
      </a>
    )
  }
};
