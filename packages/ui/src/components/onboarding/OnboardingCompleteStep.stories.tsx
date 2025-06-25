import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingCompleteStep } from "./OnboardingCompleteStep";

const meta: Meta<typeof OnboardingCompleteStep> = {
  title: "Onboarding/OnboardingCompleteStep",
  component: OnboardingCompleteStep,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onNext: { action: "onNext" },
    autoRedirectDelay: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
      description: "Delay in milliseconds before auto-redirect",
    },
    showRedirectButton: {
      control: "boolean",
      description: "Show manual redirect button instead of auto-redirect",
    },
    userDisplayName: {
      control: "text",
      description: "User's display name for personalization",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AutoRedirect: Story = {
  args: {
    autoRedirectDelay: 3000,
    showRedirectButton: false,
    userDisplayName: "Alex",
    onNext: () => console.log("Redirecting to feed..."),
  },
};

export const ManualRedirect: Story = {
  args: {
    autoRedirectDelay: 3000,
    showRedirectButton: true,
    userDisplayName: "Jordan",
    onNext: () => console.log("Manual redirect to feed..."),
  },
};

export const FastAutoRedirect: Story = {
  args: {
    autoRedirectDelay: 1500,
    showRedirectButton: false,
    userDisplayName: "Sam",
    onNext: () => console.log("Fast redirect to feed..."),
  },
};

export const SlowAutoRedirect: Story = {
  args: {
    autoRedirectDelay: 5000,
    showRedirectButton: false,
    userDisplayName: "Taylor",
    onNext: () => console.log("Slow redirect to feed..."),
  },
};

export const LongUserName: Story = {
  args: {
    autoRedirectDelay: 3000,
    showRedirectButton: false,
    userDisplayName: "Alexandria",
    onNext: () => console.log("Redirecting user with long name..."),
  },
};
