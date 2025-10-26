// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../index";
import { ArrowRight, Check } from "lucide-react";

const meta: Meta = { title: "States/Button" };
export default meta;
type Story = StoryObj;

export const Default: Story = { args: { children: "Continue" } };
export const Disabled: Story = { args: { disabled: true, children: "Disabled" } };
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>default</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="outline">outline</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="link">link</Button>
    </div>
  )
};
export const IconOnly: Story = { args: { size: "icon", children: <ArrowRight className="h-4 w-4" />, "aria-label": "Next" } };
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button>
        <Check className="h-4 w-4" /> Saved
      </Button>
      <Button>
        Continue <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
};
