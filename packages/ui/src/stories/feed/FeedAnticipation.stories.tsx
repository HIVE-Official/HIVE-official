// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Feed/Anticipation"
};

export default meta;

type Story = StoryObj;

export const CountdownPulse: Story = {
  render: () => (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div className="anim-countdown-pulse rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm font-medium text-foreground">
        Ritual kickoff in 15 minutes
      </div>
      <p className="text-xs text-muted-foreground">`.anim-countdown-pulse` pulses 3× over 0.6 s.</p>
    </div>
  )
};

export const RsvpNudge: Story = {
  render: () => (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <button className="anim-rsvp-nudge rounded-md border border-border bg-background px-4 py-2 text-sm font-medium">
        RSVP to Hack Night
      </button>
      <p className="text-xs text-muted-foreground">`.anim-rsvp-nudge` adds a subtle shake (2 iterations).</p>
    </div>
  )
};

export const JumpDivider: Story = {
  render: () => (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div className="anim-jump-divider flex items-center justify-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
        Jump to latest ↓
      </div>
      <p className="text-xs text-muted-foreground">`.anim-jump-divider` springs the CTA into view.</p>
    </div>
  )
};

export const LiveRing: Story = {
  render: () => (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div className="relative inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium">
        <span className="anim-live-ring relative inline-flex h-3 w-3 items-center justify-center">
          <span className="block h-1.5 w-1.5 rounded-full bg-danger" />
        </span>
        Live now · Studio Jam
      </div>
      <p className="text-xs text-muted-foreground">`.anim-live-ring` pulses the outer halo every 1.2 s.</p>
    </div>
  )
};
