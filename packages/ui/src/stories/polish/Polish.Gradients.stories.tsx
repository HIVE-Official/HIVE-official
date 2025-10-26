import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Polish/Gradients (Neutral)",
  parameters: { 
    docs: { description: { story: "Neutral-only gradients for depth; no gold or color accents. Uses foreground with alpha." } }
  }
};
export default meta;

export const NeutralOverlays: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
        <div className="absolute inset-0 grad-neutral-v" aria-hidden />
        <div className="relative">
          <h4 className="text-h4 font-h4">Vertical neutral</h4>
          <p className="text-body text-muted-foreground">Depth without tint; good for hero backgrounds and cards.</p>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
        <div className="absolute inset-0 grad-neutral-h" aria-hidden />
        <div className="relative">
          <h4 className="text-h4 font-h4">Horizontal neutral</h4>
          <p className="text-body text-muted-foreground">Use sparingly to guide scan direction.</p>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
        <div className="absolute -inset-6 grad-neutral-radial" aria-hidden />
        <div className="relative">
          <h4 className="text-h4 font-h4">Radial neutral</h4>
          <p className="text-body text-muted-foreground">Spotlight effect without brand color.</p>
        </div>
      </div>
    </div>
  )
};

