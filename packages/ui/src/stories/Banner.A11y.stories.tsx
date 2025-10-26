// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Banner, Button } from "../index";

const meta: Meta = { title: "Molecules/Banner A11y" };
export default meta;
type Story = StoryObj;

export const StatusAnnouncement: Story = {
  render: () => (
    <div className="space-y-3">
      <Banner role="status" variant="success" title="Saved" description="Your changes are live" />
      <Banner role="alert" variant="error" title="Error" description="Please try again" />
      <Banner variant="neutral" title="Heads up" description="Static information" />
    </div>
  )
};

