// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Link, type LinkProps } from "../index";

const meta: Meta<LinkProps> = {
  title: "Atoms/Link",
  component: Link,
  args: { children: "Open docs", href: "#" }
};
export default meta;
type Story = StoryObj<LinkProps>;

export const Default: Story = {};
export const Subtle: Story = { args: { variant: "subtle", children: "Learn more" } };
export const AlwaysUnderline: Story = { args: { underline: "always" } };
export const External: Story = { args: { variant: "external", href: "https://example.com", children: "External", newTabHint: true } };

export const MutedMeta: Story = {
  args: { variant: "muted", children: "2 hours ago", href: "#" }
};

export const QuietInDenseUI: Story = {
  render: () => (
    <div className="text-body-sm font-body-sm">
      <span className="text-muted-foreground">Owner: </span>
      {/* external icon only on hover */}
      <Link href="#" variant="subtle" iconHover="end" endIcon={<span>↗</span>}>
        robotics‑club
      </Link>
    </div>
  )
};

export const ProminentActionLink: Story = {
  args: {
    variant: "action",
    children: "Learn more",
    href: "#"
  }
};

export const InlineIconLinks: Story = {
  render: () => (
    <div className="space-y-2">
      <Link href="#">
        <span aria-hidden className="mr-1">📄</span>
        HIVE Handbook.pdf
      </Link>
      <div className="max-w-xs truncate">
        <Link href="#">
          <span aria-hidden className="mr-1">🔗</span>
          https://very-long-domain.example.com/resources/this-is-a-very-long-title-that-truncates
        </Link>
      </div>
    </div>
  )
};

export const VisitedByVariant: Story = {
  render: () => (
    <div className="space-y-3 text-body-sm font-body-sm">
      <p className="text-muted-foreground">Visited styling is tuned per variant; action links don’t dim.</p>
      <div className="space-x-4">
        <Link href="https://example.com">Inline (dims)</Link>
        <Link variant="subtle" href="https://example.com/2">Subtle (dims)</Link>
        <Link variant="action" href="https://example.com/3">Action (unchanged)</Link>
        <Link variant="external" href="https://example.com/4">External (unchanged)</Link>
      </div>
      <div className="text-caption font-caption text-muted-foreground">Tip: Ctrl/Cmd‑click, then return to see visited states.</div>
    </div>
  )
};
