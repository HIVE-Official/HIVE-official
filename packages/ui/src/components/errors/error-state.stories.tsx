import type { Meta, StoryObj } from "@storybook/react";
import { ErrorState } from "./error-state";

const meta: Meta<typeof ErrorState> = {
  title: "Global/States/ErrorState",
  component: ErrorState,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  args: {
    title: "Something Went Wrong",
    description:
      "We couldn't load this content. Please check your connection and try again.",
    onRetry: () => alert("Retry clicked!"),
  },
};

export const WithoutRetryAction: Story = {
  args: {
    title: "Page Not Found",
    description:
      "The page you are looking for does not exist or has been moved.",
  },
};

export const CustomStyling: Story = {
  args: {
    title: "Critical System Failure",
    description: "This is a custom-styled error message for emphasis.",
    onRetry: () => alert("Retry clicked!"),
    className: "border-destructive/50 bg-destructive/5 shadow-lg",
  },
};
