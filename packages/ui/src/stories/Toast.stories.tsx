// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback } from "react";
import { Button, Toaster, toast } from "../index";

const meta: Meta = {
  title: "Feedback/Toast",
  parameters: {
    layout: "centered"
  }
};

export default meta;

type Story = StoryObj;

const trigger = (config: Parameters<typeof toast>[0]) => () => toast(config);

export const Success: Story = {
  render: () => (
    <>
      <Button onClick={trigger({
        variant: "success",
        title: "Mission launched",
        description: "The spotlight campaign is live for the Class of 2028.",
        duration: 5000
      })}
      >
        Trigger success toast
      </Button>
      <Toaster />
    </>
  )
};

export const Info: Story = {
  render: () => (
    <>
      <Button variant="outline" onClick={trigger({
        variant: "info",
        title: "Insight ready",
        description: "Engagement is up 12% week over week.",
        duration: 4000
      })}
      >
        Trigger info toast
      </Button>
      <Toaster />
    </>
  )
};

export const Warning: Story = {
  render: () => (
    <>
      <Button variant="secondary" onClick={trigger({
        variant: "warning",
        title: "Limited seats",
        description: "Only 4 invites remain for this cohort.",
        duration: 6000
      })}
      >
        Trigger warning toast
      </Button>
      <Toaster />
    </>
  )
};

export const Destructive: Story = {
  render: () => (
    <>
      <Button variant="destructive" onClick={trigger({
        variant: "destructive",
        title: "Upload failed",
        description: "We couldn’t publish your announcement. Try again in a moment.",
        duration: 5000
      })}
      >
        Trigger error toast
      </Button>
      <Toaster />
    </>
  )
};
