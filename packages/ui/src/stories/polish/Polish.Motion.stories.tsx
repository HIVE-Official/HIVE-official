import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "@/atoms/button";

const meta: Meta = {
  title: "Polish/Motion Patterns",
};
export default meta;

export const EntryExit: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-body font-body mb-2 text-muted-foreground">Entry / Exit classes (opacity/transform only; no layout shift)</p>
        <div className="flex flex-wrap gap-3">
          <div className="enter-fade rounded-md border border-border bg-background px-3 py-2">enter-fade</div>
          <div className="enter-slide-up rounded-md border border-border bg-background px-3 py-2">enter-slide-up</div>
          <div className="enter-slide-down rounded-md border border-border bg-background px-3 py-2">enter-slide-down</div>
          <div className="enter-panel-right rounded-md border border-border bg-background px-3 py-2">enter-panel-right</div>
          <div className="exit-fade rounded-md border border-border bg-background px-3 py-2">exit-fade</div>
        </div>
        <p className="mt-3 text-caption text-muted-foreground">Reduced motion disables animations automatically.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-body font-body mb-2 text-muted-foreground">Micro-interactions</p>
        <div className="flex items-center gap-3">
          <Button className="pressable">Pressable</Button>
          <Button className="interactive">Interactive</Button>
          <Button className="btn-anim-icons">
            <span className="icon-leading icon-motion-pop">←</span>
            Hover Me
            <span className="icon-trailing icon-motion-pop">→</span>
          </Button>
        </div>
      </div>
    </div>
  ),
};

