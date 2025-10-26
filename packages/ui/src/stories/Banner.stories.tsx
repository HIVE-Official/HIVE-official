// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Ban, CheckCircle, Info, ShieldAlert } from "lucide-react";
import { Banner, Button } from "../index";

const meta: Meta = {
  title: "Molecules/Banner",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Notification surface styled with Hive tokens across severity levels."
      }
    }
  }
};
export default meta;
type Story = StoryObj;

export const Variants: Story = {
  render: () => (
    <div className="space-y-3">
      <Banner variant="neutral" title="Heads up" description="Neutral information for the user" />
      <Banner variant="info" title="Connected" description="Integration is active" icon={<Info />} />
      <Banner variant="success" title="Saved" description="Your changes are live" icon={<CheckCircle />} />
      <Banner variant="warning" title="Action needed" description="Double-check configuration" icon={<ShieldAlert />} />
      <Banner variant="error" title="Issue" description="Try again in a moment" icon={<Ban />} action={<Button size="sm">Retry</Button>} />
    </div>
  )
};
