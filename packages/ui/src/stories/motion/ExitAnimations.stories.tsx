// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = { title: "Motion/Exit" };
export default meta;

type Story = StoryObj;

export const ModalExit: Story = {
  render: () => (
    <div className="space-y-2 rounded-xl border border-border bg-card p-6">
      <div className="exit-scale-down max-w-sm rounded-xl border border-border bg-background p-4 text-sm">
        <p className="font-medium">Modal closing…</p>
        <p className="text-muted-foreground">`.exit-scale-down` (200 ms ease-exit)</p>
      </div>
    </div>
  )
};

export const CardExit: Story = {
  render: () => (
    <div className="space-y-2 rounded-xl border border-border bg-card p-6">
      <div className="exit-slide-down max-w-md rounded-lg border border-border bg-background px-4 py-3 text-sm">
        Feed card leaving view
      </div>
    </div>
  )
};

export const FadeExit: Story = {
  render: () => (
    <div className="space-y-2 rounded-xl border border-border bg-card p-6">
      <div className="exit-fade rounded-md border border-border bg-background px-4 py-2 text-sm">
        Toast dismissal using `.exit-fade`
      </div>
    </div>
  )
};
