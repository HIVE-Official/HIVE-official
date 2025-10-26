import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Spotlight } from "@/patterns/spotlight";
import { NoShiftBox } from "@/patterns/no-shift-box";
import { StickyContainer } from "@/patterns/sticky-container";
import { BaselineGridOverlay } from "@/patterns/baseline-grid-overlay";
import { Marquee } from "@/patterns/marquee";
import { MeteorShower } from "@/patterns/meteor-shower";

const meta: Meta = {
  title: "Patterns/Library",
};
export default meta;

export const SpotlightExamples: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6 md:grid-cols-4">
      <Spotlight variant="radial" className="rounded-xl border border-border bg-card p-6">
        <h4 className="text-h4 font-h4">Radial</h4>
        <p className="text-body text-muted-foreground">Neutral spotlight, brand-safe.</p>
      </Spotlight>
      <Spotlight variant="vertical" className="rounded-xl border border-border bg-card p-6">
        <h4 className="text-h4 font-h4">Vertical</h4>
        <p className="text-body text-muted-foreground">Depth without tinted color.</p>
      </Spotlight>
      <Spotlight variant="horizontal" className="rounded-xl border border-border bg-card p-6">
        <h4 className="text-h4 font-h4">Horizontal</h4>
        <p className="text-body text-muted-foreground">Use sparingly to guide scan.</p>
      </Spotlight>
      <Spotlight variant="cursor" className="rounded-xl border border-border bg-card p-6">
        <h4 className="text-h4 font-h4">Cursor-follow</h4>
        <p className="text-body text-muted-foreground">Lights up under the pointer for hero CTAs.</p>
      </Spotlight>
    </div>
  )
};

export const NoShiftAndSticky: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <NoShiftBox aspect="16/9" />
      <StickyContainer header={<div className="text-body">Sticky header</div>}>
        <div className="space-y-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-6 rounded bg-foreground/10" />
          ))}
        </div>
      </StickyContainer>
    </div>
  )
};

export const BaselineOverlay: StoryObj = {
  render: () => (
    <div className="relative p-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <h4 className="text-h4 font-h4">Baseline Grid Overlay</h4>
        <p className="text-body text-muted-foreground">Toggle in dev to inspect alignment.</p>
      </div>
      <BaselineGridOverlay enabled size={8} />
    </div>
  )
};

export const MarqueeExample: StoryObj = {
  render: () => (
    <div className="p-6">
      <Marquee style={{ borderRadius: 12 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="mx-3 rounded-md border border-border bg-card px-4 py-2 text-body text-muted-foreground">
            Campus event #{i + 1}
          </div>
        ))}
      </Marquee>
    </div>
  )
};

export const MeteorExample: StoryObj = {
  render: () => (
    <div className="p-6">
      <MeteorShower className="relative h-40 overflow-hidden rounded-xl border border-border bg-card">
        <div className="absolute inset-x-0 bottom-4 text-center text-sm font-medium text-muted-foreground">
          MeteorShower pattern (uses `.meteor` utilities)
        </div>
      </MeteorShower>
    </div>
  )
};
