// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { ShieldCheck, Zap } from "lucide-react";
import { Badge } from "../index";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Hive-styled labels for status, roles, and proof markers."
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="gold" icon={<ShieldCheck />}>verified</Badge>
      <Badge variant="neutral">member</Badge>
      <Badge variant="outline">pending</Badge>
      <Badge variant="success">live now</Badge>
      <Badge variant="warning">limited</Badge>
      <Badge variant="destructive">flagged</Badge>
    </div>
  )
};

export const Muted: Story = { args: { children: "Muted", variant: "muted" } };
export const WithIcon: Story = { args: { children: "Momentum", variant: "gold", icon: <Zap /> } };
