// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = { title: "Forms/Motion" };
export default meta;

type Story = StoryObj;

export const ErrorReveal: Story = {
  render: () => (
    <div className="space-y-2 rounded-xl border border-border bg-card p-6">
      <label className="text-sm font-medium" htmlFor="email">
        Email
      </label>
      <input id="email" className="form-control w-full rounded-md border border-destructive/70 bg-background px-3 py-2" placeholder="student@campus.edu" />
      <p className="form-error-enter text-sm text-destructive">Please use your campus email.</p>
      <p className="text-xs text-muted-foreground">`.form-error-enter` slides the helper text in over 0.22 s.</p>
    </div>
  )
};

export const SuccessPop: Story = {
  render: () => (
    <div className="space-y-3 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <span className="form-success-pop inline-flex h-6 w-6 items-center justify-center rounded-full border border-success/40 text-success">✓</span>
        <p className="text-sm">Invite sent to Amanda</p>
      </div>
      <p className="text-xs text-muted-foreground">`.form-success-pop` scales checks from 0.7 → 1 with a quick overshoot.</p>
    </div>
  )
};

export const ChipMotion: Story = {
  render: () => (
    <div className="space-y-3 rounded-xl border border-border bg-card p-6">
      <div className="flex flex-wrap gap-2 rounded-md border border-border bg-background p-3">
        <span className="chip-enter inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm">
          Design Club
          <button className="text-muted-foreground">×</button>
        </span>
        <span className="chip-exit inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm opacity-60">
          Robotics
          <button className="text-muted-foreground">×</button>
        </span>
      </div>
      <p className="text-xs text-muted-foreground">`.chip-enter`/`.chip-exit` animate additions/removals when using TagInputs.</p>
    </div>
  )
};
