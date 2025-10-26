// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../index";
import { ExpandableCard } from "../molecules/expandable-card";

const meta: Meta = {
  title: "Molecules/ExpandableCard",
  parameters: { layout: "padded" }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <ExpandableCard
        title="Campus spotlight"
        description="This week’s featured story"
        reveal={<p>More context appears on hover/focus — keep it succinct and scannable.</p>}
      >
        <p className="text-body-sm font-body-sm text-muted-foreground">
          A short preview of what’s inside. Hover or focus to reveal extra context below.
        </p>
      </ExpandableCard>
    </div>
  )
};

export const WithMedia: Story = {
  render: () => (
    <div className="max-w-md">
      <ExpandableCard
        mediaUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800"
        title="Robotics Club — Demo Day"
        description="Friday 6pm • Engineering Hall"
        reveal={<p>Expect live demos, Q&A, and open sign-ups for the spring cohort.</p>}
      />
    </div>
  )
};

export const Compact: Story = {
  render: () => (
    <div className="max-w-sm">
      <ExpandableCard
        compact
        title="Design tokens"
        description="Brand + Motion"
        reveal={<p>Tokens map to UI surfaces and motion. Keep gold subtle.</p>}
      />
    </div>
  )
};

export const WithActions: Story = {
  render: () => (
    <div className="max-w-md">
      <ExpandableCard
        title="Join Space Robotics"
        description="2,341 members"
        reveal={<p>Leaders: Ava, Jordan. Posts: 189 this month.</p>}
        actions={<Button size="sm">Join</Button>}
      />
    </div>
  )
};

