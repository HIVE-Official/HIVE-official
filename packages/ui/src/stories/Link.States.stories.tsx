// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "../index";

const meta: Meta = { title: "Atoms/Link.States", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const Variants: Story = {
  render: () => (
    <div className="grid gap-2 text-body font-body">
      <Link href="#">Inline default</Link>
      <Link variant="subtle" href="#">Subtle</Link>
      <Link variant="muted" href="#">Muted</Link>
      <Link variant="action" href="#">Action</Link>
      <Link variant="docs" href="#">Docs</Link>
      <Link href="https://example.com" newTabHint>
        External with hint
      </Link>
    </div>
  )
};

export const Underline: Story = {
  render: () => (
    <div className="grid gap-2 text-body font-body">
      <Link underline="hover" href="#">Hover underline</Link>
      <Link underline="always" href="#">Always underline</Link>
      <Link underline="none" href="#">No underline</Link>
    </div>
  )
};

